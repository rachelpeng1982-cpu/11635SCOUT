import QRCode from 'qrcode';
export {QRCode};
export class Api {
  constructor(seed){this.demo=!(globalThis.google?.script?.run);this.seed=seed;this.session=null;}
  async call(action,payload={}){
    if(this.demo){if(action==='getPublicStationBoard')return {stations:this.seed.map(s=>({stationId:s.station_id,zoneId:s.zone_id,zoneName:s.zone_name,name:s.station_name,location:s.location_desc,venueApproved:false,status:'CLOSED',individualCount:null,teamMemberCount:null,completedTeamCount:null,individualQueue:null,teamQueue:null,estimatedWaitMin:null,congestion:'UNAVAILABLE',lastUpdated:null})),announcements:[]};if(action==='getAdminDashboard'){const board=await this.call('getPublicStationBoard');return {...board,summary:{uniqueCheckedInParticipants:null,activeTeams:null,individualStampCount:null,teamMemberStampCount:null,completedTeamStationCount:null,totalValidStamps:null},alerts:[]};}if(action==='getStationDetail')return {history:[],alerts:[]};throw Object.assign(new Error('展示模式未連接 Google 服務；此操作未執行'),{code:'DEMO_ONLY'});}
    const response=await new Promise((resolve,reject)=>{
      const timeout=setTimeout(()=>reject(Object.assign(new Error('服務逾時，未確認成功；請保留原請求重試'),{code:'TIMEOUT'})),30000);
      google.script.run.withSuccessHandler(value=>{clearTimeout(timeout);resolve(value);}).withFailureHandler(()=>{clearTimeout(timeout);reject(Object.assign(new Error('網路或服務失敗，未確認成功；請使用原請求重試'),{code:'NETWORK_ERROR'}));}).api(action,JSON.parse(JSON.stringify({...payload,session:this.session})));
    });
    if(!response?.ok)throw Object.assign(new Error(response?.error?.message||'服務回應無效'),{code:response?.error?.code||'INVALID_RESPONSE'});
    return response.data;
  }
}
