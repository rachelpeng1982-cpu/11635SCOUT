# 階段交付狀態

日期：2026-11-14（Asia/Taipei）。原始規格 NS-1.0 仍為主辦待核准基準草案。

|Phase|已完成|測試／證據|剩餘與人工事項|
|---|---|---|---|
|0 盤點|完整讀交接文件、6資產雜湊符合、舊審查保留、差距／決策／逐站對照|MANIFEST_CHECK、STATION_MAPPING|legacy-v2/backlog未提供，不能宣稱完成舊碼全文審查|
|1 骨架視覺|四視圖、Stitch森林／羊皮紙／金色、48px、DEMO隔離、自帶QR編碼與無外部資源依賴|390px瀏覽器、四頁切換、30站篩選、按鈕熱區|真手機與強光可讀性待測|
|2 資料API|11表契約、建表／seed可重跑、QR hash/session、Google ACL＋PIN、核章唯一／冪等、小隊實到批次、撤銷稽核、Forms與Google儲存adapter|37項Node自動測試含VM替身、故障注入與Forms重送|真Google Sheet／Forms、email身分PoC、權限設定及政策待核准|
|3 四畫面接線|護照／QR／徽章／同隊最小摘要、30站地圖、掃描與手動確認、小隊勾選／預覽、排隊、管理KPI／告警／公告／匯出、20秒退避、超時與未知狀態|瀏覽器DEMO及模擬google.script.run、QR canvas、斷線同鍵重試|尚未連接使用者Google資源；相機BarcodeDetector／iframe需真機測試|
|4 可靠性驗收|權限／重複／故障／回應遺失／公開投影測試；部署、安全、維運、備份復原與驗收文件|本機測試及建置通過|Google併發／配額壓測、真手機、現勘、還原演練、UAT簽核未完成|

## 已知功能邊界

- 本輪已新增站點文字／分齡／雨備維護、必修站設定、小隊長實到草稿、更正申請與可靠分流建議；目前只有指定範圍本機自驗，正式狀態依 docs/srs/VERIFICATION_REPORT.md。
- 完整稽核前後值摘要、全表主外鍵稽核及區長受控派工尚有缺口，不可計正式完成。
- 目前支援安全新表schema v1與不覆寫seed，沒有自動把legacy-v2資料轉入正式系統的遷移器。缺原始碼與資料時不猜測舊關聯。
- Google同網域帳號為目前staff身分方案；跨網域staff登入替代方案未實作。參加者存取範圍仍需Google部署PoC。
- 不提供自動寄送QR、原生推播、兒童GPS、公開個人排行榜或離線有效核章。
- 15,000列上限不是容量承諾；需要依正式規模驗證或改用可擴展資料庫。沒有真實Google寫入或部署證據。

## 需要人工設定

主辦Workspace與測試資源、SPREADSHEET_ID、管理員Google email、staff白名單、各站新PIN、Form item ID mapping、trigger、現勘核准／耗時／線數、隊伍政策／榮譽門檻、QR私密交付、資料留存及UAT簽核。具體操作見 DEPLOYMENT.md。


## Increment 01 更新（2026-11-14）

原報告R07／R08／R09之本機實作缺口已補強：稽核前後值摘要與v2受控遷移、11表完整性讀寫邊界檢查、區長分區內派工與結案。59項Node測試通過、瀏覽器回歸及區長實際共用邏輯橋接通過、新增6個突變均被偵測。詳見 docs/INCREMENT_01_VERIFICATION.md 與 docs/evidence/increment-01。

此為新增分段結果，不刪除舊版缺口紀錄；相關票未正式驗收，真Google／真機／現勘／負載／UAT仍未完成，不能宣稱APP開發完成或可上線。
