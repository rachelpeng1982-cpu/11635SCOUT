# 逐項自驗與一致性驗證報告 v0.2

日期：2026-11-14（Asia/Taipei）。執行角色：開發端自驗／風險檢查；**不是PM獨立驗收、主辦簽核或正式發布核定**。

## 判定

- **票結構與相依邏輯：通過L1檢查**。58需求 →10 Epic →20 Story →40 Task →65票；無重複票、孤兒、未覆蓋需求、循環或Phase逆相依。
- **票就緒／正式完成：未通過**。估算、責任人、Google環境、主辦政策及正式票級證據尚缺；READY=0、正式完成=0。
- **程式與原設計一致性：部分符合，尚有明確缺口，不能宣稱全部符合或已完成開發**。
- **Google實際運行／活動可上線：未驗收**。沒有真Google寫入、部署、相機、全場壓測或現場UAT證據。

## 基準與證據

需求基準 NORTH_STAR.md NS-1.0；SRS v0.2；TICKETS.json v0.2。來源程式與建置檔雜湊見 ../evidence/local-review/SOURCE_SHA256.json。所提供交接檔雜湊符合；legacy-v2/backlog原始檔未提供，不能宣稱已讀其程式。

測試環境：Node v24.22.1、Python 3、Playwright Chromium無頭瀏覽器，390×844 viewport。Google服務由VM／google.script.run替身模擬；所有測試資料為測試fixture，不是活動名冊。

|驗證|預期|實際結果|證據|
|---|---|---|---|
|Node核心及GAS adapter|現有全部測試無失敗|37 PASS、0 FAIL|../evidence/local-review/node-tests.txt|
|建置|輸出GAS及DEMO產物|PASS|../evidence/local-review/build.txt|
|瀏覽器行為|30站、篩選、四視圖、48px、QR、失敗原鍵重試|PASS（模擬GAS）|../evidence/local-review/browser-tests.txt|
|高風險突變|移除保護後測試應失敗|6/6 KILLED|../evidence/local-review/mutation-report.json及六份raw log|
|票結構／相依|無孤兒／環／逆階段|PASS，65票|VALIDATION_REPORT.json|
|真Google／手機／現場|目標環境閉環及壓測|NOT_TESTED|ACCEPTANCE.md及本報告未測清單|

6個突變為：移除重複章檢查、站點ACL、開站檢查、撤銷生效、冪等回原結果、同隊實到資格。突變均於隔離副本執行，基準程式沒有保留突變。這只能證明這6項保護有測試能偵測，不能推論整個程式零缺陷。

## 審查發現與處置

|ID|發現|處置／狀態|
|---|---|---|
|R01|v0.1票級AC過泛，偏向描述交付|已改65票具體Given／When／Then；仍待正式業務／TL審查，不標READY|
|R02|v0.1雖無循環，Phase2曾依賴Phase3的票|已依功能／UI／真整合拆清階段，逐邊驗證Phase相容|
|R03|Phase1四視圖骨架缺獨立票|新增TKT-065；總票64→65，原v0.1保留於本輪工作基線，未暗改完成數|
|R04|小隊長實到草稿尚缺|新增同隊授權、到期草稿、無PASS、關主不自動採用；本機測試通過，真交接待測|
|R05|原HIGH僅顯分流文字，沒有可靠替代站|新增只推薦OPEN／核准／有效資料站，無候選明示；本機測試通過|
|R06|更正只有管理員撤銷，缺組長申請|新增申請不改章、管理員補償連申請並結案；本機測試通過|
|R07|AuditLogs欠old_value_summary／new_value_summary|**未修復**；目前非完整符合北極星§8.7，TKT-045／059等應補強且避免秘密進摘要|
|R08|全表主外鍵／損壞資料驗證不足|**未完成**；目前表頭與JSON編碼／命令驗證不等於全表完整性稽核，追TKT-004／006|
|R09|區長允許範圍的派工尚不完整|**未完成**；目前可監看／通報，派工仍主要由組長，需核定許可範圍後補驗|
|R10|票級完整自驗報告、Google及真機證據不足|**未完成**；不可用共用37測試將65票全部計完成|

測試過程曾出現一項新測試失敗：同一fixture把不同操作者的兩個命令錯用相同冪等鍵，服務正確回IDEMPOTENCY_CONFLICT。已修正測試輸入使不同命令使用不同鍵；沒有放寬產品防呆，最終37測試通過。

## 逐項對照

- REQUIREMENT_VERIFICATION.csv：58項需求逐一列出結果、程式位置、實際證據及未測。LOCAL_PASS僅表示本機指定範圍；所有正式驗收仍為NOT_ACCEPTED。
- TICKET_SELF_VERIFICATION.csv：65票逐一列出AC、結構、共用需求證據、正式驗收及未完成狀態。沒有虛造不存在的docs/evidence/TKT-*資料夾。
- TRACEABILITY.csv：北極星需求→主責Story→Task→票→證據規劃。

## 未測／阻擋與人工設定

Workspace email PoC、跨網域參加者存取範圍、Form ID／item mapping／trigger、測試Sheet／GAS、真原子API／雙關主併發、工作階段真到期、相機iframe、真機弱網／背景、強光、核定人數下p95/p99／配額、現勘／雨備、備份還原、紙本對帳、資料留存及正式UAT簽核。

目前分享檔僅供開發與審查；即使靜態預覽已能打開，也不等於正式Google系統已可使用。只有逐票自驗報告齊備、必要獨立與整合驗收完成，才可按使用者要求判定程式開發完成。
