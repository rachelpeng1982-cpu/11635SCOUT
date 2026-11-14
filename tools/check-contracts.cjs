const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),Q=require('../src/core.js'),seed=require('../data/stations.json');
const generated=JSON.parse(fs.readFileSync('backend-gas/AppSheetSchema.json','utf8'));assert.deepEqual(generated,Q.schemas);assert.equal(Q.tables.length,11);let columns=0;
for(const table of Q.tables){assert.equal(new Set(Q.schemas[table]).size,Q.schemas[table].length);columns+=Q.schemas[table].length;}
for(const [src,built]of [['src/core.js','backend-gas/Domain.gs'],['src/integrity.js','backend-gas/Integrity.gs']])assert.equal(fs.readFileSync(src,'utf8'),fs.readFileSync(built,'utf8'));
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync('backend-gas/Seed.gs','utf8'),context);assert.deepEqual(JSON.parse(JSON.stringify(context.SEED_STATIONS)),seed);
for(const f of ['backend-gas/Code.gs','backend-gas/Domain.gs','backend-gas/Integrity.gs','backend-gas/Seed.gs','integration-gas/IntegrationTests.gs'])new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});
assert.equal(JSON.parse(fs.readFileSync('integration-gas/appsscript.json','utf8')).webapp.access,'MYSELF');assert.equal(JSON.parse(fs.readFileSync('backend-gas/appsscript.json','utf8')).webapp.access,'DOMAIN');
const publicFunctions=[...fs.readFileSync('backend-gas/Code.gs','utf8').matchAll(/^function ([A-Za-z0-9_]+)\(/gm)].map(m=>m[1]).filter(n=>!n.endsWith('_'));assert.deepEqual(publicFunctions,['doGet','api']);
const report={tableCount:11,columnCount:columns,sourceAndGeneratedSchema:'MATCH',generatedDomainAndIntegrity:'BYTE_IDENTICAL',generatedSeed:'MATCH',privateHelpers:'PASS',productionManifestUnchanged:'DOMAIN',testManifest:'MYSELF',layer:'STATIC_NOT_GOOGLE_EXECUTION'};
fs.writeFileSync('docs/evidence/increment-02/contract-check.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
