# NS-1.0 Phase 0–4

1. Phase 0：完整讀規格、manifest 檢核、保留舊審查、逐站 mapping、資料契約與 DECISIONS。legacy-v2 缺件明列，不假裝已讀。
2. Phase 1：建立可部署 HtmlService 四視圖與離線 DEMO 預覽；Stitch tokens、48px 操作、390px RWD；資料與安全邏輯測試優先於功能接線。
3. Phase 2：七核心表＋StampBatches／Requests／EventConfig；安全重跑 schema、seed；Google 白名單＋PIN；QR/session；單人、小隊、有效章、重送、撤銷、稽核、Forms 匯入。以 ScriptLock + Sheets API 原子 batchUpdate 處理跨表提交，不用 appendRow 假交易。
4. Phase 3：四視圖接同一 API；QRCode本地產生、相機掃描及手動核對、實到預覽、排隊／告警、30站管理與報表；失敗與同步時間可見。
5. Phase 4：本機自動測試與部署產物驗證；交付 Google 沙盒、並發／斷線、真手機、現勘、負載、還原及簽核清單。未測列未測，不以本機測試替代現場驗收。

每階段狀態與實際結果更新於 PHASE_STATUS.md。任何正式資料表遷移前先備份，舊 PIN、公開編號 QR、示範名冊／核章不可遷入正式憑證或成績。


Increment 01已在原開發分支完成稽核、完整性及區長派工的本地缺陷修正與自驗，逐項報告見INCREMENT_01_VERIFICATION.md。正式票級DoR／估算／驗收狀態不因程式交付而自動修改；下一關為受控Google測試專案的schema v2、權限及端到端整合驗證。
