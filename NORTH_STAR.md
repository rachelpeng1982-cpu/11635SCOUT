# 北極星文件｜竹風勇者・野外冒險任務島

> **North Star / Product Requirements & Engineering Contract**  
> 專案代號：`scout-quest-2027`　版本：`NS-1.0`　文件日期：2026-11-14  
> 活動：民國 116 年（2027）新竹市三五童軍節　預定場域：新竹市東門國小  
> 閱讀對象：Codex、前後端開發者、活動組長、關卡區長、測試與現場執行團隊  
> **文件狀態：產品基準草案；尚待主辦單位核准日期、人數、通關門檻及場地點位。**

## 0. Codex 執行指令（最高優先）

1. 本文件是產品「北極星」：優先保持**可用、可驗證、安全、數據一致、戶外易操作**，而非先追求炫麗動畫。
2. **不要**把 Stitch 畫面中的 420 人、54 隊、3,842 次核章、18/30 等示意數據寫死為真實成果。未連線時須明顯標為「展示模式」。
3. 核章、權限、隊伍成員資格、重複防呆，**必須在後端實作**；前端顯示不算安全控制。
4. 個人 QR 每人一碼；小隊 8–10 人**每人仍有自己的 QR**。整隊核章只更新核准的實到成員，各人成績獨立。
5. 先讀現有原始碼、產出 gap analysis，再依本文件階段實作；不要直接用靜態 Stitch HTML 覆蓋既有 GAS 核心功能。
6. 不得把兒童姓名、電話、緊急聯絡人、個人 QR token、PIN 或權限資料暴露於公開排行榜、公開 API、網頁原始碼、CSV 公開連結或前端 console。
7. 每次交付須提供：變更檔清單、資料表遷移、操作方式、測試結果、已知限制、需要人工設定事項。
8. 有重大未決政策時採**可設定、保守預設、明示待核定**，勿自行宣稱主辦單位已同意。

---

## 1. 一句話願景與成功畫面

**讓每一位參加者用個人專屬 QR Code，走進東門國小的 30 站童軍冒險；讓關主一鍵安全核章、讓小隊與個人同步掌握進度、讓活動組長在同一個戰情中心掌握所有關卡即時成果與安全風險。**

### 1.1 不變的產品原則

- **每人一碼、每人成績**：小隊是合作單位，不可抹掉個人完成紀錄。
- **核章即事實來源**：`StampLogs` 的有效記錄是進度與績效的唯一事實來源；快取可重建。
- **現場優先**：強光可讀、手機單手操作、48px 以上按鈕、低訊號能辨識未同步狀態。
- **安全優先**：重大安全告警高於排行榜與活動成績；場域圖不等於官方疏散圖。
- **站況透明**：分開呈現完成「個人數／小隊隊數／小隊成員數」，避免混加不同統計單位。
- **可追溯**：每個核章及撤銷都有操作者、時間、對象、站號、結果、理由與關聯批次。

### 1.2 成功條件（建議驗收 KPI，待主辦核定）

| 指標 | 建議驗收值 | 核對方式 |
|---|---|---|
| 站點建檔 | `S01`–`S30` 共 30 站、6 區 | 資料表檢核 |
| 報名／個人 QR | 有效參加者 100% 有個人 QR | 名冊比對 |
| 有效核章唯一性 | 同一人同一站最多一筆有效通過 | 自動化測試／資料稽核 |
| 個人與小隊更新一致性 | 已承諾核章的成員不得部分完成且沒有可追復狀態 | 故障注入與復原測試 |
| 管理總表 | 30 站同屏查詢、可依場域／狀態篩選 | UAT |
| 資料刷新 | 前端目標每 20 秒輪詢，異常需標示最後同步時間 | 現場網路測試 |
| 成果匯出 | 支援 CSV，含口徑與時間範圍 | 報表核對 |
| 重大安全事故 | 目標 0 | 活動安全紀錄 |
| 操作可用性 | 關主成功核章回饋明確、不重複送出 | 手機現場 UAT |

> 20 秒是刷新排程目標，**不是保證延遲**；實際能力須由 GAS 配額與現場負載驗證。

---

## 2. 專案背景與邊界（PMP 八大核心）

| 核心 | 北極星定義 |
|---|---|
| 1. 目的與需求 | 取代紙本關卡紀錄的分散、重複蓋章與事後統計，提升參加者體驗與活動組指揮能力 |
| 2. 可衡量目標 | 依 1.2 KPI；以核章一致性、隊伍同步、全場可視化及安全可用為優先 |
| 3. 高階範疇 | Google 表單報名、Sheets 名冊、個人 QR、30 站、4 大畫面、GAS 後端、關主核章、隊伍核章、戰情中心、匯出、稽核 |
| 4. 里程碑 | 2026/11 需求凍結 → 12 月設計／資料結構 → 2027/01 串接測試 → 02 月現勘／壓測／演練 → 03 月核定日期正式活動 |
| 5. 預算 | 暫列規劃估算 67,100 元（非核定金額；與場租／保險／餐飲等分開），系統需支援獨立預算項目管理或可由表單補齊 |
| 6. 經理與權限 | 主辦單位核定；活動組長專案協調與全場管理；系統管理員管理敏感設定；區長監控分區；關主限定本站核章 |
| 7. 利害關係人 | 主辦單位、東門國小、各童軍團、參加者／家長、30 站關主、區長、活動組長、醫護與資訊維運 |
| 8. 風險與限制 | 戶外雨天／訊號／人潮／兒少隱私／共用裝置／GAS 配額／現勘與場地核准／3–4 小時容量限制 |

### 2.1 In Scope / Out of Scope

**納入 V3.0 MVP**：四畫面、角色權限、名冊匯入、每人 QR、站點／場域維護、個人／小隊核章、反重複、站況、等候估計、異常通報、總表、匯出、稽核、離線保護與故障復原。

**不納入 V3.0 MVP**：原生 App Store／Play Store 上架、即時 GPS 追蹤兒童、公開個人排行榜、金流、獨立付費推播、實際校園疏散路線導引、未經授權的校務資料串接。

---

## 3. 使用者角色與權限

| 角色 | 核心任務 | 可讀 | 可寫 |
|---|---|---|---|
| 參加者 `PARTICIPANT` | 看自己的 QR、徽章、進度、公開站況 | 自己資料、同隊**最少必要**摘要、站點公開資訊 | 不可核章、不可改隊員 |
| 小隊長 `TEAM_LEADER` | 看小隊彙總與隊員到場核對（授權後） | 所屬隊伍進度 | 可送出到場名單供關主確認；不可核章 |
| 關主 `STATION_MASTER` | 本站掃碼、核章、排隊數、短期異常 | 本站所需參加者最小資料與狀態 | 本站核章、排隊、異常 |
| 區長 `ZONE_LEAD` | 監看所管 5 站，轉介異常 | 所屬區完整站況 | 允許範圍內分流／異常派工；無權任意改成績 |
| 活動組長 `EVENT_LEAD` | 30 站戰情與調度 | 全站彙總與必要管理資料 | 開關站、公告、異常調度、受控成績更正申請 |
| 系統管理員 `SYSTEM_ADMIN` | 後端設定、權限、資料修復 | 按職務需要 | 角色授權、補償修正、遷移、審計 |

**安全底線**：不得僅憑 4 位數 `station_pin` 決定核章權限。須先有授權身分（例如 Google 帳號白名單或經伺服器驗證的工作人員工作階段），再輸入本站 PIN 作第二因子／當站解鎖。PIN 設錯次數限制、鎖定、換碼、審計；不可回傳 PIN 或雜湊值。

### 3.1 QR 模式

- 產生不可猜測的隨機 token；`participant_id` 是公開編號，不是登入祕密。
- QR 連結可開本人護照；視為**持有即授權的敏感登入連結**。建議短效工作階段與 token 更換機制；不要在公開畫面顯示 token 原文。
- 若遺失 QR，限管理員依流程重新發放並撤銷舊憑證。
- 關主端掃碼取得最小化的身份驗證結果，確認符合本站規則後才能核章。
- 不把 `emergency_contact`、家庭資訊等放入 QR payload 或任何站況公開回應。

---

## 4. 參賽模式、活動時間與通關政策

### 4.1 雙模式

- `INDIVIDUAL`：1 人，完成後記 1 個人站次。
- `TEAM`：8–10 人組隊，每人一個 QR；整隊核章一個 `batch_id` 對應實際確認到場的 N 位成員，各人各 1 個站次。
- **小隊完成隊次**定義為：該站依核定政策具資格的隊伍，其「核章要求成員」全部具有效核章。預設從「活動當站確認的到場名單」取準，另須保留核准快照及缺席名單，不能自動替不在場者蓋章。
- 同站「個人核章」與「小隊核章」都使用同一個後端唯一判定規則，避免同一成員被核兩次。
- 分齡單元 `unit_type`: 稚齡／幼童／童軍／行義／羅浮（依報名實際選項可設定）。站點可提供分齡任務內容，但統一核章資料契約。

### 4.2 活動容量與時間

- 活動全程：**3–4 小時**；闖關核心時間建議 **130–180 分鐘**，其餘報到、儀典、核對、閉幕。
- 全場 **30 站開放，不等於每人必過 30 站**。最低通關數（畫面示例有 15 站榮譽門檻）待主辦核定，以 `honor_threshold` 設定值控制；不得把 15 寫死。
- 自由闖關＋分流優先；如主辦另定必修站／分區強制站，須以 `required_station_ids` 設定。
- 排隊單位須區分人與隊，管理者不得把「3 隊」直接標成「3 人」。

### 4.3 等候估算（第一版公式）

`estimated_wait_min = ceil(current_queue_units × avg_duration_min / service_lanes)`

其中 `current_queue_units` 為現場排隊**受理單位**、`service_lanes >= 1`；此式在個人及小隊混排時只適合粗估。增強版以 `individual_queue`, `team_queue`, `avg_individual_min`, `avg_team_min` 分類計算，並顯示「預估、非保證」。關主手動填報排隊數需保留更新者及時間。

建議燈號：`LOW <=5 分`、`MEDIUM >5 且 <=10 分`、`HIGH >10 分`；警戒門檻可由組長設定、公開顯示最後更新時間；站點暫停或資料過期優先顯示 `UNAVAILABLE/STALE`，不能視為綠燈。

---

## 5. 六區 × 30 站（暫擬資料，禁止視為正式核准場地）

| 區域代碼 | 站號 | 主題 | 初擬場域 |
|---|---|---|---|
| F1 | S01–S05 | 童軍技能 | 操場草地區 |
| F2 | S06–S10 | 防災救援 | 操場跑道外側 |
| G1 | S11–S15 | 永續環保 | 晨希館二樓綠廣場 |
| B1 | S16–S20 | 團隊合作 | 籃球場甲 |
| B2 | S21–S25 | 科技探索 | 籃球場乙 |
| B3 | S26–S30 | 風城冒險 | 籃球場丙 |

詳細站名與種子資料以 `stations_seed.csv` 為準。每站需可設定名稱、任務說明、分齡差異、個人／小隊服務分鐘、關主、服務線數、位置描述、場域核准狀態、可及性、雨備、站況及備註。**大榕樹、司令台、風雨遮棚等現地特徵僅於現勘確認後使用**；不可生成虛構精確座標。地圖是闖關導覽圖，明確標示**非官方疏散圖**。

---

## 6. 四大前端畫面：UI / UX 行為契約

### A. `participant.html` 冒險通行證

**必備**：登入狀態、本人 QR 圖（不得外洩 token 明文）、個人編號與有限識別、完成 `n/30`、進度條、6 區×5 站徽章、分齡標記、小隊摘要、最近同步時間、可前往地圖、無網路提示。

**數據**：`GET myProgress` 回傳本人資料及 `completedStationIds`；`honorAwarded` 由規則計算，不可由前端自行永久寫入。小隊展示不顯示完整未成年成員敏感資料。

**狀態**：未登入／有效／憑證失效／載入中／已離線（只讀快取）／同步失敗。禁止離線端自行「標為過關」。

### B. `map.html` 東門國小冒險地圖 HUD

**必備**：6 區卡片、30 站列表、全站搜尋與分區篩選、站點名稱／位置描述／狀態、個人完成數、小隊完成隊數、小隊成員完成數、排隊單位、預估等待、綠黃紅燈號、建議分流、全場安全公告。場地布局可圖形化但沒有實測坐標時用「區域示意」而非精確地圖。

**狀態**：OPEN／PAUSED／CLOSED／STALE；高風險警示優先；禁止導航使用者穿越未核准區域。

### C. `station-master.html` 關主核章

**必備**：關主授權登入＋本站 PIN 解鎖、相機 QR 掃描、手動學員編號查詢（需額外身分核對）、個人／整隊模式切換、實到成員確認、預覽此次核章對象、二次確認、成功或重複警告、排隊數更新、本站統計、異常上報、操作歷程。

**狀態**：掃碼中／查無／已完成／待確認／提交中／核章成功／重複／資格不符／網路失敗。提交中禁止連點；網路失敗時不得用綠色成功圖示。

### D. `war-room.html` 活動組長戰情中心

**必備**：30 站即時總表、全場報到有效人數、有效小隊數、個人核章站次、小隊成員核章站次、完成小隊站次、分站排隊／等待／壅塞、開關站、告警處理、公告、CSV 匯出、20 秒輪詢、最後同步、搜尋／篩選。

**重要統計區分**：

- `uniqueCheckedInParticipants`：實際報到的**不重複人數**。
- `individualStampCount`：個人組有效核章**站次**。
- `teamMemberStampCount`：小隊組成員有效核章**站次**。
- `completedTeamStationCount`：符合小隊通關規則的**隊站次**。
- `completedTeamCountByStation`：特定站完成**隊數**。
- `queueUnits`：現場排隊**單位數**（人與隊混排不可直接換算人數）。
- 若同時顯示總核章 `totalValidStamps`，明示是站次，不是參加者人數。

**管理提醒**：每 20 秒輪詢是預設前端策略，需退避、節流、頁面不可見時降低頻率；公開端與管理端使用不同的資料欄位投影和授權。

---

## 7. 技術架構（GAS 優先，保留可遷移性）

```text
Google Forms（報名）
    ↓ 表單觸發／批次匯入（經資料驗證）
Google Sheets（受控資料表） ←→ Apps Script Service Layer（權限、核章、稽核、查詢）
                                      ↑
                                  Web App HTTPS
                                      ↑
        A 參加者   B 冒險地圖   C 關主端   D 戰情中心
```

**首選方案**：Google Apps Script Web App + HtmlService + `google.script.run` 供同網域 GAS HTML 呼叫；Google Sheets 做小／中型活動的資料儲存。原始 Stitch 可輸出頁面作為 UI 參考，不等於已接上 GAS。

**外部靜態網站方案（條件式）**：若 `participant.html` 等部署到 Netlify／其他靜態主機，不能直接假設瀏覽器 `fetch` 到 GAS 就能使用可靠 CORS／JWT／Cookie；GAS Web App 的跨網域、登入及 CORS 特性須 PoC 實證。無法實證時回退到 GAS HtmlService 單一網域，**不要使用 JSONP 寫入、在 URL 傳 PIN／token 或提供無驗證的 `doGet` 修改端點**。

**資料服務抽象**：前端只呼叫 `api.*`，讓 GAS / 替代服務可在不變更畫面邏輯下切換。所有 API 先驗證 session、角色、站點及輸入 schema。

### 7.1 參考專案目錄（Codex 目標；可調整構建方式）

```text
scout-quest-2027/
  README.md
  NORTH_STAR.md
  index.html
  participant.html
  map.html
  station-master.html
  war-room.html
  css/design-tokens.css
  css/scout-theme.css
  js/config.js
  js/api.js
  js/app.js
  backend-gas/Code.gs
  backend-gas/AppSheetSchema.json
  data/stations_seed.csv
  tests/
  docs/DEPLOYMENT.md
  docs/OPERATIONS.md
  docs/SECURITY.md
  docs/DECISIONS.md
```

> GAS `HtmlService` 若以單一 `Index.html`／partial include 實作，可保留原本 4 頁作 UI 原型或建置輸入；**正式可部署產物及路由策略必須明確說明**，不能承諾雙擊 HTML 檔就能驗證後端功能。

---

## 8. Google Sheets 資料契約（正式版建議 7 張）

原先提議的 4 核心表：`Participants`, `Stations`, `StampLogs`, `Alerts`；因小隊與權限／稽核需求，增補 `Teams`, `StaffPermissions`, `AuditLogs`。視需要可再拆 `StationQueue`、`EventConfig`，但應保留單一事實來源與遷移步驟。

### 8.1 `Participants`（個人）

`participant_id [PK]`, `qr_token_hash [unique, secret]`, `name [restricted]`, `troop_name`, `unit_type`, `participation_mode [INDIVIDUAL|TEAM]`, `team_id [FK nullable]`, `active_status`, `checked_in_at`, `guardian_or_emergency_contact [restricted, if truly needed]`, `created_at`, `updated_at`。

- 不以原始 QR token 當公開主鍵；`completed_count`, `completed_stations`, `honor_awarded` 為唯讀衍生欄位／快取，不應由前端直接修改。
- 避免將聯絡資訊混入公開查詢的資料傳輸結構。

### 8.2 `Teams`（小隊）

`team_id [PK]`, `team_name`, `troop_name`, `leader_participant_id [FK nullable]`, `member_min [default 8]`, `member_max [default 10]`, `status`, `created_at`。隊伍成員以 `Participants.team_id` 連結，必要時另建 `TeamMembership` 保留變更歷史。

### 8.3 `Stations`（30 站）

`station_id [PK:S01..S30]`, `zone_id`, `zone_name`, `station_name`, `location_code`, `location_desc`, `venue_approval_status`, `status [OPEN|PAUSED|CLOSED]`, `individual_duration_min`, `team_duration_min`, `service_lanes`, `current_individual_queue`, `current_team_queue`, `queue_updated_at`, `congestion_level [derived]`, `estimated_wait_min [derived]`, `last_updated`。

- `station_pin` 不放在任何可公開讀取的 Stations API 輸出；敏感驗證設定移至受限設定或 Script Properties，儲存不可逆核驗資訊及限速狀態。
- `total_completions` 用有效 `StampLogs` 聚合，不是由前端隨意累加的欄位。

### 8.4 `StampLogs`（有效核章真相來源）

`log_id [PK UUID]`, `batch_id [nullable, team action]`, `station_id [FK]`, `participant_id [FK]`, `team_id [FK nullable]`, `stamp_mode [INDIVIDUAL|TEAM]`, `outcome [PASS|REVOKED]`, `created_at`, `operator_id`, `idempotency_key`, `source`, `reversal_of [nullable]`, `reason [nullable]`。

- **唯一語義**：每位參加者在同一站至多一筆「有效 PASS」。Google Sheets 無原生唯一索引；由 GAS `LockService` + 伺服器端檢查 + 冪等鍵控制。
- 不在日志存 `operator_pin`；只存已驗證的工作人員 ID。
- 撤銷以不可變補償事件處理，不默默刪列；先定義 `effective passes = PASS - valid reversal` 的計算規則。

### 8.5 `Alerts`（異常）

`alert_id [PK]`, `created_at`, `station_id [nullable]`, `alert_type [CROWD|SUPPLY|MEDICAL|BROADCAST|OTHER]`, `severity [LOW|MEDIUM|HIGH|CRITICAL]`, `description`, `status [PENDING|DISPATCHED|RESOLVED]`, `handler_id`, `resolved_at`, `public_message [sanitized, optional]`。

- 醫療事件的個人細節不得出現在參加者公開頁，公開頁僅顯示必要安全指示。

### 8.6 `StaffPermissions`（權限）

`staff_id [PK]`, `account_email [unique]`, `role`, `allowed_station_ids`, `allowed_zone_ids`, `active`, `credential_version`, `updated_at`。4 碼本站 PIN 僅為解鎖輔助，不是唯一身分。

### 8.7 `AuditLogs`（不可忽略）

`audit_id [PK]`, `timestamp`, `staff_id`, `action`, `entity_type`, `entity_id`, `request_id`, `result`, `reason`, `old_value_summary`, `new_value_summary`。不得記錄秘密 token 或原始 PIN。

### 8.8 資料型別與 Sheets 注意事項

- 日期用 ISO 8601 時間戳；儲存建議 UTC，顯示台灣 `Asia/Taipei`；活動報表註明時區。
- QR token 一律字串；不需讓試算表自動把前導零／科學記號轉型。
- JSON 陣列可作匯出／衍生欄位，但不作關係資料的唯一來源。
- CSV 匯入只完成**欄位與種子資料**；不代表 API、驗證、觸發器、權限、部署自動生效。
- 所有外部輸入先檢查 CSV/Sheet 公式注入、HTML 注入、非法狀態與超長文字。

---

## 9. API 功能契約（邏輯方法名，可映射為 `google.script.run`）

以**統一回應 Envelope**：

```json
{"ok": true, "data": {}, "serverTime": "2027-03-XXT00:00:00Z", "requestId": "uuid"}
```

失敗：

```json
{"ok": false, "error": {"code": "ALREADY_STAMPED", "message": "本站已完成核章"}, "requestId": "uuid"}
```

### 9.1 Queries

| 方法 | 授權 | 輸出範圍 |
|---|---|---|
| `getMyProgress(session)` | 本人 | 自己進度、徽章、最少必要的小隊資訊 |
| `getPublicStationBoard()` | 公開 | 站號、場域、狀態、隊次／站次、排隊與最後更新；**無個資** |
| `getStationDetail(stationId, staffSession)` | 指定關主／區長 | 本站核章統計、排隊、過期狀態 |
| `lookupParticipantForStamp(stationId, scannedCredential, staffSession)` | 本站關主 | 最少識別＋是否已蓋本站章 |
| `getAdminDashboard(staffSession, filters)` | 組長／管理員 | 30 站全景、錯誤、告警、時間戳 |
| `exportReport(staffSession, filters)` | 組長／管理員 | 經權限過濾 CSV，敏感名冊另授權 |

### 9.2 Commands

| 方法 | 必要參數 | 後端保證 |
|---|---|---|
| `registerParticipant` | validated form payload | 去重、建檔、個人 QR、審計 |
| `approveIndividualStamp` | `stationId`, `participantCredential`, `idempotencyKey`, `staffSession` | 鎖定、權限、開站、唯一有效核章 |
| `approveTeamStamp` | `stationId`, `teamId`, `presentMemberIds[]`, `idempotencyKey`, `staffSession` | 驗證人員與實到快照；同批追蹤，失敗可恢復／補償 |
| `updateQueue` | `stationId`, `individualQueue`, `teamQueue`, `staffSession` | 非負整數、站點權限、updatedAt |
| `changeStationStatus` | `stationId`, `status`, `reason`, `staffSession` | 具權限、審計、UI 同步 |
| `createAlert` / `resolveAlert` | validated alert payload | 控制敏感資訊、記錄派工 |
| `revokeStamp` | `logId`, `reason`, privileged session | 記錄補償與重算、不可無痕刪除 |

> 跨域 HTTP 實際實作方式由 PoC 決定，不可只因表面上有 `doGet/doPost` 就視為安全可用。

### 9.3 核章偽碼（工程語義，不是可直接部署程式）

```text
approveIndividualStamp(req):
  authenticate_staff(req.session)
  authorize_station(req.staff, req.stationId)
  assert_station_open(req.stationId)
  assert_participant_active(req.participantCredential)
  with_script_lock:
    if has_result_for_idempotency_key(req.key): return previous_result
    if has_effective_pass(req.participantId, req.stationId): return ALREADY_STAMPED
    append_immutable_pass_event(...)
    append_audit_event(...)
    return CONFIRMED
```

**整隊故障關鍵**：Sheets 非真正交易資料庫，`appendRow` 多筆中途可能失敗。採 `batch_id` + `PENDING/COMMITTED/FAILED` 批次狀態（可增 `StampBatches` 工作表）或先寫入可核對的批次暫存，再逐員寫入並**僅在完整確認後對外公布**；提供重試、補償與人工修復工具。**不要虛稱 Google Sheets 支援原生 ACID 多筆交易**。

---

## 10. 離線、衝突、重送及資訊安全

- **參加者離線**：可讀最後已同步進度，但明示「僅為快取」；不顯示虛構完成。
- **關主離線**：可暫存掃碼候選與排隊資料；**未收到後端確認不得算核章成功**。若業務需要離線正式核章，需另定可信裝置憑證、受保護排隊與人工對帳政策，MVP 不預設開放。
- **重送**：每個指令帶 `idempotencyKey`；禁止雙擊，伺服器去重並回前次結果。
- **跨關主同時掃碼**：Script Lock 保護同一工作表的核章判定與寫入。
- **Token／PIN／個資**：避免 URL 查詢紀錄、log、localStorage 不必要長期存放；高權限憑證不存明碼；資料使用與留存期限由主辦確認；兒少資料最小化。
- **防濫用**：伺服器端角色驗證、錯誤次數限制、異常請求紀錄、CSRF／會話防護方案依實際 GAS 部署方式設計。
- **運作告警**：同步失敗、API 限額、資料過期、關主設備故障需在戰情中心可見。

---

## 11. Stitch 視覺設計系統（直接沿用上傳的 `DESIGN(1).md`）

**風格：** `Field Expedition & Scout Heritage`／Tactile Field Manual／Modern Heritage Minimal。避免卡通、螢光、華而不實動畫；需要真實童軍野外冒險精神、榮譽布章與野外地圖語彙。

| Token | 色值 | 用途 |
|---|---|---|
| 深松林綠 | `#1B382B` | 主導航、按鈕、深底卡片 |
| 深層主色 | `#042217` | 主要背景階層 |
| 羊皮紙色 | `#F7F4EA` | 主要閱讀底色 |
| 基礎明亮底 | `#FCF9EF` | 全頁背景 |
| 羅盤古銅金 | `#D4A359` | 徽章、重點、成就 |
| 皮革棕 | `#5A3E2B` | 區分、標籤、細邊框 |
| 苔蘚綠 | `#3D6647` | 通關、低風險、進度 |
| 警示紅 | `#A8382B` | 真正危險與阻斷 |

- 字體 `Noto Sans TC`／`Noto Sans`；以高對比、繁體中文易讀為主。
- 行動裝置 `<768px` 單欄，768–1024px 平板，桌面最大內容寬約 1200px。
- **觸控熱區最低 48px**；主要容器圓角 20px；戶外強光對比、狀態不能只靠顏色表達。
- 頂部主題抬頭「竹風勇者・野外冒險任務島」；底部四 Tab：通行證／冒險地圖／關主核章／戰情總部（按角色隱藏不可用項）。
- 保留 Stitch 四張畫面的視覺語言，但其數字、姓名、相片、QR、隊伍與站況均為**UI 示意**，不可當作正式個資或真實資料。
- 根據 `DESIGN(1).md` 原始稿更詳細的顏色、圓角、陰影、字級，優先保留；如與可用性衝突，以安全、可讀為先。

---

## 12. Codex 建置里程碑與 DoD

### Phase 0｜現有程式盤點與決策紀錄

- 讀現有 V1.2/V2.0 的 `Code.gs`、`Index.html`，與 Stitch 匯出四畫面及 `DESIGN.md`。
- 產生 `docs/GAP_ANALYSIS.md`：已有、缺少、需重構、資安阻斷、API 對照。
- 產生 `docs/DECISIONS.md`：部署方案、資料模型、QR 憑證生命週期、隊伍核章一致性方案。

### Phase 1｜專案骨架與視覺

- 建置指定檔案架構及 `README.md`，四畫面能導航，RWD 可在手機 390px 寬操作。
- 有展示資料時清楚標示 DEMO、不可碰正式資料。
- `design-tokens.css` 與 Stitch 相符，關主重要操作 48px 按鈕。

### Phase 2｜資料與 API

- 自動建立／驗證七張 Sheets 欄位，支援安全重跑的 schema migration 和 seed idempotency。
- 所有 API 使用同一邏輯回應契約；做最小權限過濾與輸入驗證。
- 單人核章、整隊核章、防重複、冪等、撤銷／稽核皆有測試。

### Phase 3｜四畫面實際串接

- A 不依賴假資料；B 可顯示 30 站有效統計；C 可掃碼／查詢／核章／排隊；D 顯示 30 站 KPI、異常與 CSV。
- 20 秒更新可視、失敗有提示、離線不假裝成功。

### Phase 4｜可靠性、資安與現地驗收

- 模擬多人同時核章、同一人雙重送出、小隊核章中途故障、關主跨站操作、關閉關卡、未登入 API、無網路、時鐘誤差。
- 使用真手機實測 QR 相機權限、不同瀏覽器、強光閱讀。
- 演練雨備站、排隊 10 分鐘以上、告警派工。
- 交付部署／備份／還原／人工對帳／活動結束資料封存 SOP。

### 12.1 驗收案例（必須自動化或具 UAT 記錄）

| ID | 測試操作 | 預期 |
|---|---|---|
| T01 | 同人掃 QR 登入 | 只看到自己的進度 |
| T02 | 個人首次核 S03 | 成功且有效完成數 +1 |
| T03 | 同人 S03 連續核兩次 | 第二次 `ALREADY_STAMPED`，有效總數不變 |
| T04 | 兩位關主同時核同一人同站 | 最多一筆有效 PASS |
| T05 | 8 人小隊 S12 全員核章 | 8 位個人有效紀錄、隊站次 +1 |
| T06 | 小隊 1 人缺席 | 缺席者不能被自動核章；隊伍統計依已核准出席規則 |
| T07 | 小隊批次中第 5 人寫入失敗 | 不回報整隊完成；可對帳、重試或補償 |
| T08 | 關主試圖核別站 | `FORBIDDEN`，有審計紀錄 |
| T09 | 未認證使用者要求管理資料 | `UNAUTHORIZED`，無個資洩露 |
| T10 | 關站時核章 | 拒絕並明確提示原因 |
| T11 | 站點排隊超過門檻 | B/D 顯示紅燈及建議分流 |
| T12 | 網路中斷時關主提交 | 不宣稱成功，可安全恢復重試 |
| T13 | 連續多次 API 失敗 | 顯示最後同步時間及資料過期 |
| T14 | 30 站 CSV 匯出 | 數量口徑、日期及時區正確 |
| T15 | 資料撤銷 | 有審計與補償，畫面和報表正確重算 |
| T16 | 公開查詢站況 | 不含姓名、電話、token、PIN、醫療細節 |

---

## 13. 已知基礎、尚未完成與資料來源

### 13.1 現有資產（已檢視）

- `116童軍節_野外冒險Stitch風格_30站APP_V2.0.zip`：包含原型 `Code.gs`、`Index.html`、`DESIGN.md`、Stitch Prompt 與部署指南。
- `116童軍節_東門國小_30站個人QR與場地即時總表_APP_V1.2.zip`：東門國小六區／30 站 CSV、場域定義與 GAS 程式。
- `DESIGN(1).md`：Stitch 實際匯出的 `Field Expedition & Scout Heritage` 視覺規範。
- 使用者提供的 Stitch 四畫面截圖：A 冒險護照、B 地圖、C 關主核章、D 戰情中心。
- `scout-quest-2027/` 目錄與四核心表架構是使用者提出的**目標專案規格**；對話中未取得該整包專案程式 ZIP，不能宣稱其每個頁面與 DataStore 已經成功部署。

### 13.2 現有程式與新需求的差距

- 既有 GAS 具 `setupProject`, `onRegistrationSubmit`, `getMyProgress`, `approvePass`, `approveTeamPass`, `getPublicStationBoard`, `getAdminDashboard`, `updateQueue`, `updateStationVenue` 等原型能力。
- 既有 PIN 驗證與公開頁資料設計應重構為授權工作階段與最少權限；原型**不能直接視為正式可上線**。
- `avg_duration_min`, `service_lanes`, `congestion_level`, 人／隊分別排隊、七張表完整權限與稽核、真正的前後端分離及整隊失敗補償等為 **V3.0 要實作／驗證**，不能從既有原型推定已完成。
- Stitch 目前展示的 420 人／54 隊／3,842 筆為畫面示範值，不是已核實活動規模。

### 13.3 待主辦單位決策（以設定檔保留，不擅自定案）

1. 2027 年正式活動日期、時段、正式／備用場地。
2. 個人參與人數、小隊數、年齡分布、是否有 8 人以下臨時小隊。
3. 通關門檻（例如 15/30 是否發榮譽章）、必修站／跨區站數、排行榜是否啟用。
4. 小隊「通過」定義：全部註冊隊員還是當場核准出席隊員；缺席替代規則。
5. 每站負責人、可服務線數、實測平均耗時、現勘核准點位、二樓綠廣場使用範圍。
6. 正式部署模式：單一 GAS HtmlService 或需外部靜態站＋可信 API Gateway。
7. 工作人員帳號登入與 4 位 PIN 解鎖政策、個資保留／刪除期限。
8. 活動完畢資料的交接與主辦單位權限歸屬。

---

## 14. 給 Codex 的交付標準（Definition of Done）

**只有當以下全部成立，才可宣告「可供活動當日上線」**：

- [ ] 有真實可重現的部署指令、Google 表單／Sheets／GAS 配置程序。
- [ ] 個人 QR 用真資料能登入且不能看他人敏感資料。
- [ ] 30 站狀態與三類完成量口徑一致。
- [ ] 關主站點授權成立，無法冒用或跨站核章。
- [ ] 個人／整隊核章冪等、並行、部分失敗可復原。
- [ ] 組長 20 秒輪詢含過期／故障提示，資料匯出準確。
- [ ] 兒少個資不在公開 API／前端檔案／公開報表外洩。
- [ ] 實機操作、弱網、30 站流程與容量壓測完成。
- [ ] 場地與日期經主辦核准，並有雨備及現場紙本對帳 SOP。
- [ ] UAT 由活動組長與關主代表簽核。

**北極星最終定義**：不是「畫出 4 張漂亮的童軍 APP 畫面」，而是讓**每一位參加者確實被記錄、每一位關主安心核章、每一位管理者看見可靠的 30 站現場真相**。
