/** Only api and doGet are callable from HtmlService. Editor helpers end in _. */
function doGet() { return HtmlService.createHtmlOutputFromFile('Index').setTitle('竹風勇者・野外冒險任務島'); }
function secret_() { var v=PropertiesService.getScriptProperties().getProperty('SECRET'); if(!v)Quest.fail('NOT_CONFIGURED'); return v; }
function digest_(value) {return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(String(value),secret_()));}
function token_(){return Utilities.getUuid()+Utilities.getUuid();}
function now_(){return new Date().toISOString();}
function dbId_(){var id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');if(!id)Quest.fail('NOT_CONFIGURED');return id;}
function load_(){
  var ss=SpreadsheetApp.openById(dbId_()), state={};
  Quest.tables.forEach(function(name){
    var sheet=ss.getSheetByName(name);if(!sheet)Quest.fail('SCHEMA_MISSING');
    var cols=Quest.schemas[name],rows=sheet.getLastRow();if(rows>15001)Quest.fail('CAPACITY_LIMIT');
    var values=sheet.getRange(1,1,Math.max(1,rows),cols.length).getValues();
    if(JSON.stringify(values[0])!==JSON.stringify(cols))Quest.fail('SCHEMA_MISMATCH');
    state[name]=values.slice(1).filter(function(r){return r[0]!=='';}).map(function(row){var out={};cols.forEach(function(k,i){out[k]=row[i]===''?null:JSON.parse(String(row[i]));});return out;});
  });return state;
}
function commit_(before,after){
  var ss=SpreadsheetApp.openById(dbId_()),requests=[];
  Quest.tables.forEach(function(name){
    if(JSON.stringify(before[name])===JSON.stringify(after[name]))return;
    var sheet=ss.getSheetByName(name),cols=Quest.schemas[name];
    if(after[name].length>15000)Quest.fail('CAPACITY_LIMIT');
    // Only changed rows are written; unchanged historical log rows are untouched.
    var required=after[name].length+1;
    if(required>sheet.getMaxRows())requests.push({appendDimension:{sheetId:sheet.getSheetId(),dimension:'ROWS',length:required-sheet.getMaxRows()}});
    var index=0;
    while(index<after[name].length){
      if(JSON.stringify(before[name][index])===JSON.stringify(after[name][index])){index++;continue;}
      var start=index,rows=[];
      while(index<after[name].length&&JSON.stringify(before[name][index])!==JSON.stringify(after[name][index])){
        var row=after[name][index];rows.push({values:cols.map(function(k){return {userEnteredValue:{stringValue:JSON.stringify(row[k]===undefined?null:row[k])}};})});index++;
      }
      requests.push({updateCells:{range:{sheetId:sheet.getSheetId(),startRowIndex:start+1,endRowIndex:index+1,startColumnIndex:0,endColumnIndex:cols.length},rows:rows,fields:'userEnteredValue'}});
    }
    if(after[name].length<before[name].length)Quest.fail('DELETION_NOT_ALLOWED');
  });
  if(requests.length){if(JSON.stringify(requests).length>7000000)Quest.fail('CAPACITY_LIMIT');Sheets.Spreadsheets.batchUpdate({requests:requests},dbId_());}
}
function clone_(x){return JSON.parse(JSON.stringify(x));}
function staff_(s){var email=String(Session.getActiveUser().getEmail()||'').toLowerCase();return s.StaffPermissions.find(function(p){return p.active===true&&p.account_email.toLowerCase()===email;})||null;}
function cache_(){return CacheService.getScriptCache();}
function session_(raw,s){
  if(typeof raw!=='string'||raw.length>200)return null;
  var saved=cache_().get('session:'+digest_(raw));if(!saved)return null;
  var v=JSON.parse(saved),p=s.Participants.find(function(p){return p.participant_id===v.id&&p.active_status==='ACTIVE'&&p.qr_token_hash===v.hash;});return p?p.participant_id:null;
}
function unlocked_(actor,id){return actor&&cache_().get('unlock:'+digest_(actor.staff_id+':'+actor.credential_version+':'+id+':'+PropertiesService.getScriptProperties().getProperty('PIN_'+id)))==='yes';}
function rate_(label,limit){
  var props=PropertiesService.getScriptProperties(),key='rate:'+digest_(label),current=Date.now(),v=JSON.parse(props.getProperty(key)||'{"count":0,"until":0}');
  if(current>=v.until)v={count:0,until:current+600000};
  if(v.count>=limit)Quest.fail('RATE_LIMITED');v.count++;props.setProperty(key,JSON.stringify(v));
}
function cleanRateLimits_(){var p=PropertiesService.getScriptProperties(),all=p.getProperties();Object.keys(all).filter(function(k){return k.indexOf('rate:')===0;}).forEach(function(k){if(JSON.parse(all[k]).until<Date.now())p.deleteProperty(k);});}
function api(action,request){
  var requestId=Utilities.getUuid(),lock=LockService.getScriptLock(),before,state,ctx,actor;
  try{
    if(typeof action!=='string'||!request||typeof request!=='object'||Array.isArray(request)||JSON.stringify(request).length>15000)Quest.fail('INVALID_INPUT');
    if(action==='getPublicStationBoard'){var cached=cache_().get('public-board');if(cached)return {ok:true,data:JSON.parse(cached),serverTime:now_(),requestId:requestId};}
    if(!lock.tryLock(10000))Quest.fail('BUSY_RETRY');
    before=load_();state=clone_(before);actor=staff_(state);
    var q=clone_(request),token=q.session;delete q.session;
    ctx={actor:actor,now:now_(),id:Utilities.getUuid,requestId:requestId,participantId:session_(token,state),unlocked:unlocked_(actor,q.stationId),credentialHash:q.credential?digest_(q.credential):null,fingerprint:digest_(JSON.stringify({action:action,payload:q}))};
    var data;
    if(action==='loginParticipant'){
      rate_('login-global',300);var hash=typeof q.credential==='string'&&q.credential.length<=200?digest_(q.credential):'';
      var participant=state.Participants.find(function(p){return p.qr_token_hash===hash&&p.active_status==='ACTIVE';});if(!participant)Quest.fail('INVALID_CREDENTIAL');
      var session=token_();cache_().put('session:'+digest_(session),JSON.stringify({id:participant.participant_id,hash:hash}),1800);data={session:session,expiresIn:1800};
    }else if(action==='logout'){
      if(token)cache_().remove('session:'+digest_(token));data={loggedOut:true};
    }else if(action==='unlockStation'){
      var st=state.Stations.find(function(st){return st.station_id===q.stationId;});if(!st)Quest.fail('NOT_FOUND');Quest.scope(actor,st,true);
      rate_('pin:'+actor.staff_id+':'+q.stationId,5);
      var expected=PropertiesService.getScriptProperties().getProperty('PIN_'+q.stationId);
      if(!expected||typeof q.pin!=='string'||!/^\d{4}$/.test(q.pin)||digest_('pin:'+q.stationId+':'+q.pin)!==expected)Quest.fail('INVALID_CREDENTIAL');
      cache_().put('unlock:'+digest_(actor.staff_id+':'+actor.credential_version+':'+q.stationId+':'+expected),'yes',900);Quest.audit(state,ctx,action,q.stationId);data={unlocked:true,expiresIn:900};
    }else if(action==='issueParticipantQr'){
      Quest.admin(actor);if(actor.role!=='SYSTEM_ADMIN')Quest.fail('FORBIDDEN');
      Quest.text(q.reason,300);Quest.text(q.idempotencyKey,100);
      if(typeof q.newCredential!=='string'||!/^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}){2}$/i.test(q.newCredential))Quest.fail('INVALID_INPUT');
      var old=state.Requests.find(function(r){return r.idempotency_key===q.idempotencyKey;});
      if(old){if(old.actor_id!==actor.staff_id||old.fingerprint!==ctx.fingerprint)Quest.fail('IDEMPOTENCY_CONFLICT');data=old.result;}
      else{
        var p=state.Participants.find(function(p){return p.participant_id===q.participantId&&p.active_status==='ACTIVE';});if(!p)Quest.fail('NOT_FOUND');
        p.qr_token_hash=digest_(q.newCredential);p.updated_at=ctx.now;Quest.audit(state,ctx,action,p.participant_id,'OK',q.reason);
        data={participantId:p.participant_id,issued:true};state.Requests.push({idempotency_key:q.idempotencyKey,actor_id:actor.staff_id,fingerprint:ctx.fingerprint,result:data,created_at:ctx.now});
      }
    }else{
      data=Quest.execute(state,action,q,ctx);
    }
    commit_(before,state);
    if(JSON.stringify(before)!==JSON.stringify(state))cache_().remove('public-board');
    if(action==='getPublicStationBoard')cache_().put('public-board',JSON.stringify(data),10);
    if(action==='getAdminDashboard')data.serviceHealth=JSON.parse(cache_().get('service-health')||'null');
    return {ok:true,data:data,serverTime:ctx.now,requestId:requestId};
  }catch(err){
    var code=err&&err.code||'SERVICE_UNAVAILABLE';
    if(['SERVICE_UNAVAILABLE','BUSY_RETRY','CAPACITY_LIMIT','SCHEMA_MISMATCH'].indexOf(code)>=0){try{cache_().put('service-health',JSON.stringify({lastFailureAt:now_(),code:code}),21600);}catch(ignored){}}
    // Denials are auditable without recording incoming token/PIN/payload.
    if(before&&actor&&['FORBIDDEN','UNAUTHORIZED','INVALID_CREDENTIAL','RATE_LIMITED','STATION_LOCKED'].indexOf(code)>=0){
      try{var denial=clone_(before);Quest.audit(denial,{actor:actor,now:now_(),id:Utilities.getUuid,requestId:requestId},String(action).slice(0,60),'',code);commit_(before,denial);}catch(ignored){}
    }
    return {ok:false,error:{code:code,message:errorMessage_(code)},requestId:requestId};
  }finally{if(lock.hasLock())lock.releaseLock();}
}
function errorMessage_(code){var messages={UNAUTHORIZED:'請登入授權帳號或重新登入個人通行證',FORBIDDEN:'沒有此操作的權限',ALREADY_STAMPED:'本站已完成核章，本次未重複寫入',STATION_CLOSED:'本站未開放或場地尚未核准',STATION_LOCKED:'請先解鎖本站',RATE_LIMITED:'嘗試次數過多，請十分鐘後再試',INVALID_CREDENTIAL:'憑證無效',POLICY_PENDING:'小隊政策尚待核定',VENUE_PENDING:'場地或服務線數未核准',BUSY_RETRY:'系統忙碌，請使用同一請求重試',SERVICE_UNAVAILABLE:'服務暫不可用；尚未確認成功，請保留請求重試'};return messages[code]||'操作未完成（'+code+'）';}
/** Run editor-side after setting SPREADSHEET_ID and BOOTSTRAP_ADMIN_EMAIL. Never exposed to client. */
function setupProject_(){
  var lock=LockService.getScriptLock();lock.waitLock(10000);
  try{
    var props=PropertiesService.getScriptProperties();if(!props.getProperty('SECRET'))props.setProperty('SECRET',token_());
    var email=String(props.getProperty('BOOTSTRAP_ADMIN_EMAIL')||'').toLowerCase();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))throw new Error('Set BOOTSTRAP_ADMIN_EMAIL');
    var ss=SpreadsheetApp.openById(dbId_());
    Quest.tables.forEach(function(name){var sh=ss.getSheetByName(name),cols=Quest.schemas[name];if(!sh){sh=ss.insertSheet(name);sh.getRange(1,1,1,cols.length).setValues([cols]);sh.setFrozenRows(1);}else if(JSON.stringify(sh.getRange(1,1,1,cols.length).getValues()[0])!==JSON.stringify(cols))throw new Error('SCHEMA_MISMATCH '+name);});
    var before=load_(),s=clone_(before);
    SEED_STATIONS.forEach(function(st){if(!s.Stations.some(function(x){return x.station_id===st.station_id;}))s.Stations.push(clone_(st));});
    if(!s.StaffPermissions.length)s.StaffPermissions.push({staff_id:Utilities.getUuid(),account_email:email,role:'SYSTEM_ADMIN',allowed_station_ids:[],allowed_zone_ids:[],active:true,credential_version:1,updated_at:now_()});
    [['schema_version',1],['honor_threshold',null],['required_station_ids',[]],['team_policy','PENDING'],['stale_seconds',90]].forEach(function(pair){if(!s.EventConfig.some(function(c){return c.key===pair[0];}))s.EventConfig.push({key:pair[0],value:pair[1]});});
    Quest.audit(s,{actor:null,now:now_(),id:Utilities.getUuid,requestId:Utilities.getUuid()},'SCHEMA_SETUP','v1');commit_(before,s);
  }finally{lock.releaseLock();}
}
/** Editor: provide STAFF_CHANGE_JSON then run. Existing account edits bump credential version. */
function configureStaff_(){
  var p=PropertiesService.getScriptProperties(),input=JSON.parse(p.getProperty('STAFF_CHANGE_JSON')||'null');if(!input)throw new Error('Set STAFF_CHANGE_JSON');
  var lock=LockService.getScriptLock();lock.waitLock(10000);try{
    var b=load_(),s=clone_(b),actor=staff_(s);if(!actor||actor.role!=='SYSTEM_ADMIN')Quest.fail('FORBIDDEN');
    if(!['STATION_MASTER','ZONE_LEAD','EVENT_LEAD','SYSTEM_ADMIN'].includes(input.role)||typeof input.active!=='boolean')Quest.fail('INVALID_INPUT');
    var email=Quest.text(input.email,200).toLowerCase();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))Quest.fail('INVALID_INPUT');
    var ids=input.stationIds||[],zones=input.zoneIds||[];if(!Array.isArray(ids)||!Array.isArray(zones)||ids.some(function(id){return !s.Stations.some(function(st){return st.station_id===id;});})||zones.some(function(z){return !s.Stations.some(function(st){return st.zone_id===z;});}))Quest.fail('INVALID_INPUT');
    var row=s.StaffPermissions.find(function(r){return r.account_email===email;});if(!row){row={staff_id:Utilities.getUuid(),credential_version:0};s.StaffPermissions.push(row);}Object.assign(row,{account_email:email,role:input.role,allowed_station_ids:ids,allowed_zone_ids:zones,active:input.active,credential_version:row.credential_version+1,updated_at:now_()});
    Quest.audit(s,{actor:actor,now:now_(),id:Utilities.getUuid,requestId:Utilities.getUuid()},'STAFF_CHANGE',row.staff_id);commit_(b,s);p.deleteProperty('STAFF_CHANGE_JSON');
  }finally{lock.releaseLock();}
}
/** Editor only: PIN_CHANGE_JSON={"stationId":"S01","pin":"..."}. Delete input after hashing. */
function configurePin_(){
  var lock=LockService.getScriptLock();lock.waitLock(10000);try{var p=PropertiesService.getScriptProperties(),input=JSON.parse(p.getProperty('PIN_CHANGE_JSON')||'null'),s=load_(),actor=staff_(s);if(!actor||actor.role!=='SYSTEM_ADMIN')Quest.fail('FORBIDDEN');if(!input||!s.Stations.some(function(st){return st.station_id===input.stationId;})||!/^\d{4}$/.test(input.pin))Quest.fail('INVALID_INPUT');p.setProperty('PIN_'+input.stationId,digest_('pin:'+input.stationId+':'+input.pin));p.deleteProperty('PIN_CHANGE_JSON');var after=clone_(s);after.StaffPermissions.forEach(function(staff){staff.credential_version++;});Quest.audit(after,{actor:actor,now:now_(),id:Utilities.getUuid,requestId:Utilities.getUuid()},'PIN_ROTATE',input.stationId);commit_(s,after);}finally{lock.releaseLock();}
}
/** Installable Google Forms trigger. Config field mapping via FORM_FIELD_MAP JSON Script Property. */
function onRegistrationSubmit_(event){
  if(!event||!event.response)throw new Error('Install a Form submit trigger');
  var lock=LockService.getScriptLock();lock.waitLock(10000);try{
    var props=PropertiesService.getScriptProperties(),expected=props.getProperty('FORM_ID');if(!expected||event.source.getId()!==expected)Quest.fail('FORBIDDEN');
    var mapping=JSON.parse(props.getProperty('FORM_FIELD_MAP')||'{}'),answers={};event.response.getItemResponses().forEach(function(r){answers[String(r.getItem().getId())]=r.getResponse();});
    var q={externalId:event.response.getId(),name:answers[mapping.name],troop:answers[mapping.troop],unitType:answers[mapping.unitType],mode:answers[mapping.mode],teamId:answers[mapping.teamId],idempotencyKey:'form-'+event.response.getId()};
    var before=load_(),after=clone_(before),ctx={actor:{staff_id:'FORM_TRIGGER',role:'SYSTEM_ADMIN',active:true},now:now_(),id:Utilities.getUuid,requestId:Utilities.getUuid(),fingerprint:digest_(JSON.stringify(q))};
    var result=Quest.execute(after,'registerParticipant',q,ctx);var participant=after.Participants.find(function(p){return p.participant_id===result.participantId;});
    // Token issuance is a controlled administrator action; no plaintext token in responses/logs.
    commit_(before,after);
  }finally{lock.releaseLock();}
}

/** Editor: EVENT_CONFIG_JSON={"key":"team_policy","value":"CONFIRMED_PRESENT","reason":"approval reference"}. */
function configureEvent_(){
  var p=PropertiesService.getScriptProperties(),q=JSON.parse(p.getProperty('EVENT_CONFIG_JSON')||'null');if(!q)throw new Error('Set EVENT_CONFIG_JSON');q.idempotencyKey='config-'+Utilities.getUuid();var result=api('updateEventConfig',q);if(!result.ok)throw new Error(result.error.code);p.deleteProperty('EVENT_CONFIG_JSON');
}
/** Editor helper after setting FORM_ID; explicitly installs only one registration trigger. */
function installRegistrationTrigger_(){
  var s=load_(),actor=staff_(s);if(!actor||actor.role!=='SYSTEM_ADMIN')Quest.fail('FORBIDDEN');var id=PropertiesService.getScriptProperties().getProperty('FORM_ID');if(!id)throw new Error('Set FORM_ID');
  var triggers=ScriptApp.getProjectTriggers().filter(function(t){return t.getHandlerFunction()==='onRegistrationSubmit_';});
  if(triggers.length)throw new Error('Registration trigger already exists; inspect before replacing');
  ScriptApp.newTrigger('onRegistrationSubmit_').forForm(FormApp.openById(id)).onFormSubmit().create();
}
