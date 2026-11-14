# Codex 開發啟動指令

請閱讀 `NORTH_STAR.md` 作為本專案唯一產品北極星，並讀 `STITCH_DESIGN_REFERENCE.md` 與 `stations_seed.csv`。

## 第一個任務

1. 掃描目前 repo，列出與北極星需求的差距（`docs/GAP_ANALYSIS.md`）；不要先推翻原有前端，也不要先部署或上傳個資。
2. 給出分階段實作方案與可執行任務清單（`docs/IMPLEMENTATION_PLAN.md`），標明會影響資料與安全的變更。
3. 建好專案資料夾骨架與開發用 DEMO 模式。保留 Stitch 深松綠／羊皮紙／羅盤金主題，並能切換四畫面。
4. 為核章、權限、重複防呆及小隊故障復原先寫測試；不得把示範數字、QR token 或 PIN 寫入真實環境。
5. 實作 GAS+Sheets 的最小可信閉環：報名→每人 QR→關主核章→參加者進度→全場戰情→匯出。分階段提交；每階段附測試與人工設定步驟。

若有與北極星衝突的舊程式，先在 `docs/DECISIONS.md` 說明衝突與遷移方式；遇到待核定事項，使用設定與安全預設，不得自行替主辦單位定案。
