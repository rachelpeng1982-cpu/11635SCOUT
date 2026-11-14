import csv,json
from pathlib import Path
r=Path(__file__).resolve().parent.parent/'docs/srs';d=json.loads((r/'TICKETS.json').read_text());tickets=d['tickets']
md=['# 完整票據清單 v'+d['version'],'',f"共{len(tickets)}票／{len(d['tasks'])}Task／{len(d['stories'])}Story／{len(d['epics'])}Epic。全數待DoR，未正式驗收。票號不是排程順序，以dependencies為準。",'', '|票號|Epic／Story|父Task|標題|Phase|優先序|前置票|DoR|','|---|---|---|---|---|---|---|']
for t in tickets:md.append(f"|{t['id']}|{t['epic_id']}/{t['story_id']}|{t['parent_task_id']}|{t['title']}|{t['phase']}|{t['priority']}|{', '.join(t['dependencies']) or '—'}|待審／缺項|")
(r/'TICKET_LIST.md').write_text('\n'.join(md)+'\n')
with (r/'TICKET_LIST.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(['票號','Epic','Story','父Task','標題','需求','優先序提案','Phase','前置票','DoR','執行狀態','估算','執行者','DoR缺項'])
 for t in tickets:w.writerow([t['id'],t['epic_id'],t['story_id'],t['parent_task_id'],t['title'],','.join(t['requirement_ids']),t['priority'],t['phase'],','.join(t['dependencies']),t['dor'],t['execution_status'],t['estimate'],'未分派','；'.join(t['dor_gaps'])])
cards=['# 完整票卡 v'+d['version'],'','所有票級AC與父Story AC分開；尚未估算／分派或正式完成。','']
for t in tickets:
 cards += [f"## {t['id']}｜{t['title']}",'',f"- 父層：{t['epic_id']} → {t['story_id']} → {t['parent_task_id']}",f"- 需求／來源：{', '.join(t['requirement_ids'])}；{'；'.join(t['source'])}",f"- 目標：{t['objective']}",f"- 做：{t['in_scope']}",f"- 不做：{t['out_of_scope']}",f"- 前置：{', '.join(t['dependencies']) or '無票級前置，仍須DoR'}",f"- 類型／環境：{t['work_type']}；{t['execution_environment']}",f"- 輸入：{'；'.join(t['inputs'])}",f"- 估算：{t['estimate']}；執行者：未分派",f"- 交付物：{'；'.join(t['deliverables'])}",f"- DoR：NOT_READY；{'；'.join(t['dor_gaps'])}",f"- DoD：{t['applicable_dod']}",f"- 證據：{t['evidence_location']}",f"- 模型限制：{t['model_constraints']}",f"- 恢復：{t['recovery_notes']}",'','本票AC：','']+['- '+x for x in t['ticket_acceptance_criteria']]+['','父Story AC（由同Story全部相關票共同覆蓋）：','']+['- '+x for x in t['acceptance_criteria']]+['']
(r/'TICKET_CARDS.md').write_text('\n'.join(cards)+'\n')
with (r/'TRACEABILITY.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(['需求','需求名稱','來源','主責Story','Epic','Story','Task','票','證據'])
 for req in d['requirements']:
  for t in tickets:
   if req['id'] in t['requirement_ids']:w.writerow([req['id'],req['title'],';'.join(req['source']),req['primary_story_id'],t['epic_id'],t['story_id'],t['parent_task_id'],t['id'],t['evidence_location']])
print('Backlog views regenerated from canonical TICKETS.json.')
