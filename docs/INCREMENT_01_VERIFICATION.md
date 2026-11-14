# Increment 01｜資料完整性、稽核與區長派工自驗報告

日期：2026-11-14（Asia/Taipei）。需求基準：NORTH_STAR NS-1.0、SRS-0.2。開發基準 commit：ac5a3597cae6c8c833432686736d460dd4db6548；本輪來源／產物雜湊見 evidence/increment-01/SOURCE_SHA259.json。

執行者：Codex 開發端自驗。**本輪指定範圍本機驗證通過，尚非PM獨立驗收、真Google整合或活動可上線判定；不將65票全部標完成。**

## 1. 本輪交付與資料影響

1. `src/core.js`：新增稽核前後狀態摘要，明確允許欄位，不收完整請求、姓名、email、PIN、token或hash；摘要採值複製，不被後續修改改寫。
2. `src/integrity.js`／`backend-gas/Integrity.gs`：11表資料完整性檢查；GAS讀取與提交前攔截主鍵／唯一性、主外鍵、非法型別／狀態、站／區設定、有效章重複、撤銷錯連及不完整批次。無效JSON／空白主鍵列不再靜默跳過。錯誤回前端只給通用訊息，不洩漏列值。
3. `backend-gas/Code.gs`：schema v2，以及管理員、備份旗標與已知v1表頭限定的稽核遷移。新增兩摘要欄，原歷史缺值標記NOT_CAPTURED_V1，不造假；使用原子Sheets請求更新表頭、資料、版本及遷移稽核。實際Google服務尚待測試。
4. 區長派工：僅所屬區一般異常；可指派本人、同區區長或本站關主，不可跨區／指派區外人員，不可關閉成績更正或全場公告。區長介面新增派工與結案，不出現核章或全場戰情操作。
5. `tools/run_mutations.cjs`：選取六個本輪保護，在隔離副本移除後重跑測試，保存實際失敗證據。

沒有存取／修改正式Google資料，沒有改動NORTH_STAR與原始種子檔。既有v1表不能直接用新API，須先備份並按DEPLOYMENT第7節遷移；空白新測試表由setupProject_建立v2。

## 2. 逐項自驗

|ID|範圍／需求／相關票|輸入與預期|實際|證據|
|---|---|---|---|---|
|A01|FR-38；TKT-045、059|回報排隊0→2人／4隊，稽核保存前後值且之後改站況不回寫舊摘要|PASS，本機|tests/integrity.test.cjs：audit stores detached…|
|A02|FR-38、NFR-09|請求含測試PIN/token；摘要不含這些值、姓名、email或hash|PASS，本機|tests/integrity.test.cjs；gas.test.cjs：QR issuance audit…|
|A03|FR-38；TKT-045|工作人員角色變更保存角色／範圍／版本前後值，不保存email|PASS，GAS替身|tests/gas.test.cjs：credential configuration audit…|
|A04|FR-37/38；TKT-004、006|v1遷移未備份／非管理員拒絕；有效遷移保留行數、標未知歷史、版本2、重跑不重複；實體僅9欄時安全擴欄|PASS，GAS替身|tests/gas.test.cjs：v1 audit migration…|
|A05|NFR-04/08；TKT-006|遷移提交故障，不改表頭／版本／原資料；重跑可恢復|PASS，原子服務替身|tests/gas.test.cjs：audit schema migration fails…|
|I01|NFR-08；TKT-004|重複主鍵、external ID、QR hash或大小寫相同email均拒絕|PASS，本機|tests/integrity.test.cjs：duplicate IDs…|
|I02|NFR-08；TKT-004|破壞人→隊、隊長、工作站權、章→人／請求、批次→隊、告警→處理人、草稿→隊長及稽核→操作者關聯，均拒絕|PASS，本機|tests/integrity.test.cjs：all foreign-key families…|
|I03|FR-37/39|持久化空白主鍵列／非法JSON／外鍵損壞，API拒絕且零寫入，不回傳私人列值|PASS，GAS替身|tests/gas.test.cjs：corrupt persisted…／blank primary-key…／malformed JSON…|
|I04|FR-25/26/27|重複有效章、錯誤撤銷、重複撤銷、缺逐人章、實到／缺席重疊或PENDING批次均拒絕|PASS，本機|tests/integrity.test.cjs：effective pass…／batch completeness…|
|I05|FR-22/23|合法後續名冊異動不改寫原有實到快照，歷史仍可對帳|PASS，本機|tests/integrity.test.cjs：historical attendance…|
|Z01|FR-18/32；TKT-051|區長僅見指定5站，無核章／全場戰情，區內派給本站關主並結案|PASS，瀏覽器接真共用domain／測試RPC|tests/zone-browser.cjs；zone-browser.txt|
|Z02|FR-18/32|跨區、區外處理人、全場廣播及成績更正不得由區長處理|PASS，本機＋瀏覽器橋接|tests/integrity.test.cjs；tests/zone-browser.cjs|
|Z03|FR-43|一般結案API即使由管理員呼叫，也不能略過成績更正審核／補償流程|PASS，本機|tests/integrity.test.cjs：zone lead cannot…|
|R01|既有核心與GAS回歸|原37項及本輪22項全部無失敗|59 PASS、0 FAIL|evidence/increment-01/node-tests.txt|
|R02|四視圖回歸|390px、48px、30站、篩選、QR、失敗原鍵重試|PASS，模擬Google橋接|browser-regression.txt|
|M01|測試有效性|移除讀驗證、寫驗證、audit前值、區長邊界、處理人邊界、批次完整性，測試應失敗|6/6 KILLED|mutations/REPORT.json與六份原始輸出|
|S01|建置／結構|生成GAS與DEMO、JS語法及65票結構／相依皆有效|PASS|build.txt、static.txt、backlog.txt|

所有相對證據檔皆位於docs/evidence/increment-01，測試完整名稱及輸入／斷言可由測試原始碼重現。

## 3. 測試環境與重現

Node v24.22.1、Python 3、Playwright Chromium；測試使用虛構fixture。Google API以VM模擬，區長瀏覽器測試使用RPC橋接到實際共用domain＋完整性檢查，**不是實際google.script.run／Google帳號／Sheets執行證據**。

```sh
npm ci
npm test
npm run build
python tools/validate_backlog.py
node tools/run_mutations.cjs
python -m http.server 8765 --directory dist
# 另一個終端，在已安裝Playwright Chromium的環境執行：
node tests/browser.cjs
node tests/zone-browser.cjs
```

Playwright若使用自訂安裝位置，設定PLAYWRIGHT_BROWSERS_PATH。未安裝瀏覽器時依README安裝，不可把未執行標成通過。

## 4. 發現與修正紀錄

初次54項測試中1項失敗：外鍵測試將隊長P1移到不存在隊伍，同時破壞Teams.leader membership，驗證先在Teams拒絕，與測試預期Participants不符。已將輸入改成非隊長P2，使測試只破壞目標關聯，沒有放寬任何產品檢查。原失敗輸出保留initial-fixture-failure.txt；最終59項通過。

格式檢查：程式／文件採CRLF-aware diff --check通過；未過濾的全量檢查會對原始失敗／突變測試輸出的縮排空白提出警示。為保留證據原貌，未改寫這些原始輸出，也不將全量格式檢查宣稱為通過。

此增量覆蓋TKT-004、006、045、051、059的相關部分，並支援TKT-060/061；仍不等於這些票全部DoD完成，也不虛填估算、PM驗收或主辦政策核准。

## 5. 未測與剩餘阻擋

- 真Google schema遷移／原子提交、實際帳號email、真PIN/session到期、雙關主並行、Forms trigger。
- 相機／GAS iframe、手機強光、弱網及正式人數的配額／p95/p99壓測。
- 已有表若含損壞關聯／空白列／半批舊資料，需要先在備份副本人工對帳；程式預設拒絕，不自動猜測修補。
- 完整性檢查增加每次非快取請求的運算成本，尚未作容量承諾。
- PIN等Script Properties與Sheets不是跨服務原生交易；本輪原子性證據限於Sheets表資料，不能推論憑證設定跨服務全交易。
- 主辦的日期、場地、門檻、實到政策、服務線數／耗時、資料留存與UAT簽核仍待核定。

## 6. 交付判定

本輪「自驗報告已上繳、指定範圍本機通過」；保留原始失敗與替身界線。PR維持草稿，不合併、不部署正式Google、不宣稱APP已開發完成或可上線。下一階段需在核准的隔離Google測試環境重現目標閉環與整合驗收。
