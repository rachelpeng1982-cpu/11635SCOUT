/* Isolated mutation checks for this increment; does not edit the working source. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'scout-mutations-'));
const output=path.join(root,'docs/evidence/increment-01/mutations');fs.mkdirSync(output,{recursive:true});
const cases=[
 ['read_integrity','backend-gas/Code.gs','Integrity.validate(state,{allowIncompleteStations:Boolean(options.allowIncompleteStations),allowSchemaV1:Boolean(options.allowLegacyAudit)});','/* removed read validation */'],
 ['write_integrity','backend-gas/Code.gs','Integrity.validate(after);','/* removed write validation */'],
 ['audit_before_snapshot','src/core.js','old_value_summary:ctx.oldSummary??null','old_value_summary:null'],
 ['zone_boundary','src/core.js',"return actor.role==='ZONE_LEAD'&&Boolean(alert.station_id)&&!alert.related_log_id&&alert.alert_type!=='BROADCAST'&&(actor.allowed_zone_ids||[]).includes(station(s,alert.station_id).zone_id);","return actor.role==='ZONE_LEAD';"],
 ['handler_boundary','src/core.js','isAdmin(actor)||\n      p.staff_id','isAdmin(actor)||true||\n      p.staff_id'],
 ['batch_completeness','src/integrity.js','ensure(logs.length===present.length','ensure(true||logs.length===present.length']
];
const results=[];
for(const [name,file,before,after]of cases){
 const dir=path.join(temp,name);for(const folder of ['src','tests','data'])fs.cpSync(path.join(root,folder),path.join(dir,folder),{recursive:true});fs.mkdirSync(path.join(dir,'backend-gas'));fs.copyFileSync(path.join(root,'backend-gas/Code.gs'),path.join(dir,'backend-gas/Code.gs'));
 const target=path.join(dir,file),source=fs.readFileSync(target,'utf8');if(!source.includes(before))throw new Error('Mutation pattern missing: '+name);fs.writeFileSync(target,source.replace(before,after));
 const parse=cp.spawnSync('node',['-e',"new (require('vm').Script)(require('fs').readFileSync(process.argv[1],'utf8'))",target],{encoding:'utf8'});if(parse.status!==0)throw new Error('Invalid mutant syntax: '+name);
 const run=cp.spawnSync('node',['--test','tests/core.test.cjs','tests/gas.test.cjs','tests/integrity.test.cjs'],{cwd:dir,encoding:'utf8',timeout:30000});
 fs.writeFileSync(path.join(output,name+'.txt'),run.stdout+run.stderr);const killed=run.status!==0&&/fail [1-9]/.test(run.stdout);results.push({name,result:killed?'KILLED':'SURVIVED_OR_INVALID_RUN',exitCode:run.status,evidence:'mutations/'+name+'.txt'});
}
fs.writeFileSync(path.join(output,'REPORT.json'),JSON.stringify({scope:'six selected protections, not exhaustive assurance',results},null,2)+'\n');console.log(JSON.stringify(results,null,2));if(results.some(r=>r.result!=='KILLED'))process.exitCode=1;
