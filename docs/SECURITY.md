# 安全設計與限制

- 只有 doGet 與 api 對 HtmlService 公開；所有編輯器／內部 helpers 以 `_` 結尾，google.script.run 不可呼叫。沒有 doPost、JSONP 或 URL 寫入端。
- 工作人員身分源為 Session.getActiveUser Google email。每次重新比對 StaffPermissions active、role、範圍。Google身分為空拒絕；本機 DEMO 角色只影響畫面，寫入完全拒絕。
- 本站 PIN 是身分之外的解鎖層。HMAC＋私密 SECRET、每帳號每站限速、15分鐘解鎖、換碼失效。4位PIN本身不安全，不能單獨授權。
- QR 為兩個 crypto.randomUUID() 組合，以受權管理員指令發行；持有即本人讀取權。伺服器驗證 UUIDv4 格式，僅存 HMAC，重發即撤銷舊碼及相關 session。發行也帶冪等鍵，伺服器 Requests 只存結果與 HMAC fingerprint，不存QR原文。瀏覽器只在記憶體與 QR canvas 暫留，不放 URL／localStorage／console；離頁清除發行畫面。
- 參加者以 QR 交換30分鐘CacheService session，可能因Cache提早逐出而須重登。本人QR可截圖，請當作敏感證件；共用裝置需登出並關閉頁面。這不是防攝影或防轉傳機制。
- 同隊僅回編號與完成數，不回其他姓名、電話、健康資訊。關主查詢僅回核章必要識別，須有本站權限及PIN解鎖；手動編號需另核對本人。
- 公開站況使用明確欄位投影；醫療事件僅組長管理頁有內部描述，公開頁只接收組長另填不含個資的 public_message。前端全部用 textContent，無未信任 innerHTML。
- 輸入限制型別、長度、狀態、非負整數，拒絕公式／HTML前綴；Sheet以stringValue存JSON，CSV額外跳脫公式及雙引號。
- 未確認核章一律不成功；逾時30秒回應不確定，保留同冪等鍵重試。服務端原子提交避免半批事件。全體操作受ScriptLock保護，讀取一致性優先；Google負載仍待測。
- 稽核不包含原始PIN、token、請求payload或原始Google例外；給前端通用錯誤及requestId。拒絕操作在已知staff時嘗試稽核；未登入拒絕不記個資；儲存層本身故障時不能保證拒絕稽核成功。
- 存取隔離仰賴 Google 分享設定；試算表編輯者仍可改資料，這不是防管理員竄改的密碼學帳本。限制直接編輯者，定期備份，人工改動須對帳。

## 尚待驗證／擴充

Google登入跨域PoC、真API原子性與配額、相機sandbox、全場負載、工作階段／帳號停權實測及主辦資料留存政策。全場請求需讀取多表，雖公開站況有10秒快取且僅差異列寫入，不能推定可承受420人或更多同時操作。超出15,000列／表需封存或遷移，不能停用保護硬撐。

主辦未要求公開排行榜，故未建立。未蒐集緊急聯絡人／健康資料；如確有業務需求，須另設受限醫護資料流程及留存政策，不加入公開或一般關主API。
