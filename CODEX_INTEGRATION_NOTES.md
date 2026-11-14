# Codex 整合交接與審查注意事項

本包為兩個先前產出的交接包合併版，不代表已實作完成或部署。

## 文件優先順序
1. NORTH_STAR.md（產品基準，仍有待業主決議之內容）
2. SRS_DRAFT.md / PRODUCT_BACKLOG.md / TICKETS.json（需求草案，須與北極星核對）
3. STITCH_DESIGN_REFERENCE.md / stations_seed.csv（設計與站點種子資料，非現勘核定配置）
4. legacy-v2/*（舊版原型，非經驗收程式）

## Codex 應先處理
- 閱讀既有 work/review/GAP_ANALYSIS.md、IMPLEMENTATION_PLAN.md，保留原審查證據。
- 核實 gas.md 僅為 API 說明；legacy-v2/Code.gs 是舊版參考程式，請不要宣稱目前專案已具備可執行後端。
- 以 stations_seed.csv 為待審站點清冊，對照 Stitch 畫面與 CSV 逐一建立 30 站 mapping，列出任何不一致；切勿直接用示範文案覆蓋。
- S29 的排隊數與壅塞燈號不符，屬既有 UI/資料異常，應由統一計算規則重算並測試。
- 新增 service_lanes 並確認 avg_duration_min 的單位（個人/小隊可能不同）；缺值時顯示未知，不能硬算。
- QR 刷新動畫與 420 人、54 隊、3842 核章等數字均屬示範，不可當正式資料。
- 實作人員授權、核章鎖定、重複防呆、批次小隊成員核章、Google Sheets 連線、整合測試及部署檢查。
- 指出所有外部圖片/字型/本機資源遺失的路徑，使用受控的本地替代或明確待補清單，不得默默假設有檔案。

## 交接程序
1. 在 Codex 專案的 repo 根目錄解壓縮此 ZIP，保留目錄結構。
2. 用 `ls NORTH_STAR.md CODEX_START_HERE.md STITCH_DESIGN_REFERENCE.md stations_seed.csv README_HANDOFF.md legacy-v2/Code.gs` 核對。
3. 將 work/review 下原有缺口分析與計畫合併更新，不刪除原始資料。
4. 先輸出資料契約及逐站差異表，再按 Phase 0–4 開發。

> 注意：Google Apps Script 不具備傳統資料庫交易；批次核章須用 LockService、冪等設計、補償與對帳處理。4 碼 PIN 不應單獨作為關主身分驗證。
