const {test}=require('node:test'),assert=require('node:assert/strict');const I=require('../src/integrity.js');const {Q,fixture,populated,call}=require('./helpers/fixture.cjs');
function invalid(mutate,table){const s=populated();mutate(s);assert.throws(()=>I.validate(s),e=>e.code==='DATA_INTEGRITY'&&(!table||e.table===table));}
test('storage validator accepts full individual/team/draft/alert history',()=>assert.equal(I.validate(populated()).stationCount,30));
test('duplicate IDs, external IDs, token hashes and case-insensitive staff emails rejected',()=>{
 invalid(s=>s.Participants.push({...s.Participants[0]}),'Participants');
 invalid(s=>s.Participants[1].external_id=s.Participants[0].external_id,'Participants');
 invalid(s=>s.Participants[1].qr_token_hash=s.Participants[0].qr_token_hash,'Participants');
 invalid(s=>s.StaffPermissions[1].account_email=s.StaffPermissions[0].account_email.toUpperCase(),'StaffPermissions');
});
test('all foreign-key families reject orphans',()=>{
 const cases=[['Participants',s=>s.Participants[2].team_id='missing'],['Teams',s=>s.Teams[0].leader_participant_id='missing'],['StaffPermissions',s=>s.StaffPermissions[0].allowed_station_ids=['S99']],['StampLogs',s=>s.StampLogs[0].participant_id='missing'],['StampLogs',s=>s.StampLogs[0].idempotency_key='missing'],['StampBatches',s=>s.StampBatches[0].team_id='missing'],['Alerts',s=>s.Alerts[0].handler_id='missing'],['AttendanceDrafts',s=>s.AttendanceDrafts[0].leader_participant_id='missing'],['AuditLogs',s=>s.AuditLogs[0].staff_id='missing']];
 for(const [table,mutate]of cases)invalid(mutate,table);
});
test('invalid row types, station zone, unsafe open configuration and malformed queue rejected',()=>{
 invalid(s=>s.Requests.push(null),'Requests');invalid(s=>s.Stations[0].zone_id='B3','Stations');invalid(s=>s.Stations[0].service_lanes=null,'Stations');invalid(s=>s.Stations[0].current_team_queue=-1,'Stations');invalid(s=>s.Stations[0].queue_updated_at='yesterday','Stations');
});
test('effective pass uniqueness and reversal target checked',()=>{
 invalid(s=>s.StampLogs.push({...s.StampLogs[0],log_id:'duplicate-pass'}),'StampLogs');
 const s=populated(),first=s.StampLogs[0];call(s,'revokeStamp',{logId:first.log_id,reason:'Approved test correction'},'A1');assert.equal(I.validate(s).ok,true);
 const corrupt=structuredClone(s);corrupt.StampLogs.at(-1).participant_id='P1';assert.throws(()=>I.validate(corrupt),e=>e.rule==='REVERSAL');
 const twice=structuredClone(s);twice.StampLogs.push({...twice.StampLogs.at(-1),log_id:'second-reversal'});assert.throws(()=>I.validate(twice),e=>e.rule==='DUPLICATE_REVERSAL');
});
test('batch completeness, overlapping attendance and unsupported pending batches rejected',()=>{
 invalid(s=>s.StampLogs.splice(1,1),'StampBatches');invalid(s=>s.StampBatches[0].absent_member_ids=['P1'],'StampBatches');invalid(s=>s.StampBatches[0].status='PENDING','StampBatches');
});
test('historical attendance snapshot survives later valid team membership change',()=>{
 const s=populated();s.Teams.push({team_id:'T2',member_min:8,member_max:10,status:'ACTIVE'});s.Participants[2].team_id='T2';assert.equal(I.validate(s).ok,true);
});
test('schema, honor policy and station count reject unsupported data',()=>{
 invalid(s=>s.EventConfig[0].value=1,'EventConfig');invalid(s=>s.EventConfig.push({key:'required_station_ids',value:['S99']}),'EventConfig');invalid(s=>s.EventConfig.push({key:'honor_threshold',value:31}),'EventConfig');
 const empty=fixture();empty.Stations=[];empty.StaffPermissions=[];empty.Teams=[];empty.Participants=[];assert.throws(()=>I.validate(empty));assert.equal(I.validate(empty,{allowIncompleteStations:true}).ok,true);
});
test('audit stores detached before/after queue states and omits source secrets',()=>{
 const s=fixture();const before=structuredClone(s.Stations[2]);call(s,'updateQueue',{stationId:'S03',individualQueue:2,teamQueue:4,pin:'SUPPLIED-PIN',credential:'SUPPLIED-TOKEN'});
 const a=s.AuditLogs.at(-1);assert.equal(a.old_value_summary.station.individualQueue,before.current_individual_queue);assert.equal(a.new_value_summary.station.individualQueue,2);assert.equal(a.new_value_summary.station.teamQueue,4);
 s.Stations[2].current_individual_queue=99;assert.equal(a.new_value_summary.station.individualQueue,2);
 const serialized=JSON.stringify(a);for(const secret of ['SUPPLIED-PIN','SUPPLIED-TOKEN','test-hash-','Restricted fixture','@example.test'])assert.ok(!serialized.includes(secret));
});
test('zone lead dispatch is limited to own zone and eligible handlers, with audited transitions',()=>{
 const s=fixture();const a=call(s,'createAlert',{stationId:'S03',type:'CROWD',severity:'HIGH',description:'Queue overflow'});
 const detail=call(s,'getStationDetail',{stationId:'S03'},'Z1');assert.equal(detail.alerts[0].canDispatch,true);assert.deepEqual(detail.alerts[0].dispatchStaff.map(p=>p.staffId).sort(),['M1','Z1']);
 call(s,'resolveAlert',{alertId:a.alertId,status:'DISPATCHED',handlerId:'M1'},'Z1');let audit=s.AuditLogs.at(-1);assert.equal(audit.old_value_summary.alert.status,'PENDING');assert.equal(audit.new_value_summary.alert.handlerId,'M1');
 call(s,'resolveAlert',{alertId:a.alertId,status:'RESOLVED'},'Z1');assert.equal(s.Alerts[0].handler_id,'M1');assert.equal(s.Alerts[0].status,'RESOLVED');assert.equal(I.validate(s).ok,true);
});
test('zone lead cannot dispatch outside zone, to foreign staff, global broadcast or correction',()=>{
 function denied(payload,scope){const s=fixture();const a=call(s,'createAlert',payload,'A1');const before=JSON.stringify(s.Alerts);assert.throws(()=>call(s,'resolveAlert',{alertId:a.alertId,status:'DISPATCHED',handlerId:scope||'Z1'},'Z1'),e=>e.code==='FORBIDDEN');assert.equal(JSON.stringify(s.Alerts),before);}
 denied({stationId:'S16',type:'SUPPLY',severity:'LOW',description:'Outside'});
 denied({stationId:'S03',type:'SUPPLY',severity:'LOW',description:'Own zone'},'M2');
 denied({type:'BROADCAST',severity:'HIGH',description:'Global alert'});
 const s=populated(),r=call(s,'requestStampCorrection',{logId:s.StampLogs[0].log_id,reason:'Test correction'},'A1');assert.throws(()=>call(s,'resolveAlert',{alertId:r.requestId,status:'RESOLVED'},'Z1'),e=>e.code==='FORBIDDEN');assert.throws(()=>call(s,'resolveAlert',{alertId:r.requestId,status:'RESOLVED'},'A1'),e=>e.code==='CORRECTION_REQUIRES_REVIEW');
});
test('creation and stamping audits point to concrete entity IDs, not empty targets',()=>{const s=fixture();const p=call(s,'registerParticipant',{externalId:'audit-external-id',name:'Test registrant',troop:'Test troop',unitType:'童軍',mode:'INDIVIDUAL'},'A1');assert.equal(s.AuditLogs.at(-1).entity_type,'Participants');assert.equal(s.AuditLogs.at(-1).entity_id,p.participantId);const a=call(s,'createAlert',{stationId:'S03',type:'SUPPLY',severity:'LOW',description:'Test'});assert.equal(s.AuditLogs.at(-1).entity_type,'Alerts');assert.equal(s.AuditLogs.at(-1).entity_id,a.alertId);const stamp=call(s,'approveIndividualStamp',{stationId:'S03',participantId:'P0',identityConfirmed:true});assert.equal(s.AuditLogs.at(-1).entity_type,'StampLogs');assert.equal(s.AuditLogs.at(-1).entity_id,stamp.logIds[0]);assert.equal(I.validate(s).ok,true);});
