# Increment 02｜開發端逐項驗證報告

日期：2026-11-14（Asia/Taipei）；基準：草稿PR #1／4f8b6f7a47b01567abc1b184adea8fd91cd50a5d。需求：NORTH_STAR → SRS-0.3 FR-03/04/09/14/18/20–28/30/34/37–40/42、NFR-03/04/08/10。相關票沿用 TRACEABILITY.csv；共用證據不等於逐票AC完成，65票正式完成仍0。

## 結論及分層完成率

44個FR等權，僅LOCAL_PASS計入：26/44（59.1%）具本地範圍通過證據；PARTIAL不算。這是本地證據覆蓋率，不是產品完成率。正式驗收0/44（0%），正式票0/65，真Apps Script案例0。不得合併或正式部署。

## 逐項輸入、預期與實際

|需求／項目|輸入與預期|實際／證據|判定與界線|
|---|---|---|---|
|11表契約|11個表頭110欄，型別保留，30站不開站|contract-check.json、google-sheets-receipt.json；讀回各表頭及JSON儲存值|真Sheets通過；完整性在Node驗證；不是每個選填欄的全型別證明|
|真讀寫原子失敗|S29更新與不存在sheetId同一批送出，預期整批拒絕|Google HTTP400，R30:S30保持null|真Sheets API通過；不是GAS服務端測試|
|QR／個人核章|QR登入、寫成功回應遺失、同鍵重送僅1章|node-tests.txt、full-flow-browser.txt|LOCAL VM／瀏覽器通過；真QR分發／相機未驗|
|小隊批次|8人名冊選7人，缺席第8人無章；撤銷後重算|full-flow-browser.txt、next-stage.test.cjs|LOCAL_PASS；真並行未驗|
|S29|4人×5分鐘，2線10分MEDIUM、1線20分HIGH；門檻10/20改MEDIUM|google-s29-readback.json、next-stage.test.cjs|真Sheet寫讀＋本地Node計算，非Apps Script計算|
|角色ACL|活動組／區長／關主／管理員，監看／核章／排隊／跨區；撤權後舊鍵重送拒絕|next-stage.test.cjs、zone-browser.txt、mutations/|LOCAL_PASS，Google email及共用裝置待驗|
|遷移|v1→v2、重跑、拒絕不相容／損壞／不完整批次|node-tests.txt、既有gas/integrity測試|LOCAL VM通過；真Apps Script遷移未驗|
|還原|S29及設定回原始值，11表讀回hash相同|google-restore-proof.json|真Sheet測試快照還原通過；非全系統DR|
|整合runner|非測試資料零寫入、6個閉環、清理失敗必FAIL|google-runner.test.cjs、runner-pre-fix.txt|LOCAL VM通過；真runner NOT_RUN|

以上證據皆位於 evidence/increment-02/，測試碼位於 tests/。Google資源只含TEST ONLY及候選seed，未使用正式名冊。公開收據去除私人Sheet ID與owner email；不含PIN、QR原文或憑證。

## 自動測試與過程

Node **79 PASS／0 FAIL**；建置PASS；既有四視圖瀏覽器、區長瀏覽器及新增完整橋接閉環各PASS。13項保護突變全部KILLED，隔離未突變基準先通過；並非零缺陷保證。新增缺陷測試先8項中5失敗，修正後通過，失敗log保留。測試runner另有預檢／清理紅測試並已修正。

初次瀏覽器連線遇舊8765服務ERR_EMPTY_RESPONSE；改用新8766靜態伺服器後重跑通過。這是本地測試環境修復，不能算Google或弱網驗證。瀏覽器傳輸、身分、Cache、Lock及儲存為VM替身；無真多帳號／同時寫入／配額證據。原始測試log保留Node診斷尾端空白，完整diff whitespace檢查可能因此警告；程式檢查與來源雜湊另存。

## 差異審查、剩餘工作與人工設定

見 PR1_DIFF_REVIEW.md、DEFECTS.md、GOOGLE_TEST_HANDOFF.md。Apps Script無可用建立／執行連接器與已授權本機帳號；已提供可重建、MYSELF存取的獨立測試套件及私有Sheet。需持有者建立綁定測試專案、開啟Sheets v4、執行prepareIntegrationSandbox_及runGoogleIntegrationTests_，再獨立讀回EventConfig報告與核章紀錄。套件尚未匯入或執行；不要求分享密碼或OAuth token。

Phase 0–1：需求／資料模型／安全與四視圖有本地成果，政策未核准。Phase 2：QR與核章本地閉環完成本輪範圍。Phase 3：戰情S29與門檻本地修正，真Sheet層驗證。Phase 4：真Apps Script、Forms、多帳號、遷移／全DR、真機／負載／UAT仍未完成。所有階段正式簽核皆待辦。

回復方式：本輪未改表頭版本，既有v2無強制遷移；缺少wait_thresholds保留5/10相容預設。變更前備份11表及Script Properties，停寫；必要時回上一版程式與配套快照，不刪章／Requests／稽核。損壞設定應修復後重新檢查，不繞過Integrity。正式回復演練未做。

## 驗收紀錄

開發端判定：部分本地及Sheets層通過；Google應用閉環及正式驗收未通過。獨立驗收人／核准日期／發布核定：未提供。PR維持Draft，建議不合併、不正式部署。來源雜湊見 SOURCE_SHA256.json；原始交接檔未改寫。
