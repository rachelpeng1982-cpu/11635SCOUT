# 北極星差距分析 NS-1.0

## Phase 0 基線

已完整閱讀 NORTH_STAR、START_HERE、DESIGN_REFERENCE、README_HANDOFF、INTEGRATION_NOTES 及種子資料。六份有內容雜湊的交接資產均與 manifest 相符（manifest 自身不自我驗證）。legacy-v2 與 backlog 列於清單但未隨附件提供，不能宣稱已審查舊版 Code.gs；不以此阻擋獨立 V3 實作。舊審查保留在 PRIOR_*。

|北極星章節|原有證據|需實作／驗證|
|---|---|---|
|§3 身分／QR|靜態個人編號與動畫|高熵 token、僅儲存 hash、到期 session、撤銷重發、Google staff 身分＋PIN、站點 ACL|
|§4 個人／小隊|無核章原始碼|同站唯一有效章、實到／缺席快照、8–10 人合法小隊、補償、重送與並行|
|§4.3 等候|舊 CSV 直接給燈號|依人／隊耗時與線數計算；缺值未知、過期優先|
|§5 30站|四張地圖卡、舊 CSV|以新版 seed 30 站取代站目；全數 CLOSED／PENDING，不沿用示範數字；逐站對照見 STATION_MAPPING|
|§6 A 通行證|Stitch 靜態前端|本人資料、QR 圖、徽章及唯讀進度|
|§6 B 地圖|分區篩選|30站真統計、未知與 stale、安全公告、不虛構座標|
|§6 C 關主|未提供|Google 身分、PIN 解鎖、掃描／手動核對、二次確認、排隊、異常|
|§6 D 戰情|未提供|管理授權、三類完成量、20秒退避輪詢、狀態、告警、公告、CSV|
|§7/8 資料|gas.md/google_sheets.md 是文件|HtmlService、7核心表及批次／冪等／設定表、原子提交、遷移與 Forms|
|§10 安全|無安全實作|不存 PIN/token 於瀏覽器長期儲存；公式／HTML注入防護、限速、錯誤最小化|
|§12/14 驗收|無測試|純邏輯與持久化故障測試、Google沙盒／真手機／現場容量仍須人工驗證|

## 明確待核定

日期、人數、通關門檻、場地、每站服務線、隊伍政策、資料留存與正式 Google 身分部署。honor_threshold=null，不授予榮譽；場地未核准不可開站。未進行 Google 外部寫入或部署，不宣稱可上線。
