# 測試部署與人工設定（尚未執行）

本文件交付可重現步驟，不代表已建立 Google 資源。先使用無真實兒少資料的測試帳號與虛構測試名冊；不得直接部署正式版。

## 1. 建置與 Google 專案

1. 執行 README 的 npm ci、import_seed.py、npm test、npm run build。
2. 在主辦管理的 Google Workspace 建立私有空白試算表與獨立 Apps Script 專案。資料表只分享給必要系統維運，不給所有關主試算表編輯權；關主透過 Web App 操作。
3. 將 backend-gas 的 Code.gs、Domain.gs、Seed.gs、Index.html 複製為同名 GAS 檔，套用 appsscript.json。不要上傳 AppSheetSchema.json 或原始 Stitch HTML。
4. Services 啟用 Google Sheets API v4；如使用標準 Cloud Project，也確認該專案已啟用 Sheets API。
5. Script Properties 設定 SPREADSHEET_ID、BOOTSTRAP_ADMIN_EMAIL；在編輯器執行 setupProject_ 並授權。SECRET 由程式建立，不複製到前端或版本庫。重跑不覆寫人員、既有站況或成績；若遇 schema mismatch 先備份與調查，禁止清表重來。

可選 CLI：另行安裝／登入 Google clasp，複製 .clasp.example.json 為 .clasp.json 並填測試 scriptId。登入憑證不放專案包。執行 clasp push 前確認目標為測試專案；本次沒有執行 push 或 deploy。

## 2. 身分與部署 PoC（阻擋上線）

預設 manifest 為執行部署者、僅 DOMAIN 存取，以免不慎公開。Web App 的實際 Session.getActiveUser().getEmail() 取決於 Workspace、部署模式與授權政策，**程式無法保證每個帳號都能取得 email**。

- 以工作人員同 Workspace 帳號測試「辨識工作人員」，並以非白名單帳號測試拒絕。
- 取得空 email 一律 UNAUTHORIZED；不可用前端傳 email、PIN 或 effective user email 當替代身分。
- 若參加者無同網域帳號，需另行核准與 PoC 參加者部署存取範圍；不要直接放寬正式部署。若需跨網域工作人員，須實作並驗證可信 Google Identity 登入／gateway，再正式部署。此版尚未實作該替代身分。
- 僅發布測試版本，確認 HTML sandbox 的相機授權及 google.script.run 都能運作。Google 不同瀏覽器與帳號限制不能由本機模擬代替。

## 3. 工作人員及 PIN

於 Script Properties 暫存 STAFF_CHANGE_JSON，例如以下結構（email 使用實際核准帳號）：

```json
{"email":"REPLACE_APPROVED_EMAIL","role":"STATION_MASTER","stationIds":["S01"],"zoneIds":[],"active":true}
```

以管理員在編輯器執行 configureStaff_，套用後暫存值刪除。合法角色含 STATION_MASTER、ZONE_LEAD、EVENT_LEAD、SYSTEM_ADMIN。停權改 active=false；更新會提升 credential_version，使舊解鎖無效。

PIN_CHANGE_JSON 結構為 stationId 與 pin（必須為字串四位數，由主辦私密另設，不沿用附件 PIN）。執行 configurePin_，只儲存 HMAC，刪除輸入。換 PIN 立即使舊解鎖 cache key 失效；每人每站10分鐘最多5次嘗試，解鎖有效15分鐘。編輯器可執行 cleanRateLimits_ 清除已過期限速項目；活動前後例行清理。

## 4. 主辦核定設定

預設 honor_threshold=null、team_policy=PENDING。未核准前不判榮譽、不啟用小隊核章。

EVENT_CONFIG_JSON 包含 key、value、reason（核准文件／決議摘要），執行 configureEvent_：

- team_policy：主辦同意後設為 CONFIRMED_PRESENT；仍需隊伍8–10人及每次關主確認實到快照。
- honor_threshold：核准的1–30整數或 null，不假定15。
- stale_seconds：30–600整數，預設90。

於戰情中心以管理員輸入現勘已核准的場地狀態、實測個人／小隊耗時及服務線數；再由有權組長更新為 OPEN 並填理由。不要為了展示而核准虛構點位。

## 5. Forms 報名

1. 新建受控 Google Form，蒐集最少姓名、團別、分齡、參賽模式與小隊編號。模式欄使用 INDIVIDUAL／TEAM 選項。先在管理畫面建立核准小隊。
2. Script Properties 設 FORM_ID 與 FORM_FIELD_MAP，後者為 JSON，以 name、troop、unitType、mode、teamId 對應表單實際 item ID 字串（不是題目標題）。
3. 管理員在編輯器執行 installRegistrationTrigger_，僅建立一個 Form submit trigger。此 helper 需要 forms 及 script.scriptapp scope；觸發器應由主辦維運帳號持有。
4. 實際送出測試回覆，確認一筆 Participants、AuditLogs、Requests；以相同 response ID 重送不應重複建檔。非配置 Form 事件拒絕。
5. 表單回覆建立名冊後，由管理員核對報到並於管理畫面發行個人 QR，直接私密交付本人。**不會自動寄信／簡訊**；QR不寫回 Form 回覆表，不能公開列印完整名冊 QR 清單。
6. Forms資料錯誤、隊伍未建或超額會拒絕；查看 Apps Script trigger failure，只用 response ID 對帳，不貼出個資。修正名冊前保留原表單與審核紀錄。

## 6. 驗證與正式啟用

執行 ACCEPTANCE.md 的 Google 整合、真併發、故障、真手機、現勘與容量項目。所有阻擋解除、主辦核定與UAT簽核後，才另外核准正式資源及部署版本；記錄部署者、版本、表單、資料表歸屬與回復方案。
