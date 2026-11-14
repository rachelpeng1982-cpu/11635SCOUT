# Google 真實整合測試：人工最短交接

**目前狀態：Sheets 原生連線讀寫已實測；Apps Script 尚未建立／授權／執行，不能視為已通過。** 已準備 artifacts/scout-quest-google-test.zip，其內容與來源雜湊列於 evidence/increment-02/google-test-package.json。

現有工具沒有Apps Script專案寫入／執行能力；GitHub授權及Google Drive授權不等同Apps Script／clasp授權。不要將密碼、PIN、OAuth token或登入憑證貼到對話／Git。

## A. 你需要做的三件事

1. 開啟本次提供的私人「TEST ONLY｜11635SCOUT｜整合驗證」試算表，在「擴充功能 → Apps Script」建立**綁定此測試表**的專案。不要選正式資源。
2. 下載測試ZIP，在編輯器建立 Code.gs、Domain.gs、Integrity.gs、Seed.gs、Index.html、IntegrationTests.gs、TestBuildMeta.gs，貼上對應內容；在「專案設定」顯示appsscript.json，套用ZIP中的manifest。啟用Google Sheets API v4（標準Cloud專案亦須啟用API）。測試manifest存取範圍為MYSELF，不能當正式部署設定。
3. 以測試表擁有人登入，先執行 prepareIntegrationSandbox_，同意Google原生授權後再執行 runGoogleIntegrationTests_。完成後回覆執行結果或測試專案連結；我會讀回測試表EventConfig.integration_last_report並核對持久化資料，才記錄真實Google結果。

可在自己電腦用clasp避免逐檔貼上：解壓後於終端執行 `npx @google/clasp login`，將.clasp.example.json複製為.clasp.json並填綁定測試專案Script ID，再執行 `npx @google/clasp push`。登入憑證留在自己的電腦，不交給我。這些命令本次**尚未執行**。

## B. 測試會做什麼

- 確認檔名TEST ONLY、實際登入管理員、環境標記及所有既有參加者皆TEST ONLY。非測試資料會在設定／寫入前被拒絕。
- 建立新的虛構個人及8人小隊，僅以記憶體持有測試QR；驗證本人session，設定S29測試容量及短期測試PIN。
- 驗證個人核章／冪等／重複防呆、7人實到與1人缺席、戰情／CSV／撤銷重算及一般告警結案。
- 結束時登出、關閉S29並還原／移除短期測試PIN設定。收尾失敗或證據無法存回會標FAIL，不會只因前面測試成功就通過。
- 結果只含案例名稱、結果、錯誤碼、run ID、時間與建置雜湊；不含token、PIN、姓名或email。

試算表會保留虛構測試名冊與稽核供對帳，不會寄信或通知他人。腳本不會建立正式部署，也不會自動合併PR。

## C. 即使此runner通過，仍未覆蓋

真實其他帳號的活動組／區長／關主登入、相機與手機、Forms觸發器、真正並行、GAS配額／負載、Google版資料遷移／完整災難復原、場地與UAT。這些須另做案例，不可用owner帳號或VM角色替身冒充。

正式manifest原本為DOMAIN；本次已觀察可用Google資源由個人帳號持有，DOMAIN相容性仍待PoC。本測試包使用MYSELF只供擁有人執行，不擅自放寬為公開／匿名核章。

若不方便做這些操作，Apps Script項目會維持BLOCKED／NOT_RUN，其他已授權的本機修正與驗證仍可繼續。
