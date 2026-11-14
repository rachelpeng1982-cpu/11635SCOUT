/** PRIVATE editor helpers; never copy this file into a production deployment. */
function prepareIntegrationSandbox_(){
  var ss=SpreadsheetApp.getActiveSpreadsheet(),email=String(Session.getActiveUser().getEmail()||'').toLowerCase();
  if(!ss||ss.getName().indexOf('TEST ONLY｜11635SCOUT｜')!==0||!email)Quest.fail('TEST_SANDBOX_REQUIRED');
  // Preflight before even setupProject_ can write configuration or audit rows.
  var participants=ss.getSheetByName('Participants');
  if(participants&&participants.getLastRow()>1){
    var nameIndex=Quest.schemas.Participants.indexOf('name');
    var values=participants.getRange(2,nameIndex+1,participants.getLastRow()-1,1).getValues();
    if(values.some(function(row){try{return typeof JSON.parse(String(row[0]))!=='string'||JSON.parse(String(row[0])).indexOf('TEST ONLY ')!==0;}catch(ignored){return true;}}))Quest.fail('NON_TEST_DATA_PRESENT');
  }
  var permissions=ss.getSheetByName('StaffPermissions');
  if(permissions&&permissions.getLastRow()>1){
    var fields=Quest.schemas.StaffPermissions,rows=permissions.getRange(2,1,permissions.getLastRow()-1,fields.length).getValues();
    var authorized=rows.some(function(row){try{return JSON.parse(String(row[fields.indexOf('account_email')])).toLowerCase()===email&&JSON.parse(String(row[fields.indexOf('active')]))===true&&JSON.parse(String(row[fields.indexOf('role')]))==='SYSTEM_ADMIN';}catch(ignored){return false;}});
    if(!authorized)Quest.fail('FORBIDDEN');
  }
  var props=PropertiesService.getScriptProperties(),configured=props.getProperty('SPREADSHEET_ID');
  if(configured&&configured!==ss.getId())Quest.fail('TEST_TARGET_MISMATCH');
  props.setProperty('SPREADSHEET_ID',ss.getId());props.setProperty('BOOTSTRAP_ADMIN_EMAIL',email);
  setupProject_();
  var lock=LockService.getScriptLock();lock.waitLock(10000);
  try{
    var before=load_(),actor=staff_(before);if(!actor||actor.role!=='SYSTEM_ADMIN')Quest.fail('FORBIDDEN');
    if(before.Participants.some(function(p){return p.name.indexOf('TEST ONLY ')!==0;}))Quest.fail('NON_TEST_DATA_PRESENT');
    var after=clone_(before),env=after.EventConfig.find(function(c){return c.key==='environment';});
    if(env&&env.value!=='TEST_ONLY')Quest.fail('TEST_SANDBOX_REQUIRED');
    if(!env)after.EventConfig.push({key:'environment',value:'TEST_ONLY'});
    Quest.audit(after,{actor:actor,now:now_(),id:Utilities.getUuid,requestId:Utilities.getUuid()},'PREPARE_TEST_SANDBOX','TEST_ONLY');
    commit_(before,after);props.setProperty('INTEGRATION_TEST_MODE','true');
    return {configured:true,scope:'ISOLATED_TEST_ONLY',role:actor.role};
  }finally{lock.releaseLock();}
}
function integrationGuard_(){
  var props=PropertiesService.getScriptProperties();
  if(props.getProperty('INTEGRATION_TEST_MODE')!=='true'||typeof GOOGLE_TEST_BUILD_META==='undefined')Quest.fail('TEST_SANDBOX_REQUIRED');
  var ss=SpreadsheetApp.openById(dbId_());if(ss.getName().indexOf('TEST ONLY｜11635SCOUT｜')!==0)Quest.fail('TEST_SANDBOX_REQUIRED');
  var s=load_(),actor=staff_(s);
  if(!actor||actor.role!=='SYSTEM_ADMIN')Quest.fail('FORBIDDEN');
  if(Quest.config(s,'environment')!=='TEST_ONLY'||s.Participants.some(function(p){return p.name.indexOf('TEST ONLY ')!==0;}))Quest.fail('NON_TEST_DATA_PRESENT');
  return s;
}
/** Run after prepareIntegrationSandbox_. Returns no token/PIN/name/email. */
function runGoogleIntegrationTests_(){
  var initial=integrationGuard_(),runId=Utilities.getUuid(),props=PropertiesService.getScriptProperties();
  var report={runId:runId,source:GOOGLE_TEST_BUILD_META,startedAt:now_(),execution:'APPS_SCRIPT_EDITOR_RUN_REQUIRES_CONNECTOR_READBACK',cases:[],notTested:['other Google accounts / role switching','camera / real mobile','Forms trigger','true concurrent staff','schema migration / full disaster recovery','load / site acceptance']};
  var oldPin=props.getProperty('PIN_S29'),session=null;
  function assert_(condition){if(!condition)Quest.fail('LIVE_ASSERTION_FAILED');}
  function command_(action,payload,label){var q=payload||{};if(!q.idempotencyKey)q.idempotencyKey='live-'+runId+'-'+label;var result=api(action,q);if(!result.ok)Quest.fail(result.error.code);return result.data;}
  function check_(name,fn){try{fn();report.cases.push({name:name,result:'PASS'});}catch(err){report.cases.push({name:name,result:'FAIL',code:err.code||'RUNTIME_FAILURE'});throw err;}}
  var teamId='TEST-'+runId,individual,memberIds=[],individualQr,individualKey='live-'+runId+'-individual',batch;
  try{
    check_('actual owner identity and schema',function(){assert_(command_('getStaffContext',{},'context').role==='SYSTEM_ADMIN');assert_(initial.Stations.length===30&&Quest.config(initial,'schema_version')===2);});
    check_('registration and controlled QR issue',function(){
      command_('createTeam',{teamId:teamId,name:'TEST ONLY team',troop:'TEST ONLY troop'},'team');
      for(var i=0;i<9;i++){
        var data=command_('registerParticipant',{externalId:'TEST-'+runId+'-'+i,name:'TEST ONLY participant '+i,troop:'TEST ONLY troop',unitType:'童軍',mode:i===0?'INDIVIDUAL':'TEAM',teamId:i===0?null:teamId},'register-'+i);
        if(i===0)individual=data.participantId;else memberIds.push(data.participantId);
      }
      individualQr=token_();command_('issueParticipantQr',{participantId:individual,newCredential:individualQr,reason:'TEST ONLY controlled issuance'},'issue');
      session=command_('loginParticipant',{credential:individualQr},'login').session;
      var own=command_('getMyProgress',{session:session,participantId:memberIds[0]},'own');assert_(own.participantId===individual&&own.completedStationIds.length===0);
    });
    check_('test-only S29 setup / PIN / queue',function(){
      command_('updateEventConfig',{key:'team_policy',value:'CONFIRMED_PRESENT',reason:'TEST ONLY isolated scenario'},'policy');
      command_('configureStation',{stationId:'S29',individualDuration:5,teamDuration:7,serviceLanes:2,venueApproval:'APPROVED'},'capacity');
      command_('changeStationStatus',{stationId:'S29',status:'OPEN',reason:'TEST ONLY synthetic venue'},'open');
      var pin=String(Math.floor(Math.random()*10000)).padStart(4,'0');props.setProperty('PIN_S29',digest_('pin:S29:'+pin));command_('unlockStation',{stationId:'S29',pin:pin},'unlock');
      command_('updateQueue',{stationId:'S29',individualQueue:4,teamQueue:0},'queue');
      var row=command_('getPublicStationBoard',{},'board').stations.find(function(r){return r.stationId==='S29';});assert_(row.estimatedWaitMin===10&&row.congestion==='MEDIUM');
    });
    check_('individual stamp and idempotent duplicate protection',function(){
      var q={stationId:'S29',participantId:individual,identityConfirmed:true,idempotencyKey:individualKey};
      var first=command_('approveIndividualStamp',q,'stamp');var again=command_('approveIndividualStamp',q,'stamp');assert_(JSON.stringify(first)===JSON.stringify(again));
      var duplicate=api('approveIndividualStamp',{stationId:'S29',participantId:individual,identityConfirmed:true,idempotencyKey:'live-'+runId+'-duplicate'});assert_(!duplicate.ok&&duplicate.error.code==='ALREADY_STAMPED');
      assert_(command_('getMyProgress',{session:session},'progress').completedStationIds.indexOf('S29')>=0);
    });
    check_('seven of eight present / snapshot / absent un-stamped',function(){
      batch=command_('approveTeamStamp',{stationId:'S29',teamId:teamId,presentMemberIds:memberIds.slice(0,7),attendanceConfirmed:true},'batch');assert_(batch.count===7);
      var s=load_(),saved=s.StampBatches.find(function(b){return b.batch_id===batch.batchId;});assert_(saved.present_member_ids.length===7&&saved.absent_member_ids[0]===memberIds[7]);
      assert_(!Quest.effective(s).some(function(l){return l.participant_id===memberIds[7]&&l.station_id==='S29';}));
    });
    check_('dashboard / CSV / reversal recomputation',function(){
      var before=load_(),total=Quest.effective(before).length;
      var dashboard=command_('getAdminDashboard',{},'dashboard');assert_(dashboard.stations.length===30&&dashboard.summary.totalValidStamps===total);
      assert_(command_('exportReport',{},'export').csv.split('\r\n').length===32);
      command_('revokeStamp',{logId:batch.logIds[0],reason:'TEST ONLY reversal verification'},'revoke');
      assert_(Quest.effective(load_()).length===total-1);
      var alert=command_('createAlert',{stationId:'S29',type:'SUPPLY',severity:'LOW',description:'TEST ONLY supply message'},'alert');
      command_('resolveAlert',{alertId:alert.alertId,status:'RESOLVED'},'close-alert');
    });
    report.result='PASS_REQUIRES_INDEPENDENT_READBACK';
  }catch(err){report.result='FAIL';report.errorCode=err.code||'RUNTIME_FAILURE';}
  finally{
    try{
      var loggedOut=!session||api('logout',{session:session}).ok;
      var closed=api('changeStationStatus',{stationId:'S29',status:'CLOSED',reason:'TEST ONLY end-of-run closure',idempotencyKey:'live-'+runId+'-end-close'});
      if(!loggedOut||!closed.ok)Quest.fail('TEST_CLEANUP_FAILED');report.cleanupStatus='PASS';
    }catch(ignored){report.cleanupStatus='FAILED';report.result='FAIL_CLEANUP';}
    if(oldPin===null)props.deleteProperty('PIN_S29');else props.setProperty('PIN_S29',oldPin);
    report.endedAt=now_();
    try{
      var lock=LockService.getScriptLock();lock.waitLock(10000);
      try{var before=load_(),after=clone_(before),row=after.EventConfig.find(function(c){return c.key==='integration_last_report';});if(row)row.value=report;else after.EventConfig.push({key:'integration_last_report',value:report});Quest.audit(after,{actor:staff_(before),now:now_(),id:Utilities.getUuid,requestId:Utilities.getUuid()},'INTEGRATION_TEST_REPORT',runId);commit_(before,after);}finally{lock.releaseLock();}
    }catch(ignored){report.evidencePersistence='FAILED';report.result='FAIL_EVIDENCE_PERSISTENCE';}
    console.log(JSON.stringify(report));
  }
  return report;
}
