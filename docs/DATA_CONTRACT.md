# 資料契約與遷移

完整欄位見 backend-gas/AppSheetSchema.json（由 src/core.js 自動生成）。七核心表為 Participants、Teams、Stations、StampLogs、Alerts、StaffPermissions、AuditLogs，另有 StampBatches、Requests、EventConfig。

## 儲存編碼

第一列是 schema 欄名。**資料列每一格是 JSON 字面值字串**，例如姓名是 `"王小明"`、狀態是 `"ACTIVE"`、active 是 `true`、未核定是 `null`、站權限是 `["S01"]`。如此保留型別及前導零，並以 Sheets API `stringValue` 寫入避免公式執行。不可把舊 CSV 直接覆蓋新表，也不可把資料列改成未加 JSON 引號的文字。日期為 UTC ISO 字串，介面顯示 Asia/Taipei。

## 不變條件

- participant_id 為穩定公開 ID；qr_token_hash 為 HMAC，不是公開憑證。QR原文不落盤、不存 Requests／稽核。
- effective passes = PASS 去除被 REVOKED.reversal_of 指向者。同人同站最多一有效 PASS；撤銷只增事件，不改原始章。
- participation_mode 在核章時快照，用於個人組／小隊成員站次統計；stamp_mode 僅描述操作方式。
- COMMITTED StampBatches 存實到／缺席 participant IDs 及 policy。所有實到者各有有效章才計該隊站完成；同隊同站最多一隊次。
- Requests 的 actor_id＋payload HMAC 連結冪等鍵。相同鍵不同內容或操作者拒絕，成功結果不含秘密。
- StaffPermissions 僅信任 Google email 與 active；站點／分區授權每次重讀。PIN另置 Script Properties。
- 所有變更在 ScriptLock 內讀取及檢查，以單一 Sheets batchUpdate 原子提交已變動列，含核章、批次、稽核及 Requests。限制每表 15,000 資料列／每次寫入7MB；超出直接拒絕。

## 安全遷移

1. 先複製試算表並記錄部署版本，關閉舊寫入端。
2. 在新空白測試表執行 setupProject_；它驗證表頭，只補缺站，不覆寫站況／成績。不相容表頭立即拒絕；此版本沒有舊 V2 就地轉換工具。
3. 新 seed 原檔保留 BOM 與 literal `\\r\\n`；tools/import_seed.py 僅正規化成 data/stations.json。每站預設 PENDING/CLOSED，排隊 null、線數 null。
4. 人員由受控 Forms 或管理畫面建立；先建隊再建小隊成員。舊 PIN、示範人員、示範成績不可遷入。正式舊成績若存在，先另案對帳與審核，不直接載入。
5. STAFF_CHANGE_JSON／EVENT_CONFIG_JSON 等管理設定僅於 Script Properties 暫存、編輯器 helper 套用後刪除。
6. 不手動刪除 AuditLogs／Requests／StampLogs；刪除會破壞重送及成績歷史。結束活動後依主辦核定保留期限封存／銷毀整個隔離活動資料集。

## 站況與報表

排隊以人／隊分別回報；wait=ceil((個人數×個人分鐘+隊數×小隊分鐘)/線數)。任一來源未知則等待未知。站關閉優先 UNAVAILABLE；更新超過90秒優先 STALE；否則 ≤5分 LOW、≤10分 MEDIUM、>10分 HIGH。公布的是估計，非保證。公開端僅輸出白名單欄位。

exportReport 支援 zoneId、status、from、to（UTC ISO，含端點）；from/to 篩選核章發生時間，非重建歷史時點的成績快照。CSV 表頭註明時間範圍、Asia/Taipei與人站次／隊站次口徑；預設全歷史有效章。介面提供場域／狀態篩選，日期範圍可透過 API 傳入。整體 KPI 是全場，列表可篩選。


## Increment 01：讀寫完整性與稽核 v2

src/integrity.js（建置為 Integrity.gs）在非快取的資料讀取及每次提交前驗證11表：主鍵／唯一欄位、站點與分區、核心型別／狀態、主外鍵、有效章唯一性、撤銷關聯、已提交批次的逐人章與實到／缺席、工作人員範圍及活動規則。損壞資料回 DATA_INTEGRITY，錯誤回應不含列值；空白主鍵列不再靜默略過，避免實體列號偏移。公開快取只保留先前已通過檢查的10秒快照。

AuditLogs 新增 old_value_summary、new_value_summary。摘要是受限欄位投影：狀態、排隊數、線數、角色／範圍／版本與成果計數，不包含姓名、email、QR、hash、PIN或整個請求。舊版未記錄的值不能還原，必須明示 NOT_CAPTURED_V1。遷移程序見 DEPLOYMENT.md；不可手改schema_version或覆蓋舊表。

此版的批次策略只支援原子提交的COMMITTED資料；如遇舊版PENDING／FAILED或不完整批次會停止，而非將其當有效章。需要先隔離、備份及對帳修復，不會自動刪除歷史。
