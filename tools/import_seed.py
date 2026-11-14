"""Normalize the supplied NS-1.0 seed without modifying the signed source."""
import csv, io, json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
source = (root/'data/stations_seed.csv').read_text(encoding='utf-8-sig')
rows = list(csv.DictReader(io.StringIO(source.replace('\\r\\n','\n'))))
expected = [f'S{i:02}' for i in range(1,31)]
assert [r['關卡ID'] for r in rows] == expected, 'Expected exactly S01-S30 in order'
zones=['F1','F2','G1','B1','B2','B3']
output=[]
for i,r in enumerate(rows):
    assert r['場地代碼']==zones[i//5], 'Unexpected zone'
    assert not r['平行操作線數(待填)'], 'Filled lanes require explicit approval migration'
    output.append(dict(station_id=r['關卡ID'],zone_id=r['場地代碼'],zone_name=r['初擬場地'],station_name=r['關卡名稱'],theme=r['主題'],location_code=r['場地代碼'],task_description=None,age_variants={},accessibility=None,rain_plan=None,notes=r['動線與安全注意'],location_desc=r['初擬場地'],venue_approval_status='PENDING',status='CLOSED',individual_duration_min=int(r['個人關卡目標時間(分)']),team_duration_min=int(r['小隊關卡目標時間(分)']),service_lanes=None,current_individual_queue=None,current_team_queue=None,queue_updated_at=None,last_updated=None))
(root/'data/stations.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('30 pending stations normalized; original source preserved. No live records imported.')
