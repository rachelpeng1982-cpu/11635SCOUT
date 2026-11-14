/* Pure storage-boundary validation. Errors expose rule/table names, never row values. */
var Integrity = (() => {
  function validate(s,{allowIncompleteStations=false,allowSchemaV1=false}={}) {
    const Q=typeof Quest!=='undefined'?Quest:require('./core.js');
    const reject=(table,rule)=>{const e=new Q.Fault('DATA_INTEGRITY');e.table=table;e.rule=rule;throw e;};
    const ensure=(ok,t,r)=>{if(!ok)reject(t,r);};
    const str=x=>typeof x==='string'&&x.length>0&&x.length<=500;
    const nullable=x=>x===null||x===undefined;
    const num=x=>Number.isSafeInteger(x)&&x>=0&&x<=10000;
    const iso=x=>typeof x==='string'&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString()===x;
    const enums=(v,values,t,r)=>ensure(values.includes(v),t,r);
    const maps={};
    for(const t of Q.tables){
      ensure(Array.isArray(s[t]),t,'TABLE');const pk=Q.schemas[t][0];maps[t]=new Map();
      for(const row of s[t]){
        ensure(row&&typeof row==='object'&&!Array.isArray(row),t,'ROW');
        ensure(str(row[pk])&&!maps[t].has(row[pk]),t,'PRIMARY_KEY');maps[t].set(row[pk],row);
      }
    }
    const ref=(t,id,target,optional=false)=>ensure(optional&&nullable(id)||maps[target].has(id),t,'FOREIGN_KEY');
    const unique=(t,key,optional=false,normalize=x=>x)=>{const seen=new Set();for(const r of s[t]){if(optional&&nullable(r[key]))continue;ensure(str(r[key]),t,'UNIQUE_TYPE');const v=normalize(r[key]);ensure(!seen.has(v),t,'UNIQUE');seen.add(v);}};
    const list=(v,t)=>{ensure(Array.isArray(v)&&v.every(str)&&new Set(v).size===v.length,t,'ID_LIST');return v;};
    const zoneIds=new Set(['F1','F2','G1','B1','B2','B3']);
    ensure((allowIncompleteStations||s.Stations.length===30)&&s.Stations.length<=30,'Stations','COUNT');
    for(const st of s.Stations){
      ensure(/^S(0[1-9]|[12][0-9]|30)$/.test(st.station_id),'Stations','STATION_ID');
      ensure(st.zone_id===['F1','F2','G1','B1','B2','B3'][Math.floor((Number(st.station_id.slice(1))-1)/5)],'Stations','ZONE');
      enums(st.status,['OPEN','PAUSED','CLOSED'],'Stations','STATUS');enums(st.venue_approval_status,['PENDING','APPROVED'],'Stations','VENUE');
      ensure(str(st.station_name)&&str(st.zone_name),'Stations','LABEL');
      for(const k of ['individual_duration_min','team_duration_min'])ensure(nullable(st[k])||Number.isFinite(st[k])&&st[k]>0&&st[k]<=120,'Stations','DURATION');
      ensure(nullable(st.service_lanes)||num(st.service_lanes)&&st.service_lanes>=1,'Stations','LANES');
      for(const k of ['current_individual_queue','current_team_queue'])ensure(nullable(st[k])||num(st[k]),'Stations','QUEUE');
      ensure(nullable(st.queue_updated_at)||iso(st.queue_updated_at),'Stations','TIMESTAMP');
      if(st.status==='OPEN')ensure(st.venue_approval_status==='APPROVED'&&Number.isInteger(st.service_lanes)&&st.service_lanes>=1&&[st.individual_duration_min,st.team_duration_min].every(v=>Number.isFinite(v)&&v>0),'Stations','OPEN_CONFIGURATION');
    }
    unique('Participants','external_id');unique('Participants','qr_token_hash',true);unique('StaffPermissions','account_email',false,x=>x.toLowerCase());
    for(const t of s.Teams){
      ensure(num(t.member_min)&&num(t.member_max)&&t.member_min>=1&&t.member_min<=t.member_max,'Teams','SIZE');enums(t.status,['ACTIVE','INACTIVE'],'Teams','STATUS');
      if(!nullable(t.leader_participant_id)){ref('Teams',t.leader_participant_id,'Participants');ensure(maps.Participants.get(t.leader_participant_id).team_id===t.team_id,'Teams','LEADER_MEMBERSHIP');}
    }
    for(const p of s.Participants){
      ensure(str(p.name)&&str(p.troop_name)&&str(p.unit_type),'Participants','REQUIRED_TEXT');
      enums(p.participation_mode,['INDIVIDUAL','TEAM'],'Participants','MODE');enums(p.active_status,['ACTIVE','INACTIVE'],'Participants','STATUS');
      if(p.participation_mode==='TEAM')ref('Participants',p.team_id,'Teams');else ensure(nullable(p.team_id),'Participants','INDIVIDUAL_TEAM');
      ensure(nullable(p.checked_in_at)||iso(p.checked_in_at),'Participants','TIMESTAMP');
    }
    for(const t of s.Teams)ensure(s.Participants.filter(p=>p.team_id===t.team_id&&p.active_status==='ACTIVE').length<=t.member_max,'Teams','OVER_CAPACITY');
    for(const p of s.StaffPermissions){
      ensure(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.account_email),'StaffPermissions','ACCOUNT');
      enums(p.role,['STATION_MASTER','ZONE_LEAD','EVENT_LEAD','SYSTEM_ADMIN'],'StaffPermissions','ROLE');ensure(typeof p.active==='boolean'&&Number.isSafeInteger(p.credential_version)&&p.credential_version>=1,'StaffPermissions','CREDENTIAL_VERSION');
      list(p.allowed_station_ids,'StaffPermissions').forEach(id=>ref('StaffPermissions',id,'Stations'));
      list(p.allowed_zone_ids,'StaffPermissions').forEach(id=>ensure(zoneIds.has(id),'StaffPermissions','ZONE'));
    }
    const actor=id=>id==='SYSTEM'||id==='FORM_TRIGGER'||maps.StaffPermissions.has(id)||typeof id==='string'&&id.startsWith('participant:')&&maps.Participants.has(id.slice(12));
    for(const request of s.Requests)ensure(actor(request.actor_id)&&str(request.fingerprint)&&request.result&&typeof request.result==='object'&&!Array.isArray(request.result)&&iso(request.created_at),'Requests','RESULT');
    for(const log of s.StampLogs){
      ref('StampLogs',log.station_id,'Stations');ref('StampLogs',log.participant_id,'Participants');ref('StampLogs',log.team_id,'Teams',true);ref('StampLogs',log.idempotency_key,'Requests');
      ensure(maps.StaffPermissions.has(log.operator_id)&&iso(log.created_at),'StampLogs','OPERATOR_TIME');
      ensure(maps.Requests.get(log.idempotency_key).actor_id===log.operator_id,'StampLogs','REQUEST_ACTOR');
      enums(log.outcome,['PASS','REVOKED'],'StampLogs','OUTCOME');enums(log.stamp_mode,['INDIVIDUAL','TEAM'],'StampLogs','MODE');enums(log.participation_mode,['INDIVIDUAL','TEAM'],'StampLogs','PARTICIPATION');
      if(log.participation_mode==='TEAM')ensure(!nullable(log.team_id),'StampLogs','TEAM_REQUIRED');
      if(log.stamp_mode==='TEAM')ref('StampLogs',log.batch_id,'StampBatches');
      if(log.outcome==='PASS')ensure(nullable(log.reversal_of),'StampLogs','PASS_REVERSAL');
      else {ref('StampLogs',log.reversal_of,'StampLogs');const original=maps.StampLogs.get(log.reversal_of);ensure(original.outcome==='PASS'&&original.participant_id===log.participant_id&&original.station_id===log.station_id&&original.team_id===log.team_id&&original.batch_id===log.batch_id&&str(log.reason),'StampLogs','REVERSAL');}
      ref('StampLogs',log.correction_request_id,'Alerts',true);
    }
    const reversed=new Set(),pairs=new Set();
    for(const log of s.StampLogs.filter(l=>l.outcome==='REVOKED')){ensure(!reversed.has(log.reversal_of),'StampLogs','DUPLICATE_REVERSAL');reversed.add(log.reversal_of);}
    for(const log of Q.effective(s)){const pair=JSON.stringify([log.participant_id,log.station_id]);ensure(!pairs.has(pair),'StampLogs','DUPLICATE_EFFECTIVE_PASS');pairs.add(pair);}
    for(const b of s.StampBatches){
      ref('StampBatches',b.station_id,'Stations');ref('StampBatches',b.team_id,'Teams');ref('StampBatches',b.operator_id,'StaffPermissions');ensure(b.status==='COMMITTED'&&b.policy==='CONFIRMED_PRESENT'&&iso(b.created_at),'StampBatches','COMMIT');
      const present=list(b.present_member_ids,'StampBatches'),absent=list(b.absent_member_ids,'StampBatches');ensure(present.length>=1&&present.length<=10&&!present.some(id=>absent.includes(id)),'StampBatches','ATTENDANCE');
      [...present,...absent].forEach(id=>ref('StampBatches',id,'Participants'));
      const logs=s.StampLogs.filter(l=>l.batch_id===b.batch_id&&l.outcome==='PASS');ensure(logs.length===present.length&&present.every(id=>logs.filter(l=>l.participant_id===id).length===1)&&logs.every(l=>l.station_id===b.station_id&&l.team_id===b.team_id&&l.stamp_mode==='TEAM'&&l.operator_id===b.operator_id&&l.created_at===b.created_at),'StampBatches','COMPLETE_FACTS');
    }
    for(const a of s.Alerts){
      ref('Alerts',a.station_id,'Stations',true);ref('Alerts',a.handler_id,'StaffPermissions',true);ref('Alerts',a.related_log_id,'StampLogs',true);ref('Alerts',a.requested_by,'StaffPermissions',true);
      enums(a.alert_type,['CROWD','SUPPLY','MEDICAL','BROADCAST','OTHER'],'Alerts','TYPE');enums(a.severity,['LOW','MEDIUM','HIGH','CRITICAL'],'Alerts','SEVERITY');enums(a.status,['PENDING','DISPATCHED','RESOLVED'],'Alerts','STATUS');
      ensure(iso(a.created_at)&&str(a.description),'Alerts','DETAILS');if(a.status==='RESOLVED')ensure(iso(a.resolved_at),'Alerts','RESOLUTION_TIME');
    }
    for(const d of s.AttendanceDrafts){
      ref('AttendanceDrafts',d.station_id,'Stations');ref('AttendanceDrafts',d.team_id,'Teams');ref('AttendanceDrafts',d.leader_participant_id,'Participants');list(d.present_member_ids,'AttendanceDrafts').forEach(id=>ref('AttendanceDrafts',id,'Participants'));
      ensure(d.present_member_ids.length>=1&&d.present_member_ids.length<=10&&iso(d.created_at)&&iso(d.expires_at)&&d.expires_at>d.created_at,'AttendanceDrafts','LIFECYCLE');
    }
    for(const a of s.AuditLogs){ensure(actor(a.staff_id)&&iso(a.timestamp)&&str(a.action)&&str(a.request_id)&&str(a.result),'AuditLogs','ATTRIBUTION');for(const key of ['old_value_summary','new_value_summary'])ensure(nullable(a[key])||typeof a[key]==='object'&&!Array.isArray(a[key]),'AuditLogs','SUMMARY_TYPE');}
    const version=Q.config(s,'schema_version');ensure(version===2||allowSchemaV1&&version===1||allowIncompleteStations&&version===null,'EventConfig','SCHEMA_VERSION');
    const required=Q.config(s,'required_station_ids',[]);list(required,'EventConfig').forEach(id=>ref('EventConfig',id,'Stations'));
    const threshold=Q.config(s,'honor_threshold');ensure(threshold===null||Number.isInteger(threshold)&&threshold>=1&&threshold<=30,'EventConfig','THRESHOLD');
    enums(Q.config(s,'team_policy','PENDING'),['PENDING','CONFIRMED_PRESENT'],'EventConfig','POLICY');
    const stale=Q.config(s,'stale_seconds',90);ensure(Number.isInteger(stale)&&stale>=30&&stale<=600,'EventConfig','STALE');
    ensure(Q.validWaitThresholds(Q.config(s,'wait_thresholds',{lowMax:5,mediumMax:10})),'EventConfig','WAIT_THRESHOLDS');
    return {ok:true,tableCount:Q.tables.length,stationCount:s.Stations.length};
  }
  return {validate};
})();
if(typeof module!=='undefined')module.exports=Integrity;
