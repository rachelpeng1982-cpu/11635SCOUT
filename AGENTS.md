# Codex 開發規則

- NORTH_STAR.md 是產品最高規格；其次為 CODEX_START_HERE.md、STITCH_DESIGN_REFERENCE.md、data/stations_seed.csv 及 docs/srs/SRS.md。原始交接檔保留雜湊，不為消除格式警示而改寫。
- 開始修改前檢查 Git 狀態、相關需求／票、docs/srs/VERIFICATION_REPORT.md 及最新增量報告。保留既有使用者修改；使用者明確指示優先，不因形式上的待估算而停止已授權且不受阻擋的本機工作。
- 範圍與證據對應：NORTH_STAR → SRS需求 → Epic/Story/Task/票 → 程式 → 測試／行為關 → 驗證報告。不得把共用測試通過視為所有票完成；不得虛填DoR、估算、執行者、PM驗收或主辦核准。
- 程式異動後逐項自驗並上繳 docs/INCREMENT_*_VERIFICATION.md：基準版本／來源雜湊、需求／票、輸入、預期、實際、結果、原始證據、替身聲明、已知缺口、人工設定、資料遷移與恢復方式。未測與失敗如實保留；測試替身不是Google／實機證據。
- 核章、權限、資料及安全改動必須跑適用Node測試；前端改動跑適用瀏覽器行為檢查；高風險保護以適用突變測試驗證有效性。以實際失敗／新改動為由才重跑，純文件修改不寫鏡像測試。
- npm test；npm run build；python tools/validate_backlog.py。瀏覽器與本輪突變重現方式見 README.md、docs/INCREMENT_01_VERIFICATION.md。執行前確認Google資源隔離，不能上傳正式名冊作測試。
- src/core.js 與 src/integrity.js 是原始碼；backend-gas/Domain.gs、Integrity.gs、Seed.gs、Index.html、AppSheetSchema.json 及 dist/由build生成，不單獨手改。Code.gs是GAS adapter原始碼。
- schema v2新增稽核摘要；舊表僅透過管理員備份確認後的migrateAuditSchemaV2_受控遷移。資料損壞預設拒絕，不刪AuditLogs／Requests／StampLogs，不略過主外鍵／唯一性檢查。
- 個人及小隊成績只採有效StampLogs；實到快照不能替缺席者核章。所有權限與冪等在後端。PIN、QR原文、hash、電話及兒少名冊不得放公開API／報表／程式碼／console／Git；摘要不收完整請求。
- 工作分支與草稿PR供審查；除非使用者明確授權，不自動合併或正式部署。真Google整合、手機、現勘、負載及UAT未通過前，不稱活動可上線；沒有逐項驗證報告不得稱程式開發完成。
