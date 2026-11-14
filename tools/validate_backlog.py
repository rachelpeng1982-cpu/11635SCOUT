"""L1 structural validation only; never promotes tickets to READY/DONE."""
import json,sys
from pathlib import Path
root=Path(__file__).resolve().parent.parent
p=root/'docs/srs/TICKETS.json';d=json.loads(p.read_text());tickets=d['tickets'];errors=[]
def check(condition,message):
 if not condition:errors.append(message)
ids={t['id'] for t in tickets};stories={s['id']:s for s in d['stories']};tasks={t['id']:t for t in d['tasks']};epics={e['id'] for e in d['epics']};reqids={r['id'] for r in d['requirements']};byid={t['id']:t for t in tickets}
check(len(ids)==len(tickets),'Duplicate ticket ID')
required=['objective','source','parent_task_id','in_scope','out_of_scope','ticket_acceptance_criteria','inputs','evidence_location','dependencies','work_type','execution_environment','estimate','deliverables','applicable_dod','model_constraints','recovery_notes','dor','assignee']
for t in tickets:
 for key in required:check(key in t,f"{t['id']}: missing {key}")
 check(t['parent_task_id'] in tasks,f"{t['id']}: orphan task")
 check(t['story_id'] in stories,f"{t['id']}: missing story")
 check(t['epic_id'] in epics,f"{t['id']}: missing epic")
 if t['parent_task_id'] in tasks:check(tasks[t['parent_task_id']]['story_id']==t['story_id'],f"{t['id']}: wrong parent story")
 if t['story_id'] in stories:
  check(stories[t['story_id']]['epic_id']==t['epic_id'],f"{t['id']}: wrong parent epic")
  check(set(t['requirement_ids'])<=set(stories[t['story_id']]['requirement_ids']),f"{t['id']}: requirements absent from story")
 check(set(t['requirement_ids'])<=reqids,f"{t['id']}: unknown requirement")
 for dep in t['dependencies']:
  check(dep in ids,f"{t['id']}: missing dependency {dep}")
  if dep in byid:check(byid[dep]['phase']<=t['phase'],f"{t['id']}: phase inversion from {dep}")
 check(len(t['ticket_acceptance_criteria'])>=2,f"{t['id']}: insufficient AC")
 if t['dor']=='READY':check(not t.get('dor_gaps'),f"{t['id']}: READY with missing inputs")
 if t.get('execution_status')=='DONE':check(t.get('formal_acceptance_evidence'),f"{t['id']}: DONE without formal acceptance")
for task in tasks:check(any(t['parent_task_id']==task for t in tickets),f'Empty task {task}')
for req in reqids:check(any(req in t['requirement_ids'] for t in tickets),f'Uncovered requirement {req}')
visited=set();active=set();order=[]
def walk(code):
 if code in active:errors.append('Dependency cycle: '+code);return
 if code in visited:return
 active.add(code)
 for dep in byid[code]['dependencies']:
  if dep in ids:walk(dep)
 active.remove(code);visited.add(code);order.append(code)
for t in tickets:walk(t['id'])
check((root/'docs/srs/SRS.md').exists(),'Missing SRS baseline')
report={'version':d['version'],'requirements':len(reqids),'epics':len(epics),'stories':len(stories),'tasks':len(tasks),'tickets':len(tickets),'errors':errors,'structure_pass':not errors,'semantic_acceptance':'NOT_IMPLIED','ready_tickets':sum(t['dor']=='READY' for t in tickets),'formally_done_tickets':sum(t.get('execution_status')=='DONE' for t in tickets),'topological_order':order}
(root/'docs/srs/VALIDATION_REPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='topological_order'},ensure_ascii=False,indent=2))
sys.exit(bool(errors))
