# 缺陷與驗收阻擋清單｜Increment 02

狀態日期：2026-11-14。FIXED_LOCAL 表示本地證據通過，未表示真Google或正式關閉。

|ID|嚴重度|發現及改善|狀態|
|---|---|---|---|
|D201|HIGH|撤權後冪等回應仍可能回傳；改成先檢查目前ACL與公告能力|FIXED_LOCAL，真Google待驗|
|D202|MEDIUM|燈號硬編碼5/10；新增受控門檻及損壞設定拒絕，S29容量重算|FIXED_LOCAL；真Sheet持久化通過，計算為Node|
|D203|HIGH|章請求操作者／批次操作者快照關聯不足|FIXED_LOCAL，新增完整性拒絕測試|
|D204|MEDIUM|本輪新測試helper拒絕非測試環境前可能有準備寫入|FIXED_LOCAL，先預檢再寫入；非既有產品缺陷|
|D205|MEDIUM|本輪新測試helper未將收尾失敗判FAIL|FIXED_LOCAL，清理／證據落盤失敗均拒絕通過|
|B201|BLOCKER|未有可執行的Apps Script測試專案／授權渠道|OPEN；真核章、Forms trigger、帳號與LockService未驗|
|B202|HIGH|正式DOMAIN部署與個人Google帳號相容性未知|OPEN；MYSELF測試manifest不代表正式身分解決|
|B203|HIGH|真多帳號ACL、雙關主並行、遷移與全災難回復、手機弱網未驗|OPEN|
|B204|HIGH|人數／容量與配額未核准，登入限流300/10分鐘尚未現場模型驗證|OPEN；不可引用420人示範作容量證明|
|B205|HIGH|場勘、政策、服務線數、隱私留存與主辦UAT待核准|OPEN|

原始失敗與修正證據：evidence/increment-02/pre-fix-tests.txt、runner-pre-fix.txt、node-tests.txt及mutations/。未做獨立安全審查，不宣稱無其他缺陷。
