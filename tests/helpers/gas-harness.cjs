const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto');
const Q=require('../../src/core.js'),seed=require('../../data/stations.json');
function harness(){
 let serial=0,email='master@example.org',locked=false,busy=false,failure=null,calls=0;
 const props=new Map([['SECRET','unit-test-only-secret'],['SPREADSHEET_ID','test']]),cache=new Map(),sheets=new Map();
 const state=Object.fromEntries(Q.tables.map(t=>[t,[]]));state.Stations=structuredClone(seed);state.Stations.forEach(s=>Object.assign(s,{status:'OPEN',venue_approval_status:'APPROVED',service_lanes:2}));state.EventConfig=[{key:'schema_version',value:2},{key:'team_policy',value:'CONFIRMED_PRESENT'}];
 state.StaffPermissions=[{staff_id:'M',account_email:'master@example.org',active:true,role:'STATION_MASTER',allowed_station_ids:['S03','S12'],allowed_zone_ids:[],credential_version:1},{staff_id:'A',account_email:'admin@example.org',active:true,role:'SYSTEM_ADMIN',allowed_station_ids:[],allowed_zone_ids:[],credential_version:1}];
 state.Teams=[{team_id:'T',member_min:8,member_max:10,status:'ACTIVE'}];state.Participants=Array.from({length:9},(_,i)=>({participant_id:'P'+i,name:'PRIVATE',unit_type:'童軍',external_id:'E'+i,qr_token_hash:null,troop_name:'Test',participation_mode:i?'TEAM':'INDIVIDUAL',team_id:i?'T':null,active_status:'ACTIVE'}));
 function putState(s){Q.tables.forEach((name,i)=>sheets.set(name,{id:i+1,values:[Q.schemas[name],...s[name].map(r=>Q.schemas[name].map(k=>JSON.stringify(r[k]??null)))]}));}
 putState(state);
 function sheet(name){if(!sheets.has(name))return null;return {getSheetId:()=>sheets.get(name).id,getLastRow:()=>sheets.get(name).values.length,getMaxRows:()=>20000,getMaxColumns:()=>sheets.get(name).maxColumns||26,getRange:(r,c,n,m)=>({getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>sheets.get(name).values[r-1+i]?.[c-1+j]??'')),setValues:v=>sheets.get(name).values=v}),setFrozenRows:()=>{}};}
 const ss={getName:()=> 'TEST ONLY｜11635SCOUT｜VM fixture',getId:()=> 'test',getSheetByName:sheet,insertSheet:n=>{sheets.set(n,{id:sheets.size+1,values:[]});return sheet(n);}};
 const ctx={console,Date,JSON,Math,Set,Map,Number,String,Object,Array,Error,RegExp,
  Session:{getActiveUser:()=>({getEmail:()=>email})},SpreadsheetApp:{openById:()=>ss,getActiveSpreadsheet:()=>ss},
  Utilities:{getUuid:()=>crypto.randomUUID(),computeHmacSha256Signature:(s,k)=>crypto.createHmac('sha256',k).update(s).digest(),base64EncodeWebSafe:b=>Buffer.from(b).toString('base64url')},
  PropertiesService:{getScriptProperties:()=>({getProperty:k=>props.get(k)||null,setProperty:(k,v)=>props.set(k,v),deleteProperty:k=>props.delete(k),getProperties:()=>Object.fromEntries(props)})},
  CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v),remove:k=>cache.delete(k)})},
  LockService:{getScriptLock:()=>({tryLock:()=>{if(busy)return false;locked=true;return true;},waitLock:()=>{locked=true;},hasLock:()=>locked,releaseLock:()=>{locked=false;}})},
  Sheets:{Spreadsheets:{batchUpdate:({requests})=>{calls++;assert.equal(locked,true);if(failure==='before')throw new Error('injected failure');const copy=structuredClone([...sheets]);for(const req of requests){if(req.appendDimension){const dim=req.appendDimension,pair=copy.find(([,v])=>v.id===dim.sheetId);if(dim.dimension==='COLUMNS')pair[1].maxColumns=(pair[1].maxColumns||26)+dim.length;continue;}if(!req.updateCells)continue;const u=req.updateCells,pair=copy.find(([,v])=>v.id===u.range.sheetId);u.rows.forEach((r,i)=>{const target=pair[1].values[u.range.startRowIndex+i]||(pair[1].values[u.range.startRowIndex+i]=[]);r.values.forEach((c,j)=>{target[(u.range.startColumnIndex||0)+j]=c.userEnteredValue.stringValue;});});}sheets.clear();copy.forEach(([k,v])=>sheets.set(k,v));if(failure==='after')throw new Error('lost response');}}}
 };
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('src/core.js','utf8'),ctx);vm.runInContext(fs.readFileSync('src/integrity.js','utf8'),ctx);vm.runInContext(fs.readFileSync('backend-gas/Code.gs','utf8'),ctx);ctx.SEED_STATIONS=structuredClone(seed);
 return {ctx,state:()=>JSON.parse(JSON.stringify(ctx.load_())),api:(a,q={})=>JSON.parse(JSON.stringify(ctx.api(a,q))),email:v=>email=v,fail:v=>failure=v,busy:v=>busy=v,calls:()=>calls,props,cache,putState,sheets,unlock:()=>{props.set('PIN_S03',ctx.digest_('pin:S03:1234'));props.set('PIN_S12',ctx.digest_('pin:S12:1234'));assert.equal(ctx.api('unlockStation',{stationId:'S03',pin:'1234'}).ok,true);assert.equal(ctx.api('unlockStation',{stationId:'S12',pin:'1234'}).ok,true);}};
}
module.exports={harness};
