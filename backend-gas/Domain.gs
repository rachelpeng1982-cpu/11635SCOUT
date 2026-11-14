/* Shared Node/GAS domain. No browser identity or client clock is trusted. */
var Quest = (() => {
  const tables = ['Participants','Teams','Stations','StampLogs','Alerts','StaffPermissions','AuditLogs','StampBatches','Requests','EventConfig','AttendanceDrafts'];
  const schemas = {
    Participants:['participant_id','external_id','qr_token_hash','name','troop_name','unit_type','participation_mode','team_id','active_status','checked_in_at','created_at','updated_at'],
    Teams:['team_id','team_name','troop_name','leader_participant_id','member_min','member_max','status','created_at'],
    Stations:['station_id','zone_id','zone_name','station_name','theme','location_code','task_description','age_variants','accessibility','rain_plan','notes','location_desc','venue_approval_status','status','individual_duration_min','team_duration_min','service_lanes','current_individual_queue','current_team_queue','queue_updated_at','last_updated'],
    StampLogs:['log_id','batch_id','station_id','participant_id','team_id','stamp_mode','participation_mode','outcome','created_at','operator_id','idempotency_key','source','reversal_of','reason','correction_request_id'],
    Alerts:['alert_id','created_at','station_id','alert_type','severity','description','status','handler_id','resolved_at','public_message','related_log_id','requested_by'],
    StaffPermissions:['staff_id','account_email','role','allowed_station_ids','allowed_zone_ids','active','credential_version','updated_at'],
    AuditLogs:['audit_id','timestamp','staff_id','action','entity_type','entity_id','request_id','result','reason','old_value_summary','new_value_summary'],
    StampBatches:['batch_id','station_id','team_id','present_member_ids','absent_member_ids','policy','status','created_at','operator_id'],
    Requests:['idempotency_key','actor_id','fingerprint','result','created_at'],
    EventConfig:['key','value'],
    AttendanceDrafts:['draft_id','station_id','team_id','leader_participant_id','present_member_ids','created_at','expires_at']
  };
  class Fault extends Error { constructor(code){super(code);this.code=code;} }
  const fail = c => {throw new Fault(c);};
  const text = (x,max=200) => {if(typeof x!=='string'||!x.trim()||x.length>max||/^[\s]*[=+@\-\t\r]/.test(x)||/[<>\u0000]/.test(x))fail('INVALID_INPUT');return x.trim();};
  const integer = x => {if(!Number.isSafeInteger(x)||x<0||x>10000)fail('INVALID_INPUT');return x;};
  const config = (s,k,def=null) => {const row=s.EventConfig.find(r=>r.key===k);return row?row.value:def;};
  const effective = s => {const revoked=new Set(s.StampLogs.filter(r=>r.outcome==='REVOKED').map(r=>r.reversal_of));return s.StampLogs.filter(r=>r.outcome==='PASS'&&!revoked.has(r.log_id));};
  const isAdmin = actor => actor && ['EVENT_LEAD','SYSTEM_ADMIN'].includes(actor.role);
  const auth = actor => {if(!actor||actor.active!==true)fail('UNAUTHORIZED');};
  const admin = actor => {auth(actor);if(!isAdmin(actor))fail('FORBIDDEN');};
  function station(s,id){return s.Stations.find(r=>r.station_id===id)||fail('NOT_FOUND');}
  function scope(actor,st,write=false){auth(actor);if(actor.role==='SYSTEM_ADMIN')return;
    if(!write&&actor.role==='EVENT_LEAD')return;
    if(!write&&actor.role==='ZONE_LEAD'&&(actor.allowed_zone_ids||[]).includes(st.zone_id))return;
    if(actor.role==='STATION_MASTER'&&(actor.allowed_station_ids||[]).includes(st.station_id))return;
    fail('FORBIDDEN');
  }
  function active(s,id){const p=s.Participants.find(p=>p.participant_id===id);if(!p||p.active_status!=='ACTIVE')fail('INELIGIBLE');return p;}
  // Deliberate allowlist: no names, contacts, hashes, PINs, tokens or request payloads.
  function safeSummary(s,q={}){
    const st=s.Stations.find(r=>r.station_id===q.stationId);
    const p=s.Participants.find(r=>r.participant_id===q.participantId);
    const team=s.Teams.find(r=>r.team_id===q.teamId);
    const alert=s.Alerts.find(r=>r.alert_id===q.alertId||r.alert_id===q.correctionRequestId);
    const event=s.EventConfig.find(r=>r.key===q.key&&['honor_threshold','required_station_ids','team_policy','stale_seconds','schema_version'].includes(r.key));
    return JSON.parse(JSON.stringify({
      counts:{participants:s.Participants.length,teams:s.Teams.length,stampEvents:s.StampLogs.length,effectivePasses:effective(s).length,batches:s.StampBatches.length,alerts:s.Alerts.length,attendanceDrafts:s.AttendanceDrafts.length},
      station:st?{stationId:st.station_id,status:st.status,venueApproval:st.venue_approval_status,individualQueue:st.current_individual_queue,teamQueue:st.current_team_queue,serviceLanes:st.service_lanes,individualDuration:st.individual_duration_min,teamDuration:st.team_duration_min}:null,
      participant:p?{activeStatus:p.active_status,checkedIn:Boolean(p.checked_in_at),teamId:p.team_id,credentialAvailable:Boolean(p.qr_token_hash),updatedAt:p.updated_at||null}:null,
      team:team?{leaderParticipantId:team.leader_participant_id,status:team.status}:null,
      alert:alert?{status:alert.status,handlerId:alert.handler_id,resolvedAt:alert.resolved_at}:null,
      event:event?{key:event.key,value:event.value}:null
    }));
  }
  function audit(s,ctx,action,id,result='OK',reason=''){
    const entityTypes={approveIndividualStamp:'StampLogs',approveTeamStamp:'StampBatches',revokeStamp:'StampLogs',registerParticipant:'Participants',markCheckedIn:'Participants',issueParticipantQr:'Participants',createTeam:'Teams',setTeamLeader:'Teams',submitTeamAttendance:'AttendanceDrafts',updateQueue:'Stations',changeStationStatus:'Stations',configureStation:'Stations',updateEventConfig:'EventConfig',createAlert:'Alerts',resolveAlert:'Alerts',requestStampCorrection:'Alerts',STAFF_CHANGE:'StaffPermissions',PIN_ROTATE:'StationCredentials'};
    s.AuditLogs.push({audit_id:ctx.id(),timestamp:ctx.now,staff_id:ctx.actor?.staff_id||'SYSTEM',action,entity_type:entityTypes[action]||action,entity_id:id||'',request_id:ctx.requestId,result,reason:typeof reason==='string'?reason.slice(0,300):'',old_value_summary:ctx.oldSummary??null,new_value_summary:ctx.newSummary??null});
  }
  function canDispatch(s,actor,alert){
    auth(actor);
    if(isAdmin(actor))return true;
    return actor.role==='ZONE_LEAD'&&Boolean(alert.station_id)&&!alert.related_log_id&&alert.alert_type!=='BROADCAST'&&(actor.allowed_zone_ids||[]).includes(station(s,alert.station_id).zone_id);
  }
  function dispatchStaff(s,actor,alert){
    if(!canDispatch(s,actor,alert))fail('FORBIDDEN');
    return s.StaffPermissions.filter(p=>p.active===true&&(isAdmin(actor)||
      p.staff_id===actor.staff_id||p.role==='STATION_MASTER'&&(p.allowed_station_ids||[]).includes(alert.station_id)||
      p.role==='ZONE_LEAD'&&(p.allowed_zone_ids||[]).includes(station(s,alert.station_id).zone_id)
    )).map(p=>({staffId:p.staff_id,role:p.role}));
  }
  function board(s,now,range={}){const passes=effective(s).filter(p=>(!range.from||p.created_at>=range.from)&&(!range.to||p.created_at<=range.to));return s.Stations.map(st=>{
    const records=passes.filter(p=>p.station_id===st.station_id);
    const completed=new Set(s.StampBatches.filter(b=>b.station_id===st.station_id&&b.status==='COMMITTED'&&b.present_member_ids.length&&b.present_member_ids.every(id=>records.some(p=>p.participant_id===id))).map(b=>b.team_id));
    const age=st.queue_updated_at?Date.parse(now)-Date.parse(st.queue_updated_at):Infinity;
    const stale=!Number.isFinite(age)||age<0||age>Number(config(s,'stale_seconds',90))*1000;
    let wait=null,level='UNKNOWN';
    const valid=[st.current_individual_queue,st.current_team_queue].every(x=>Number.isInteger(x)&&x>=0)&&Number.isInteger(st.service_lanes)&&st.service_lanes>=1&&[st.individual_duration_min,st.team_duration_min].every(x=>Number.isFinite(x)&&x>0);
    if(st.status!=='OPEN')level='UNAVAILABLE';else if(stale)level='STALE';else if(valid){wait=Math.ceil((st.current_individual_queue*st.individual_duration_min+st.current_team_queue*st.team_duration_min)/st.service_lanes);level=wait<=5?'LOW':wait<=10?'MEDIUM':'HIGH';}
    return {stationId:st.station_id,zoneId:st.zone_id,zoneName:st.zone_name,name:st.station_name,description:st.task_description||'',ageVariants:st.age_variants||{},accessibility:st.accessibility||'',rainPlan:st.rain_plan||'',location:st.location_desc,venueApproved:st.venue_approval_status==='APPROVED',status:st.status,individualCount:records.filter(p=>p.participation_mode==='INDIVIDUAL').length,teamMemberCount:records.filter(p=>p.participation_mode==='TEAM').length,completedTeamCount:completed.size,individualQueue:st.current_individual_queue,teamQueue:st.current_team_queue,estimatedWaitMin:wait,congestion:level,lastUpdated:st.queue_updated_at};
  });}
  const csvCell=x=>{let s=String(x??'');if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
  function execute(s,action,q,ctx){
    const actor=ctx.actor;const now=ctx.now;const oldSummary=safeSummary(s,q);
    if(action==='getPublicStationBoard'){
      const stations=board(s,now),rank={CRITICAL:0,HIGH:1,MEDIUM:2,LOW:3};
      return {stations,recommendations:stations.filter(st=>st.status==='OPEN'&&st.venueApproved&&['LOW','MEDIUM'].includes(st.congestion)&&st.estimatedWaitMin!==null).sort((a,b)=>a.estimatedWaitMin-b.estimatedWaitMin||a.stationId.localeCompare(b.stationId)).slice(0,3).map(st=>({stationId:st.stationId,name:st.name,estimatedWaitMin:st.estimatedWaitMin})),announcements:s.Alerts.filter(a=>a.public_message&&a.status!=='RESOLVED').sort((a,b)=>rank[a.severity]-rank[b.severity]).map(a=>({message:a.public_message,severity:a.severity})),serverTime:now};
    }
    if(action==='getMyProgress'){
      if(!ctx.participantId)fail('UNAUTHORIZED');const p=active(s,ctx.participantId), own=effective(s).filter(l=>l.participant_id===p.participant_id),threshold=config(s,'honor_threshold');
      const required=config(s,'required_station_ids',[]);
      const peers=p.team_id?s.Participants.filter(m=>m.team_id===p.team_id&&m.active_status==='ACTIVE').map(m=>({participantId:m.participant_id,completedCount:effective(s).filter(l=>l.participant_id===m.participant_id).length})):[];
      const isTeamLeader=s.Teams.some(t=>t.team_id===p.team_id&&t.leader_participant_id===p.participant_id&&t.status==='ACTIVE');
      return {isTeamLeader,requiredStationIds:required,teamSummary:peers,participantId:p.participant_id,name:p.name,troop:p.troop_name,mode:p.participation_mode,teamId:p.team_id,completedStationIds:own.map(l=>l.station_id),totalCount:30,honorThreshold:threshold,honorAwarded:Number.isInteger(threshold)&&threshold>0&&own.length>=threshold&&required.every(id=>own.some(l=>l.station_id===id)),teamMemberCount:p.team_id?s.Participants.filter(m=>m.team_id===p.team_id&&m.active_status==='ACTIVE').length:0};
    }
    if(action==='submitTeamAttendance'){
      if(!ctx.participantId)fail('UNAUTHORIZED');const p=active(s,ctx.participantId),team=s.Teams.find(t=>t.team_id===p.team_id&&t.status==='ACTIVE'&&t.leader_participant_id===p.participant_id);if(!team)fail('FORBIDDEN');
      station(s,q.stationId);const key=text(q.idempotencyKey,100),actorId='participant:'+p.participant_id,old=s.Requests.find(r=>r.idempotency_key===key);
      if(old){if(old.actor_id!==actorId||old.fingerprint!==ctx.fingerprint)fail('IDEMPOTENCY_CONFLICT');return old.result;}
      if(!Array.isArray(q.presentMemberIds)||!q.presentMemberIds.length||new Set(q.presentMemberIds).size!==q.presentMemberIds.length||q.presentMemberIds.length>10)fail('INVALID_ATTENDANCE');
      if(q.presentMemberIds.some(id=>{const member=s.Participants.find(x=>x.participant_id===id);return !member||member.team_id!==team.team_id||member.active_status!=='ACTIVE';}))fail('INVALID_ATTENDANCE');
      const draft={draft_id:ctx.id(),station_id:q.stationId,team_id:team.team_id,leader_participant_id:p.participant_id,present_member_ids:q.presentMemberIds.slice(),created_at:now,expires_at:new Date(Date.parse(now)+900000).toISOString()};s.AttendanceDrafts.push(draft);
      const result={draftId:draft.draft_id,stamped:false,expiresAt:draft.expires_at};s.Requests.push({idempotency_key:key,actor_id:actorId,fingerprint:ctx.fingerprint,result,created_at:now});audit(s,{...ctx,actor:{staff_id:actorId},oldSummary,newSummary:safeSummary(s,q)},action,draft.draft_id);return result;
    }
    auth(actor);
    if(action==='getStaffContext')return {staffId:actor.staff_id,role:actor.role,stationIds:actor.allowed_station_ids||[],zoneIds:actor.allowed_zone_ids||[]};
    if(action==='getAdminDashboard'||action==='exportReport'){
      admin(actor);for(const key of ['from','to'])if(q[key]&&(typeof q[key]!=='string'||!Number.isFinite(Date.parse(q[key]))||new Date(q[key]).toISOString()!==q[key]))fail('INVALID_INPUT');if(q.from&&q.to&&q.from>q.to)fail('INVALID_INPUT');let stations=board(s,now,q);if(q.zoneId)stations=stations.filter(st=>st.zoneId===q.zoneId);if(q.status)stations=stations.filter(st=>st.status===q.status);
      const passes=effective(s);
      if(action==='exportReport'){
        const header=['stationId','name','zoneId','status','individualCount','teamMemberCount','completedTeamCount','individualQueue','teamQueue','estimatedWaitMin','congestion','lastUpdated'];
        return {csv:'\ufeff'+['# timezone=Asia/Taipei; generatedAt='+now+'; scope=current effective passes; from='+(q.from||'BEGINNING')+'; to='+(q.to||now)+'; counts=person-stations/team-stations; queues=service units',header.join(','),...stations.map(st=>header.map(k=>csvCell(st[k])).join(','))].join('\r\n')};
      }
      return {dispatchStaff:s.StaffPermissions.filter(p=>p.active).map(p=>({staffId:p.staff_id,role:p.role})),stations,summary:{uniqueCheckedInParticipants:s.Participants.filter(p=>p.active_status==='ACTIVE'&&p.checked_in_at).length,activeTeams:s.Teams.filter(t=>{const count=s.Participants.filter(p=>p.team_id===t.team_id&&p.active_status==='ACTIVE').length;return t.status==='ACTIVE'&&count>=t.member_min&&count<=t.member_max;}).length,individualStampCount:passes.filter(p=>p.participation_mode==='INDIVIDUAL').length,teamMemberStampCount:passes.filter(p=>p.participation_mode==='TEAM').length,completedTeamStationCount:board(s,now).reduce((n,r)=>n+r.completedTeamCount,0),totalValidStamps:passes.length},alerts:s.Alerts,serverTime:now};
    }
    if(action==='getStationDetail'){
      const st=station(s,q.stationId);scope(actor,st);return {attendanceDrafts:s.AttendanceDrafts.filter(d=>d.station_id===q.stationId&&d.expires_at>=now).slice(-20),station:board(s,now).find(r=>r.stationId===q.stationId),history:s.StampLogs.filter(r=>r.station_id===q.stationId).slice(-20).map(r=>({logId:r.log_id,participantId:r.participant_id,outcome:r.outcome,createdAt:r.created_at})),alerts:s.Alerts.filter(a=>a.station_id===q.stationId&&(!a.related_log_id||isAdmin(actor))).map(a=>({...a,canDispatch:canDispatch(s,actor,a),dispatchStaff:canDispatch(s,actor,a)?dispatchStaff(s,actor,a):[]}))};
    }
    if(action==='lookupParticipantForStamp'){
      const st=station(s,q.stationId);scope(actor,st,true);if(!ctx.unlocked)fail('STATION_LOCKED');
      let p;if(q.participantId){if(q.identityConfirmed!==true)fail('IDENTITY_CONFIRMATION_REQUIRED');p=active(s,text(q.participantId));}else{p=s.Participants.find(p=>p.qr_token_hash===ctx.credentialHash&&p.active_status==='ACTIVE');if(!p)fail('INVALID_CREDENTIAL');}
      return {attendanceDraft:p.team_id?s.AttendanceDrafts.filter(d=>d.team_id===p.team_id&&d.station_id===q.stationId&&d.expires_at>=now).slice(-1)[0]||null:null,participantId:p.participant_id,name:p.name,mode:p.participation_mode,teamId:p.team_id,alreadyStamped:effective(s).some(l=>l.participant_id===p.participant_id&&l.station_id===q.stationId),members:p.team_id?s.Participants.filter(m=>m.team_id===p.team_id&&m.active_status==='ACTIVE').map(m=>({participantId:m.participant_id,name:m.name})):[]};
    }
    const key=text(q.idempotencyKey,100);if(!/^[A-Za-z0-9_-]{12,100}$/.test(key))fail('INVALID_INPUT');
    const fingerprint=ctx.fingerprint;
    const old=s.Requests.find(r=>r.idempotency_key===key);
    if(old){if(old.actor_id!==actor.staff_id||old.fingerprint!==fingerprint)fail('IDEMPOTENCY_CONFLICT');return old.result;}
    let result;
    if(action==='approveIndividualStamp'||action==='approveTeamStamp'){
      const st=station(s,q.stationId);scope(actor,st,true);if(!ctx.unlocked)fail('STATION_LOCKED');if(st.status!=='OPEN'||st.venue_approval_status!=='APPROVED')fail('STATION_CLOSED');
      let people,batch=null;
      if(action==='approveIndividualStamp'){
        if(q.identityConfirmed!==true)fail('IDENTITY_CONFIRMATION_REQUIRED');
        people=[active(s,text(q.participantId))];
      }else{
        if(config(s,'team_policy')!=='CONFIRMED_PRESENT')fail('POLICY_PENDING');
        const team=s.Teams.find(t=>t.team_id===q.teamId&&t.status==='ACTIVE');if(!team)fail('INELIGIBLE');
        const all=s.Participants.filter(p=>p.team_id===team.team_id&&p.active_status==='ACTIVE');
        if(all.length<team.member_min||all.length>team.member_max)fail('TEAM_SIZE_INVALID');
        if(!Array.isArray(q.presentMemberIds)||!q.presentMemberIds.length||new Set(q.presentMemberIds).size!==q.presentMemberIds.length||q.presentMemberIds.length>10||q.attendanceConfirmed!==true)fail('INVALID_ATTENDANCE');
        people=q.presentMemberIds.map(id=>active(s,id));if(people.some(p=>p.team_id!==team.team_id||p.participation_mode!=='TEAM'))fail('INVALID_ATTENDANCE');
        batch={batch_id:ctx.id(),station_id:q.stationId,team_id:team.team_id,present_member_ids:people.map(p=>p.participant_id),absent_member_ids:all.filter(p=>!q.presentMemberIds.includes(p.participant_id)).map(p=>p.participant_id),policy:'CONFIRMED_PRESENT',status:'COMMITTED',created_at:now,operator_id:actor.staff_id};
      }
      const passes=effective(s);if(people.some(p=>passes.some(l=>l.station_id===q.stationId&&l.participant_id===p.participant_id)))fail('ALREADY_STAMPED');
      const logs=people.map(p=>({log_id:ctx.id(),batch_id:batch?.batch_id||null,station_id:q.stationId,participant_id:p.participant_id,team_id:p.team_id||null,stamp_mode:batch?'TEAM':'INDIVIDUAL',participation_mode:p.participation_mode,outcome:'PASS',created_at:now,operator_id:actor.staff_id,idempotency_key:key,source:'ONLINE',reversal_of:null,reason:null}));
      s.StampLogs.push(...logs);if(batch)s.StampBatches.push(batch);result={confirmed:true,logIds:logs.map(l=>l.log_id),batchId:batch?.batch_id||null,count:people.length};
    }else if(action==='updateQueue'){
      const st=station(s,q.stationId);scope(actor,st,true);if(!ctx.unlocked)fail('STATION_LOCKED');st.current_individual_queue=integer(q.individualQueue);st.current_team_queue=integer(q.teamQueue);st.queue_updated_at=now;st.last_updated=now;result={updated:true};
    }else if(action==='changeStationStatus'){
      admin(actor);const st=station(s,q.stationId);if(!['OPEN','PAUSED','CLOSED'].includes(q.status))fail('INVALID_INPUT');text(q.reason);
      if(q.status==='OPEN'&&(st.venue_approval_status!=='APPROVED'||!Number.isInteger(st.service_lanes)||st.service_lanes<1))fail('VENUE_PENDING');st.status=q.status;st.last_updated=now;result={updated:true};
    }else if(action==='configureStation'){
      if(actor.role!=='SYSTEM_ADMIN')fail('FORBIDDEN');const st=station(s,q.stationId);for(const key of ['individualDuration','teamDuration'])if(!Number.isFinite(q[key])||q[key]<=0||q[key]>120)fail('INVALID_INPUT');if(!['APPROVED','PENDING'].includes(q.venueApproval))fail('INVALID_INPUT');const lanes=integer(q.serviceLanes);if(!lanes)fail('INVALID_INPUT');st.service_lanes=lanes;st.individual_duration_min=q.individualDuration;st.team_duration_min=q.teamDuration;st.venue_approval_status=q.venueApproval;for(const [key,field]of Object.entries({stationName:'station_name',locationDescription:'location_desc',taskDescription:'task_description',accessibility:'accessibility',rainPlan:'rain_plan',notes:'notes'}))if(q[key]!==undefined)st[field]=text(q[key],500);if(q.ageVariants!==undefined){if(typeof q.ageVariants!=='object'||Array.isArray(q.ageVariants)||q.ageVariants===null)fail('INVALID_INPUT');const variants={};for(const [key,value]of Object.entries(q.ageVariants)){variants[text(key,30)]=text(value,300);}st.age_variants=variants;}if(q.venueApproval!=='APPROVED')st.status='CLOSED';result={updated:true};
    }else if(action==='updateEventConfig'){
      if(actor.role!=='SYSTEM_ADMIN')fail('FORBIDDEN');text(q.reason,300);
      if(q.key==='honor_threshold'){if(q.value!==null&&(!Number.isInteger(q.value)||q.value<1||q.value>30))fail('INVALID_INPUT');}
      else if(q.key==='team_policy'){if(!['PENDING','CONFIRMED_PRESENT'].includes(q.value))fail('INVALID_INPUT');}
      else if(q.key==='required_station_ids'){if(!Array.isArray(q.value)||new Set(q.value).size!==q.value.length||q.value.some(id=>!s.Stations.some(st=>st.station_id===id)))fail('INVALID_INPUT');}
      else if(q.key==='stale_seconds'){if(!Number.isInteger(q.value)||q.value<30||q.value>600)fail('INVALID_INPUT');}
      else fail('INVALID_INPUT');
      const row=s.EventConfig.find(r=>r.key===q.key);if(row)row.value=q.value;else s.EventConfig.push({key:q.key,value:q.value});result={updated:true};
    }else if(action==='registerParticipant'){
      if(actor.role!=='SYSTEM_ADMIN')fail('FORBIDDEN');const ext=text(q.externalId,100);if(s.Participants.some(p=>p.external_id===ext))fail('ALREADY_REGISTERED');
      if(!['INDIVIDUAL','TEAM'].includes(q.mode))fail('INVALID_INPUT');if(q.mode==='TEAM'){const team=s.Teams.find(t=>t.team_id===q.teamId&&t.status==='ACTIVE');if(!team)fail('INELIGIBLE');if(s.Participants.filter(p=>p.team_id===q.teamId&&p.active_status==='ACTIVE').length>=team.member_max)fail('TEAM_SIZE_INVALID');}
      const id=ctx.id();s.Participants.push({participant_id:id,external_id:ext,qr_token_hash:null,name:text(q.name,80),troop_name:text(q.troop,100),unit_type:text(q.unitType,30),participation_mode:q.mode,team_id:q.mode==='TEAM'?q.teamId:null,active_status:'ACTIVE',checked_in_at:null,created_at:now,updated_at:now});result={participantId:id};
    }else if(action==='createTeam'){
      if(actor.role!=='SYSTEM_ADMIN')fail('FORBIDDEN');const id=text(q.teamId,60);if(s.Teams.some(t=>t.team_id===id))fail('ALREADY_REGISTERED');s.Teams.push({team_id:id,team_name:text(q.name,80),troop_name:text(q.troop,100),leader_participant_id:null,member_min:8,member_max:10,status:'ACTIVE',created_at:now});result={teamId:id};
    }else if(action==='setTeamLeader'){
      if(actor.role!=='SYSTEM_ADMIN')fail('FORBIDDEN');const team=s.Teams.find(t=>t.team_id===q.teamId&&t.status==='ACTIVE'),person=active(s,q.participantId);if(!team||person.team_id!==team.team_id)fail('INVALID_ATTENDANCE');team.leader_participant_id=person.participant_id;result={updated:true};
    }else if(action==='markCheckedIn'){
      admin(actor);const p=active(s,q.participantId);p.checked_in_at=p.checked_in_at||now;p.updated_at=now;result={checkedIn:true};
    }else if(action==='requestStampCorrection'){
      admin(actor);const log=effective(s).find(l=>l.log_id===q.logId);if(!log)fail('NOT_FOUND');const reason=text(q.reason,300),id=ctx.id();s.Alerts.push({alert_id:id,created_at:now,station_id:log.station_id,alert_type:'OTHER',severity:'MEDIUM',description:'成績更正申請：'+reason,status:'PENDING',handler_id:null,resolved_at:null,public_message:'',related_log_id:log.log_id,requested_by:actor.staff_id});result={requestId:id,stamped:false};
    }else if(action==='revokeStamp'){
      if(actor.role!=='SYSTEM_ADMIN')fail('FORBIDDEN');const log=effective(s).find(l=>l.log_id===q.logId);if(!log)fail('NOT_FOUND');const reason=text(q.reason,300);if(q.correctionRequestId){const request=s.Alerts.find(a=>a.alert_id===q.correctionRequestId&&a.related_log_id===q.logId&&a.status!=='RESOLVED');if(!request)fail('INVALID_INPUT');request.status='RESOLVED';request.handler_id=actor.staff_id;request.resolved_at=now;}s.StampLogs.push({...log,log_id:ctx.id(),outcome:'REVOKED',created_at:now,operator_id:actor.staff_id,idempotency_key:key,reversal_of:log.log_id,reason,correction_request_id:q.correctionRequestId||null});result={revoked:true};
    }else if(action==='createAlert'){
      if(q.stationId){const st=station(s,q.stationId);if(!isAdmin(actor))scope(actor,st);}else admin(actor);
      if(!['CROWD','SUPPLY','MEDICAL','BROADCAST','OTHER'].includes(q.type)||!['LOW','MEDIUM','HIGH','CRITICAL'].includes(q.severity))fail('INVALID_INPUT');
      const id=ctx.id(),publicMessage=q.publicMessage?text(q.publicMessage,300):'';if(publicMessage&&!isAdmin(actor))fail('FORBIDDEN');
      s.Alerts.push({alert_id:id,created_at:now,station_id:q.stationId||null,alert_type:q.type,severity:q.severity,description:text(q.description,500),status:'PENDING',handler_id:null,resolved_at:null,public_message:publicMessage});result={alertId:id};
    }else if(action==='resolveAlert'){
      const a=s.Alerts.find(a=>a.alert_id===q.alertId);if(!a)fail('NOT_FOUND');
      if(!canDispatch(s,actor,a))fail('FORBIDDEN');
      if(a.related_log_id)fail('CORRECTION_REQUIRES_REVIEW');
      if(!['DISPATCHED','RESOLVED'].includes(q.status))fail('INVALID_INPUT');
      if(a.status==='RESOLVED')fail('ALREADY_RESOLVED');
      const handlerId=q.handlerId||a.handler_id||actor.staff_id;
      if(!dispatchStaff(s,actor,a).some(p=>p.staffId===handlerId))fail('FORBIDDEN');
      a.status=q.status;a.handler_id=handlerId;if(a.status==='RESOLVED')a.resolved_at=now;result={updated:true};
    }else fail('UNKNOWN_ACTION');
    const entityId=action==='approveTeamStamp'?result.batchId:action==='approveIndividualStamp'?result.logIds[0]:action==='registerParticipant'?result.participantId:action==='createTeam'?result.teamId:action==='createAlert'?result.alertId:action==='requestStampCorrection'?result.requestId:action==='setTeamLeader'?q.teamId:action==='updateEventConfig'?q.key:q.logId||q.alertId||q.stationId||q.participantId||'';
    audit(s,{...ctx,oldSummary,newSummary:safeSummary(s,q)},action,entityId, 'OK',q.reason||'');
    s.Requests.push({idempotency_key:key,actor_id:actor.staff_id,fingerprint,result,created_at:now});return result;
  }
  return {tables,schemas,Fault,fail,text,integer,config,effective,board,execute,audit,safeSummary,scope,admin};
})();
if(typeof module!=='undefined')module.exports=Quest;
