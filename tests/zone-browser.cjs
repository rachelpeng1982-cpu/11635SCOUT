const {chromium}=require('@playwright/test'),assert=require('node:assert/strict');
const {Q,fixture,call,now}=require('./helpers/fixture.cjs');const I=require('../src/integrity.js');
(async()=>{
 let state=fixture(),serial=0;const alert=call(state,'createAlert',{stationId:'S03',type:'CROWD',severity:'HIGH',description:'分區排隊測試，請派本站人員'});
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.exposeFunction('__rpc',(action,q)=>{
  const draft=structuredClone(state);
  try{const data=Q.execute(draft,action,q,{actor:draft.StaffPermissions.find(p=>p.staff_id==='Z1'),now,id:()=> 'browser-event-'+(++serial),requestId:'browser-'+serial,fingerprint:JSON.stringify({action,q}),unlocked:false});I.validate(draft);state=draft;return {ok:true,data};}
  catch(e){return {ok:false,error:{code:e.code||'ERROR',message:e.code||'ERROR'}};}
 });
 await page.addInitScript(()=>{window.google={script:{run:{withSuccessHandler(fn){this.success=fn;return this;},withFailureHandler(fn){this.failure=fn;return this;},api(action,q){const resolve=this.success,reject=this.failure;window.__rpc(action,q).then(resolve,reject);}}}};});
 await page.goto('http://127.0.0.1:8765');await page.locator('#staff-login').click();await page.locator('#master-station').waitFor();await page.locator('#master-station').selectOption('S03');await page.getByRole('button',{name:'分區派工',exact:true}).waitFor();
 assert.equal(await page.locator('#master-station option').count(),5);assert.equal(await page.getByRole('button',{name:'確認個人通過',exact:true}).count(),0);assert.equal(await page.locator('[data-route=war-room]').isVisible(),false);
 await page.locator('[id^=zone-handler-]').selectOption('M1');await page.getByRole('button',{name:'分區派工',exact:true}).click();await page.waitForTimeout(100);assert.equal(state.Alerts[0].status,'DISPATCHED');assert.equal(state.Alerts[0].handler_id,'M1');const audit=state.AuditLogs.at(-1);assert.equal(audit.staff_id,'Z1');assert.equal(audit.old_value_summary.alert.status,'PENDING');assert.equal(audit.new_value_summary.alert.status,'DISPATCHED');
 const before=JSON.stringify(state.Alerts);const denied=await page.evaluate(({id})=>__rpc('resolveAlert',{alertId:id,status:'DISPATCHED',handlerId:'M2',idempotencyKey:'outside-handler-request'}),{id:alert.alertId});assert.equal(denied.error.code,'FORBIDDEN');assert.equal(JSON.stringify(state.Alerts),before);
 const outside=await page.evaluate(()=>__rpc('getStationDetail',{stationId:'S16'}));assert.equal(outside.error.code,'FORBIDDEN');
 await page.getByRole('button',{name:'分區結案',exact:true}).click();await page.waitForTimeout(100);assert.equal(state.Alerts[0].status,'RESOLVED');assert.equal(state.Alerts[0].handler_id,'M1');assert.equal(await page.getByRole('button',{name:'分區結案',exact:true}).count(),0);
 assert.deepEqual(errors,[]);console.log('PASS: browser → API envelope → real shared domain → integrity validator; zone UI lists five stations, dispatches eligible staff, audits before/after, denies foreign handler/zone, and closes alert. Google transport is a test bridge.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
