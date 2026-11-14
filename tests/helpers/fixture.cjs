const Q=require('../../src/core.js'),seed=require('../../data/stations.json');
const now='2026-11-14T10:00:00.000Z';let serial=0;
function fixture(){
 const s=Object.fromEntries(Q.tables.map(t=>[t,[]]));s.Stations=structuredClone(seed).map(st=>({...st,status:'OPEN',venue_approval_status:'APPROVED',service_lanes:2,current_individual_queue:0,current_team_queue:0,queue_updated_at:now}));
 s.EventConfig=[{key:'schema_version',value:2},{key:'team_policy',value:'CONFIRMED_PRESENT'}];
 s.StaffPermissions=[
  {staff_id:'M1',account_email:'master@example.test',role:'STATION_MASTER',allowed_station_ids:['S03','S12'],allowed_zone_ids:[],active:true,credential_version:1},
  {staff_id:'M2',account_email:'other@example.test',role:'STATION_MASTER',allowed_station_ids:['S16'],allowed_zone_ids:[],active:true,credential_version:1},
  {staff_id:'Z1',account_email:'zone@example.test',role:'ZONE_LEAD',allowed_station_ids:[],allowed_zone_ids:['F1'],active:true,credential_version:1},
  {staff_id:'A1',account_email:'admin@example.test',role:'SYSTEM_ADMIN',allowed_station_ids:[],allowed_zone_ids:[],active:true,credential_version:1}
 ];
 s.Teams=[{team_id:'T1',team_name:'Test team',leader_participant_id:'P1',member_min:8,member_max:10,status:'ACTIVE'}];
 s.Participants=Array.from({length:9},(_,i)=>({participant_id:'P'+i,external_id:'external-'+i,qr_token_hash:'test-hash-'+i,name:'Restricted fixture name '+i,troop_name:'Test troop',unit_type:'童軍',participation_mode:i?'TEAM':'INDIVIDUAL',team_id:i?'T1':null,active_status:'ACTIVE',checked_in_at:null}));
 return s;
}
function call(s,action,payload={},actorId='M1',extra={}){
 const q={idempotencyKey:'request-key-'+(++serial),...payload};
 return Q.execute(s,action,q,{actor:s.StaffPermissions.find(r=>r.staff_id===actorId)||null,participantId:null,now,unlocked:true,id:()=> 'event-'+(++serial),requestId:'req-'+serial,fingerprint:JSON.stringify({action,q}),...extra});
}
function populated(){const s=fixture();call(s,'approveIndividualStamp',{stationId:'S03',participantId:'P0',identityConfirmed:true});call(s,'approveTeamStamp',{stationId:'S12',teamId:'T1',presentMemberIds:s.Participants.slice(1).map(p=>p.participant_id),attendanceConfirmed:true});call(s,'createAlert',{stationId:'S03',type:'SUPPLY',severity:'MEDIUM',description:'Test supply alert'});call(s,'submitTeamAttendance',{stationId:'S03',presentMemberIds:['P1','P2']},null,{participantId:'P1'});return s;}
module.exports={Q,fixture,populated,call,now};
