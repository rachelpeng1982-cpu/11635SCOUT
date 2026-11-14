# 竹風勇者・野外冒險任務島

NS-1.0 開發實作版，**未通過活動上線驗收**。NORTH_STAR.md 為最高產品基準；尚未連接使用者的真實 Google Form／Sheets／Apps Script，沒有部署或上傳任何名冊。

## 已實作

- GAS HtmlService 單頁四視圖：個人通行證、30站地圖、關主核章、組長戰情。
- 真正本地 QR 編碼、憑證 hash／短期 session、Google 工作人員白名單、本站 PIN＋站點權限。
- 個人及核准實到小隊核章、唯一有效章、冪等、原子跨表提交、補償撤銷與稽核。
- 30站待審種子、分別排隊、容量等候估算、過期狀態、三種統計口徑、異常派工、公告與受控 CSV。
- Forms 觸發匯入、可重跑建表與 seed、部署／安全／復原文件。

## 本機操作

需要 Node 24、Python 3。

```bash
npm ci --cache /tmp/scout-npm-cache
python tools/import_seed.py
npm test
npm run build
python -m http.server 8765 --directory dist
```

瀏覽 `http://localhost:8765`。這是 **DEMO 展示模式**，只有待審站目，沒有參加者或假核章。點「辨識工作人員」可預覽管理視圖；所有寫入都拒絕。四份 dist/*.html 是同一 SPA 的獨立建置入口，正式路由由底部 Tab 切換，不靠外部靜態 fetch 到 GAS。

瀏覽器驗證（先啟動上述伺服器）：

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/scout-browsers npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=/tmp/scout-browsers node tests/browser.cjs
```

正式部署產物為 `backend-gas/Code.gs`、`Domain.gs`、`Integrity.gs`、`Seed.gs`、`Index.html`、`appsscript.json`。修改 src、js、css 後須重新 `npm run build`。AppSheetSchema.json 僅欄位參考，不是要上傳的 GAS 檔案。

## 交付索引

- docs/GAP_ANALYSIS.md、IMPLEMENTATION_PLAN.md、DECISIONS.md：規格比對、階段與架構決策。
- docs/STATION_MAPPING.md、MANIFEST_CHECK.json：30站差異及交接檔核對；legacy-v2/backlog 未提供。
- docs/DATA_CONTRACT.md、DEPLOYMENT.md、SECURITY.md、OPERATIONS.md：設定與維運。
- docs/PHASE_STATUS.md、ACCEPTANCE.md：實際完成、測試、尚未驗收項目。
- docs/PRIOR_*：保留先前暫定審查。

## 上線阻擋

Google 同網域工作人員身分辨識 PoC、Google 真實原子提交／Forms 測試、正式人數下配額與壓測、真手機相機、現勘、主辦政策核定及關主／組長簽核均未完成。不得將本機通過測試解讀為可上線。
