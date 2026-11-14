/* Isolated mutation checks for this increment; does not edit the working source. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'scout-mutations-'));
const next=process.argv.includes('--increment-02');const output=path.join(root,'docs/evidence',next?'increment-02':'increment-01','mutations');fs.mkdirSync(output,{recursive:true});
const cases=[
 ['read_integrity','backend-gas/Code.gs','Integrity.validate(state,{allowIncompleteStations:Boolean(options.allowIncompleteStations),allowSchemaV1:Boolean(options.allowLegacyAudit)});','/* removed read validation */'],
 ['write_integrity','backend-gas/Code.gs','Integrity.validate(after);','/* removed write validation */'],
 ['audit_before_snapshot','src/core.js','old_value_summary:ctx.oldSummary??null','old_value_summary:null'],
 ['zone_boundary','src/core.js',"return actor.role==='ZONE_LEAD'&&Boolean(alert.station_id)&&!alert.related_log_id&&alert.alert_type!=='BROADCAST'&&(actor.allowed_zone_ids||[]).includes(station(s,alert.station_id).zone_id);","return actor.role==='ZONE_LEAD';"],
 ['handler_boundary','src/core.js','isAdmin(actor)||\n      p.staff_id','isAdmin(actor)||true||\n      p.staff_id'],
 ['batch_completeness','src/integrity.js','ensure(logs.length===present.length','ensure(true||logs.length===present.length']
];
if(next)cases.push(
 ['replay_authorization','src/core.js','authorizeCommand(s,actor,action,q);','/* removed current authorization on replay */'],
 ['wait_threshold_configuration','src/core.js',"const thresholds=config(s,'wait_thresholds',{lowMax:5,mediumMax:10});","const thresholds={lowMax:5,mediumMax:10};"],
 ['wait_threshold_validation','src/integrity.js',"ensure(Q.validWaitThresholds(Q.config(s,'wait_thresholds',{lowMax:5,mediumMax:10})),'EventConfig','WAIT_THRESHOLDS');",'/* removed threshold validation */'],
 ['request_actor_binding','src/integrity.js',"ensure(maps.Requests.get(log.idempotency_key).actor_id===log.operator_id,'StampLogs','REQUEST_ACTOR');",'/* removed request actor binding */'],
 ['batch_actor_binding','src/integrity.js','&&l.operator_id===b.operator_id',''],
 ['test_cleanup_gate','integration-gas/IntegrationTests.gs',"report.result='FAIL_CLEANUP';",'/* removed cleanup completion gate */'],
 ['test_preflight_gate','integration-gas/IntegrationTests.gs','if(values.some(function(row)','if(false&&values.some(function(row)']
);
const baselineDir=path.join(temp,'baseline');
for(const folder of ['src','tests','data'])fs.cpSync(path.join(root,folder),path.join(baselineDir,folder),{recursive:true});
fs.mkdirSync(path.join(baselineDir,'backend-gas'));fs.copyFileSync(path.join(root,'backend-gas/Code.gs'),path.join(baselineDir,'backend-gas/Code.gs'));
if(next)fs.cpSync(path.join(root,'integration-gas'),path.join(baselineDir,'integration-gas'),{recursive:true});
const testFiles=next?fs.readdirSync(path.join(baselineDir,'tests')).filter(n=>n.endsWith('.test.cjs')).map(n=>'tests/'+n):['tests/core.test.cjs','tests/gas.test.cjs','tests/integrity.test.cjs'];
const baseline=cp.spawnSync('node',['--test',...testFiles],{cwd:baselineDir,encoding:'utf8',timeout:30000});fs.writeFileSync(path.join(output,'BASELINE.txt'),baseline.stdout+baseline.stderr);if(baseline.status!==0)throw new Error('Isolated mutation baseline failed; no mutation success may be claimed.');
const results=[];
for(const [name,file,before,after]of cases){
 const dir=path.join(temp,name);for(const folder of ['src','tests','data'])fs.cpSync(path.join(root,folder),path.join(dir,folder),{recursive:true});fs.mkdirSync(path.join(dir,'backend-gas'));fs.copyFileSync(path.join(root,'backend-gas/Code.gs'),path.join(dir,'backend-gas/Code.gs'));
 if(next)fs.cpSync(path.join(root,'integration-gas'),path.join(dir,'integration-gas'),{recursive:true});
 const target=path.join(dir,file),source=fs.readFileSync(target,'utf8');if(!source.includes(before))throw new Error('Mutation pattern missing: '+name);fs.writeFileSync(target,source.replace(before,after));
 const parse=cp.spawnSync('node',['-e',"new (require('vm').Script)(require('fs').readFileSync(process.argv[1],'utf8'))",target],{encoding:'utf8'});if(parse.status!==0)throw new Error('Invalid mutant syntax: '+name);
 const run=cp.spawnSync('node',['--test',...(next?fs.readdirSync(path.join(dir,'tests')).filter(n=>n.endsWith('.test.cjs')).map(n=>'tests/'+n):['tests/core.test.cjs','tests/gas.test.cjs','tests/integrity.test.cjs'])],{cwd:dir,encoding:'utf8',timeout:30000});
 fs.writeFileSync(path.join(output,name+'.txt'),run.stdout+run.stderr);const killed=run.status!==0&&/fail [1-9]/.test(run.stdout);results.push({name,result:killed?'KILLED':'SURVIVED_OR_INVALID_RUN',exitCode:run.status,evidence:'mutations/'+name+'.txt'});
}
fs.writeFileSync(path.join(output,'REPORT.json'),JSON.stringify({scope:'selected protections only; not exhaustive assurance',results},null,2)+'\n');console.log(JSON.stringify(results,null,2));if(results.some(r=>r.result!=='KILLED'))process.exitCode=1;
