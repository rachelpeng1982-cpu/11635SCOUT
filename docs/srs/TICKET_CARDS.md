# 完整票卡 v0.2

所有票級AC與父Story AC分開；尚未估算／分派或正式完成。

## TKT-001｜建立有效規格、衝突與政策清單

- 父層：E01 → S01 → TSK-01A
- 需求／來源：PR-01, PR-02, FR-42；NORTH_STAR.md §0；NORTH_STAR.md §12 Phase 0；NORTH_STAR.md §0 第7項；NORTH_STAR.md §12；NORTH_STAR.md §4.2；NORTH_STAR.md §13
- 目標：規格與政策基線；本票交付：北極星逐條對照、政策待核定清單及決策紀錄
- 做：北極星逐條對照、政策待核定清單及決策紀錄
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：無票級前置，仍須DoR
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：北極星逐條對照、政策待核定清單及決策紀錄；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦尚待核定：活動日期／人數／門檻／必修站／實到政策；未提供04票卡正式schema，本文識別碼為本專案提案
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-001/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 北極星與舊CSV／HTML衝突，When 建立基線，Then 每項衝突有來源、決策或待決，且北極星優先，原檔／雜湊保留。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 規格衝突，When 細化或實作，Then 北極星優先並記錄差異，不將既有程式自動升格為需求
- Given 未估算或缺Google環境票，When 做DoR，Then 明列缺項並保留未就緒狀態，不虛填執行者
- Given 未核定，When 啟動功能，Then 不把15站、活動日期或全隊名冊自動當成已核准規則

## TKT-002｜定義可設定規則與安全預設

- 父層：E01 → S01 → TSK-01A
- 需求／來源：PR-01, PR-02, FR-42；NORTH_STAR.md §0；NORTH_STAR.md §12 Phase 0；NORTH_STAR.md §0 第7項；NORTH_STAR.md §12；NORTH_STAR.md §4.2；NORTH_STAR.md §13
- 目標：規格與政策基線；本票交付：榮譽門檻／必修站／實到政策／日期狀態的設定契約
- 做：榮譽門檻／必修站／實到政策／日期狀態的設定契約
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：榮譽門檻／必修站／實到政策／日期狀態的設定契約；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦尚待核定：活動日期／人數／門檻／必修站／實到政策；未提供04票卡正式schema，本文識別碼為本專案提案
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-002/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 未核定門檻／必修站／實到政策，When 載入設定，Then 不自動採用15站或全隊通過；非法門檻與站號遭拒絕。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 規格衝突，When 細化或實作，Then 北極星優先並記錄差異，不將既有程式自動升格為需求
- Given 未估算或缺Google環境票，When 做DoR，Then 明列缺項並保留未就緒狀態，不虛填執行者
- Given 未核定，When 啟動功能，Then 不把15站、活動日期或全隊名冊自動當成已核准規則

## TKT-003｜審查追溯與DoR門檻

- 父層：E01 → S01 → TSK-01B
- 需求／來源：PR-01, PR-02, FR-42；NORTH_STAR.md §0；NORTH_STAR.md §12 Phase 0；NORTH_STAR.md §0 第7項；NORTH_STAR.md §12；NORTH_STAR.md §4.2；NORTH_STAR.md §13
- 目標：規格與政策基線；本票交付：逐項檢查來源、AC、相依與缺項，不代替PO核准
- 做：逐項檢查來源、AC、相依與缺項，不代替PO核准
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001, TKT-002
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：逐項檢查來源、AC、相依與缺項，不代替PO核准；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦尚待核定：活動日期／人數／門檻／必修站／實到政策；未提供04票卡正式schema，本文識別碼為本專案提案
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-003/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 任一票，When 跑追溯／DoR檢查，Then 可定位有效需求與父Task；缺估算／環境不可標READY，缺證據不可標DONE。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 規格衝突，When 細化或實作，Then 北極星優先並記錄差異，不將既有程式自動升格為需求
- Given 未估算或缺Google環境票，When 做DoR，Then 明列缺項並保留未就緒狀態，不虛填執行者
- Given 未核定，When 啟動功能，Then 不把15站、活動日期或全隊名冊自動當成已核准規則

## TKT-004｜建立資料契約與schema版本

- 父層：E01 → S02 → TSK-02A
- 需求／來源：FR-37, NFR-08；NORTH_STAR.md §8；NORTH_STAR.md §12；NORTH_STAR.md §7；NORTH_STAR.md §8.8
- 目標：資料表與30站安全遷移；本票交付：七核心表、必要擴充表、型別、主外鍵與schema驗證
- 做：七核心表、必要擴充表、型別、主外鍵與schema驗證
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001, TKT-002
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：七核心表、必要擴充表、型別、主外鍵與schema驗證；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；legacy-v2程式未提供，僅可採安全新表方案；真實測試Google試算表未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-004/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given schema錯欄、重複PK、斷裂FK或錯型別測試集，When 驗證，Then 分別指出錯誤，不默默轉型或刪列。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given setup重跑，When 驗證，Then 不重複S01–S30、不覆寫既有章；不相容schema拒絕並列缺項
- Given schema不符或seed重跑，When 遷移，Then 不破壞既有正式資料並留下錯誤證據

## TKT-005｜實作安全建表與30站seed

- 父層：E01 → S02 → TSK-02A
- 需求／來源：FR-37, NFR-08；NORTH_STAR.md §8；NORTH_STAR.md §12；NORTH_STAR.md §7；NORTH_STAR.md §8.8
- 目標：資料表與30站安全遷移；本票交付：重跑不覆寫、S01–S30完整性、F1–B3 mapping與來源雜湊
- 做：重跑不覆寫、S01–S30完整性、F1–B3 mapping與來源雜湊
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：重跑不覆寫、S01–S30完整性、F1–B3 mapping與來源雜湊；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；legacy-v2程式未提供，僅可採安全新表方案；真實測試Google試算表未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-005/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 空測試表，When setup連跑兩次，Then 恰30個唯一站ID、六區各五站，既有人員／章不變，初始CLOSED／PENDING／未知排隊。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given setup重跑，When 驗證，Then 不重複S01–S30、不覆寫既有章；不相容schema拒絕並列缺項
- Given schema不符或seed重跑，When 遷移，Then 不破壞既有正式資料並留下錯誤證據

## TKT-006｜驗證遷移重跑及舊資料隔離

- 父層：E01 → S02 → TSK-02B
- 需求／來源：FR-37, NFR-08；NORTH_STAR.md §8；NORTH_STAR.md §12；NORTH_STAR.md §7；NORTH_STAR.md §8.8
- 目標：資料表與30站安全遷移；本票交付：欄位不符拒絕、重跑不重複、示範PIN／成績不匯入
- 做：欄位不符拒絕、重跑不重複、示範PIN／成績不匯入
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-005
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：欄位不符拒絕、重跑不重複、示範PIN／成績不匯入；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；legacy-v2程式未提供，僅可採安全新表方案；真實測試Google試算表未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-006/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 含明碼PIN與示範成績的舊檔，When 嘗試遷入，Then 不帶入正式憑證或成績；不相容表頭停止且原資料完整。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given setup重跑，When 驗證，Then 不重複S01–S30、不覆寫既有章；不相容schema拒絕並列缺項
- Given schema不符或seed重跑，When 遷移，Then 不破壞既有正式資料並留下錯誤證據

## TKT-007｜定義Forms欄位映射與去重鍵

- 父層：E02 → S03 → TSK-03A
- 需求／來源：FR-01, FR-02, FR-04；NORTH_STAR.md §7；NORTH_STAR.md §9.2；NORTH_STAR.md §8.1；NORTH_STAR.md §6.D
- 目標：表單報名與實際報到；本票交付：核准Form ID、item ID映射、response ID及資料驗證
- 做：核准Form ID、item ID映射、response ID及資料驗證
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：核准Form ID、item ID映射、response ID及資料驗證；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；核准Form ID／item ID mapping／trigger持有人未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-007/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 核准Form與題目item IDs，When 變更題目標題或缺必要映射，Then 以穩定item ID辨識；缺欄拒絕，response ID為去重鍵。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 非配置表單事件，When 觸發匯入，Then 拒絕寫入；配置表單有效回覆則可建立名冊
- Given 同一 response ID 重送，When 再匯入，Then 不新增第二名參加者且可追溯原結果
- Given 同人重複報到，When 重送，Then 不重複計算 uniqueCheckedInParticipants

## TKT-008｜串接報名trigger與報到命令

- 父層：E02 → S03 → TSK-03A
- 需求／來源：FR-01, FR-02, FR-04；NORTH_STAR.md §7；NORTH_STAR.md §9.2；NORTH_STAR.md §8.1；NORTH_STAR.md §6.D
- 目標：表單報名與實際報到；本票交付：有效回覆建檔、重送安全、實際報到獨立記錄
- 做：有效回覆建檔、重送安全、實際報到獨立記錄
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-005, TKT-007, TKT-010, TKT-016, TKT-039, TKT-040
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：有效回覆建檔、重送安全、實際報到獨立記錄；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；核准Form ID／item ID mapping／trigger持有人未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-008/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 有效表單回覆與同人兩次報到，When 匯入／報到，Then 名冊只一人、報到不重複；報名不自動算已報到。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 非配置表單事件，When 觸發匯入，Then 拒絕寫入；配置表單有效回覆則可建立名冊
- Given 同一 response ID 重送，When 再匯入，Then 不新增第二名參加者且可追溯原結果
- Given 同人重複報到，When 重送，Then 不重複計算 uniqueCheckedInParticipants

## TKT-009｜執行Forms與重送整合驗證

- 父層：E02 → S03 → TSK-03B
- 需求／來源：FR-01, FR-02, FR-04；NORTH_STAR.md §7；NORTH_STAR.md §9.2；NORTH_STAR.md §8.1；NORTH_STAR.md §6.D
- 目標：表單報名與實際報到；本票交付：錯表單、缺欄、同名異人、response重送與報到去重
- 做：錯表單、缺欄、同名異人、response重送與報到去重
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-008
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：錯表單、缺欄、同名異人、response重送與報到去重；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；核准Form ID／item ID mapping／trigger持有人未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-009/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 真Google測試Form，When 送有效／缺欄／重送／錯Form事件，Then 保存真Sheet結果與對應拒絕證據，不能以事件替身代替。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 非配置表單事件，When 觸發匯入，Then 拒絕寫入；配置表單有效回覆則可建立名冊
- Given 同一 response ID 重送，When 再匯入，Then 不新增第二名參加者且可追溯原結果
- Given 同人重複報到，When 重送，Then 不重複計算 uniqueCheckedInParticipants

## TKT-010｜建立小隊資格與成員關聯

- 父層：E02 → S04 → TSK-04A
- 需求／來源：FR-03, FR-41；NORTH_STAR.md §4.1；NORTH_STAR.md §8.2；NORTH_STAR.md §3
- 目標：小隊名冊與隊長實到草稿；本票交付：隊伍ID、上下限、成員關係、隊長授權及成員異動規則
- 做：隊伍ID、上下限、成員關係、隊長授權及成員異動規則
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：隊伍ID、上下限、成員關係、隊長授權及成員異動規則；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；小隊資格、隊長指定及異動政策待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-010/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 7／8／10／11人的隊伍，When 做資格檢查，Then 8與10符合預設，7／11拒絕核章；所有成員仍有獨立ID。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 小隊超過核准上限，When 加入成員或核章，Then 拒絕並提示；個人成績不合併為隊伍單筆
- Given 小隊長送草稿，When 提交，Then 無PASS產生；其他隊伍不可被指定，關主仍需二次確認

## TKT-011｜實作隊長草稿與關主確認交接

- 父層：E02 → S04 → TSK-04A
- 需求／來源：FR-03, FR-41；NORTH_STAR.md §4.1；NORTH_STAR.md §8.2；NORTH_STAR.md §3
- 目標：小隊名冊與隊長實到草稿；本票交付：僅同隊候選名單，不產生有效章，關主重新核對實到
- 做：僅同隊候選名單，不產生有效章，關主重新核對實到
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-010, TKT-014, TKT-016, TKT-039, TKT-040
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：僅同隊候選名單，不產生有效章，關主重新核對實到；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；小隊資格、隊長指定及異動政策待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-011/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 受權隊長的有效session，When 送同隊候選名單，Then 只建立有站點／到期的草稿、不產生PASS；跨隊或非隊長拒絕。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 小隊超過核准上限，When 加入成員或核章，Then 拒絕並提示；個人成績不合併為隊伍單筆
- Given 小隊長送草稿，When 提交，Then 無PASS產生；其他隊伍不可被指定，關主仍需二次確認

## TKT-012｜驗證隊伍邊界與草稿越權

- 父層：E02 → S04 → TSK-04B
- 需求／來源：FR-03, FR-41；NORTH_STAR.md §4.1；NORTH_STAR.md §8.2；NORTH_STAR.md §3
- 目標：小隊名冊與隊長實到草稿；本票交付：7／8／10／11人、跨隊草稿、缺席、草稿無PASS
- 做：7／8／10／11人、跨隊草稿、缺席、草稿無PASS
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-010, TKT-011
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：7／8／10／11人、跨隊草稿、缺席、草稿無PASS；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；小隊資格、隊長指定及異動政策待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-012/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 草稿及當場實到不同，When 關主核章，Then 不自動採用草稿替缺席者蓋章，須重新確認實到快照。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 小隊超過核准上限，When 加入成員或核章，Then 拒絕並提示；個人成績不合併為隊伍單筆
- Given 小隊長送草稿，When 提交，Then 無PASS產生；其他隊伍不可被指定，關主仍需二次確認

## TKT-013｜實作高熵QR與受控發行

- 父層：E03 → S05 → TSK-05A
- 需求／來源：FR-05, FR-06, FR-07, NFR-02；NORTH_STAR.md §3.1；NORTH_STAR.md §8.1；NORTH_STAR.md §6.A；NORTH_STAR.md §10
- 目標：個人QR與工作階段；本票交付：不可猜token、僅存hash、私密交付、發行命令冪等
- 做：不可猜token、僅存hash、私密交付、發行命令冪等
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004, TKT-005, TKT-016, TKT-039, TKT-040
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：不可猜token、僅存hash、私密交付、發行命令冪等；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；QR私密發放／遺失核身與保留政策待確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-013/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 管理員發行QR，When 檢查資料表／Requests／稽核，Then 無token原文；非管理員發行被拒，重送不多次輪替。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 授權發行，When 建立QR，Then QR不包含電話／健康資訊，且公開API及資料表無token原文
- Given A的有效session，When 攜帶B的公開編號要求進度，Then 不回傳B的資料；失效session拒絕
- Given 舊碼已重發，When 用舊碼或舊session查詢，Then 拒絕；新碼可登入
- Given QR或PIN輪替，When 舊session／解鎖重用，Then 無權繼續；來源碼／console／localStorage無秘密

## TKT-014｜實作本人session與撤銷重發

- 父層：E03 → S05 → TSK-05A
- 需求／來源：FR-05, FR-06, FR-07, NFR-02；NORTH_STAR.md §3.1；NORTH_STAR.md §8.1；NORTH_STAR.md §6.A；NORTH_STAR.md §10
- 目標：個人QR與工作階段；本票交付：短效session、本人投影、輪替舊碼及session失效
- 做：短效session、本人投影、輪替舊碼及session失效
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-013
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：短效session、本人投影、輪替舊碼及session失效；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；QR私密發放／遺失核身與保留政策待確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-014/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given A的session及B的公開編號，When 查進度，Then 只可見A；QR重發後舊碼／舊session失效，新碼可登入。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 授權發行，When 建立QR，Then QR不包含電話／健康資訊，且公開API及資料表無token原文
- Given A的有效session，When 攜帶B的公開編號要求進度，Then 不回傳B的資料；失效session拒絕
- Given 舊碼已重發，When 用舊碼或舊session查詢，Then 拒絕；新碼可登入
- Given QR或PIN輪替，When 舊session／解鎖重用，Then 無權繼續；來源碼／console／localStorage無秘密

## TKT-015｜驗證QR生命週期及來源碼隱私

- 父層：E03 → S05 → TSK-05B
- 需求／來源：FR-05, FR-06, FR-07, NFR-02；NORTH_STAR.md §3.1；NORTH_STAR.md §8.1；NORTH_STAR.md §6.A；NORTH_STAR.md §10
- 目標：個人QR與工作階段；本票交付：本人隔離、失效、重發、回應遺失、無token落盤
- 做：本人隔離、失效、重發、回應遺失、無token落盤
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-014
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：本人隔離、失效、重發、回應遺失、無token落盤；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；QR私密發放／遺失核身與保留政策待確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-015/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given token到期、登出、重發及回應遺失案例，When 逐一驗證，Then 機密不在URL／console／localStorage，舊憑證不可再用。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 授權發行，When 建立QR，Then QR不包含電話／健康資訊，且公開API及資料表無token原文
- Given A的有效session，When 攜帶B的公開編號要求進度，Then 不回傳B的資料；失效session拒絕
- Given 舊碼已重發，When 用舊碼或舊session查詢，Then 拒絕；新碼可登入
- Given QR或PIN輪替，When 舊session／解鎖重用，Then 無權繼續；來源碼／console／localStorage無秘密

## TKT-016｜驗證Google身分與白名單範圍

- 父層：E03 → S06 → TSK-06A
- 需求／來源：FR-16, FR-17, FR-18, NFR-03；NORTH_STAR.md §3；NORTH_STAR.md §7；NORTH_STAR.md §9
- 目標：工作人員授權與本站解鎖；本票交付：可信email、角色、站點／分區、空身分拒絕的PoC
- 做：可信email、角色、站點／分區、空身分拒絕的PoC
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-005
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：可信email、角色、站點／分區、空身分拒絕的PoC；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦Workspace、staff帳號及Google email可用性PoC未完成
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-016/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 授權／非白名單／空Google身分，When 呼叫管理API，Then 分別依真Google身分授權或拒絕，前端email／role無效。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 前端偽造role/email，When 呼叫管理或核章，Then 不取得權限；Google身分為空須UNAUTHORIZED
- Given PIN錯誤超過限制，When 再嘗試，Then 限速；換碼後舊解鎖失效，公開端不含PIN或hash
- Given S01關主要求S02核章，When 送出，Then FORBIDDEN且不寫章，留下不含秘密的拒絕證據
- Given 停權人員仍持舊解鎖，When 下一請求，Then 拒絕；前端改Tab不得取得資料

## TKT-017｜實作PIN限速與解鎖生命週期

- 父層：E03 → S06 → TSK-06A
- 需求／來源：FR-16, FR-17, FR-18, NFR-03；NORTH_STAR.md §3；NORTH_STAR.md §7；NORTH_STAR.md §9
- 目標：工作人員授權與本站解鎖；本票交付：hash、限次鎖定、到期、換碼／停權失效與稽核
- 做：hash、限次鎖定、到期、換碼／停權失效與稽核
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-016
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：hash、限次鎖定、到期、換碼／停權失效與稽核；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦Workspace、staff帳號及Google email可用性PoC未完成
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-017/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 同帳號本站連錯PIN，When 達設定上限，Then 鎖定至期限；換碼、解鎖到期或credential版本更新立即失效。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 前端偽造role/email，When 呼叫管理或核章，Then 不取得權限；Google身分為空須UNAUTHORIZED
- Given PIN錯誤超過限制，When 再嘗試，Then 限速；換碼後舊解鎖失效，公開端不含PIN或hash
- Given S01關主要求S02核章，When 送出，Then FORBIDDEN且不寫章，留下不含秘密的拒絕證據
- Given 停權人員仍持舊解鎖，When 下一請求，Then 拒絕；前端改Tab不得取得資料

## TKT-018｜驗證越權、偽造及共用裝置

- 父層：E03 → S06 → TSK-06B
- 需求／來源：FR-16, FR-17, FR-18, NFR-03；NORTH_STAR.md §3；NORTH_STAR.md §7；NORTH_STAR.md §9
- 目標：工作人員授權與本站解鎖；本票交付：未登入、跨站、前端偽造role、停權、登出流程
- 做：未登入、跨站、前端偽造role、停權、登出流程
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-016, TKT-017
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：未登入、跨站、前端偽造role、停權、登出流程；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦Workspace、staff帳號及Google email可用性PoC未完成
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-018/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given S01關主、停權關主及偽造角色，When 嘗試核S02或查管理資料，Then 拒絕且無章；審計不得含原PIN／token。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 前端偽造role/email，When 呼叫管理或核章，Then 不取得權限；Google身分為空須UNAUTHORIZED
- Given PIN錯誤超過限制，When 再嘗試，Then 限速；換碼後舊解鎖失效，公開端不含PIN或hash
- Given S01關主要求S02核章，When 送出，Then FORBIDDEN且不寫章，留下不含秘密的拒絕證據
- Given 停權人員仍持舊解鎖，When 下一請求，Then 拒絕；前端改Tab不得取得資料

## TKT-019｜串接本人進度、徽章與政策

- 父層：E04 → S07 → TSK-07A
- 需求／來源：FR-08, FR-09, FR-10, NFR-01；NORTH_STAR.md §6.A；NORTH_STAR.md §3；NORTH_STAR.md §4.2；NORTH_STAR.md §1.1；NORTH_STAR.md §11
- 目標：本人通行證與榮譽摘要；本票交付：有效章、n/30、六區徽章、榮譽／必修站衍生值
- 做：有效章、n/30、六區徽章、榮譽／必修站衍生值
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-014
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：有效章、n/30、六區徽章、榮譽／必修站衍生值；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機／強光UAT環境未提供
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-019/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 核章與撤銷的已知真值集，When getMyProgress，Then 徽章／站數與有效章一致；門檻null不授榮譽，必修缺站不授榮譽。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 本人完成一站，When 同步成功，Then 護照只增加該人的有效站數；失敗時保留舊資料並標示
- Given 一般隊員，When 查同隊摘要，Then 回傳必要編號／進度，不回傳其他姓名、聯絡人、token或PIN
- Given honor_threshold未核定，When 顯示成就，Then 明示待核定且不授予；核定後依有效章及必修站判定
- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證

## TKT-020｜完成QR與同隊最少摘要介面

- 父層：E04 → S07 → TSK-07A
- 需求／來源：FR-08, FR-09, FR-10, NFR-01；NORTH_STAR.md §6.A；NORTH_STAR.md §3；NORTH_STAR.md §4.2；NORTH_STAR.md §1.1；NORTH_STAR.md §11
- 目標：本人通行證與榮譽摘要；本票交付：本人QR canvas、有限識別、同隊進度、同步及登入狀態
- 做：本人QR canvas、有限識別、同隊進度、同步及登入狀態
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-019, TKT-065
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：本人QR canvas、有限識別、同隊進度、同步及登入狀態；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機／強光UAT環境未提供
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-020/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 本人登入，When 顯示護照，Then QR可離線編碼、本人成績可見，同隊只顯必要摘要；離開發行畫面清除QR內容。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 本人完成一站，When 同步成功，Then 護照只增加該人的有效站數；失敗時保留舊資料並標示
- Given 一般隊員，When 查同隊摘要，Then 回傳必要編號／進度，不回傳其他姓名、聯絡人、token或PIN
- Given honor_threshold未核定，When 顯示成就，Then 明示待核定且不授予；核定後依有效章及必修站判定
- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證

## TKT-021｜驗證手機可用性與本人資料界線

- 父層：E04 → S07 → TSK-07B
- 需求／來源：FR-08, FR-09, FR-10, NFR-01；NORTH_STAR.md §6.A；NORTH_STAR.md §3；NORTH_STAR.md §4.2；NORTH_STAR.md §1.1；NORTH_STAR.md §11
- 目標：本人通行證與榮譽摘要；本票交付：390px、48px、鍵盤、失效／離線／同隊隱私
- 做：390px、48px、鍵盤、失效／離線／同隊隱私
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-020
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：390px、48px、鍵盤、失效／離線／同隊隱私；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機／強光UAT環境未提供
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-021/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 390px真手機及鍵盤，When 操作護照，Then 主要觸控≥48px、狀態有文字、強光可讀；未測裝置不標通過。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 本人完成一站，When 同步成功，Then 護照只增加該人的有效站數；失敗時保留舊資料並標示
- Given 一般隊員，When 查同隊摘要，Then 回傳必要編號／進度，不回傳其他姓名、聯絡人、token或PIN
- Given honor_threshold未核定，When 顯示成就，Then 明示待核定且不授予；核定後依有效章及必修站判定
- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證

## TKT-022｜建立30站地圖資料投影

- 父層：E04 → S08 → TSK-08A
- 需求／來源：FR-11, FR-12, FR-15, NFR-01；NORTH_STAR.md §5；NORTH_STAR.md §6.B；NORTH_STAR.md §6.D；NORTH_STAR.md §1.1；NORTH_STAR.md §11
- 目標：六區地圖與安全分流；本票交付：完整seed、分區示意、核准標記及無虛構坐標
- 做：完整seed、分區示意、核准標記及無虛構坐標
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-005, TKT-028
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：完整seed、分區示意、核准標記及無虛構坐標；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；現勘與區域使用範圍尚待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-022/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 新版seed，When 查地圖投影，Then 恰S01–S30且分區正確，無姓名／電話／token／PIN，待現勘位置明示待核准。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 未完成現勘，When 顯示站點，Then 明示待核准及區域示意，不生成真實坐標或逃生路線
- Given 依B2篩選，When 執行搜尋，Then 只顯示S21–S25且不遺漏任何該區站
- Given 某站HIGH，When 顯示分流，Then 提醒改往資料有效且已開放站；沒有可用站則明示無可靠建議
- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證

## TKT-023｜實作搜尋、篩選與安全推薦

- 父層：E04 → S08 → TSK-08A
- 需求／來源：FR-11, FR-12, FR-15, NFR-01；NORTH_STAR.md §5；NORTH_STAR.md §6.B；NORTH_STAR.md §6.D；NORTH_STAR.md §1.1；NORTH_STAR.md §11
- 目標：六區地圖與安全分流；本票交付：站號／名稱／區域查詢、僅推薦開放且資料有效站
- 做：站號／名稱／區域查詢、僅推薦開放且資料有效站
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-022, TKT-026, TKT-029, TKT-065
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：站號／名稱／區域查詢、僅推薦開放且資料有效站；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；現勘與區域使用範圍尚待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-023/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given HIGH、STALE、PAUSED及未核准站，When 搜尋／推薦，Then 篩選正確且只推薦OPEN、已核准、資料有效的替代站；無候選明示。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 未完成現勘，When 顯示站點，Then 明示待核准及區域示意，不生成真實坐標或逃生路線
- Given 依B2篩選，When 執行搜尋，Then 只顯示S21–S25且不遺漏任何該區站
- Given 某站HIGH，When 顯示分流，Then 提醒改往資料有效且已開放站；沒有可用站則明示無可靠建議
- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證

## TKT-024｜驗證地圖完整性與安全提示

- 父層：E04 → S08 → TSK-08B
- 需求／來源：FR-11, FR-12, FR-15, NFR-01；NORTH_STAR.md §5；NORTH_STAR.md §6.B；NORTH_STAR.md §6.D；NORTH_STAR.md §1.1；NORTH_STAR.md §11
- 目標：六區地圖與安全分流；本票交付：六區各五站、非疏散圖、無可用站、紅燈分流
- 做：六區各五站、非疏散圖、無可用站、紅燈分流
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-023
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：六區各五站、非疏散圖、無可用站、紅燈分流；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；現勘與區域使用範圍尚待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-024/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 六區資料，When 逐區篩選與查S03，Then 每區5站且S03唯一；圖上有非官方疏散圖警語、無虛構坐標／距離。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 未完成現勘，When 顯示站點，Then 明示待核准及區域示意，不生成真實坐標或逃生路線
- Given 依B2篩選，When 執行搜尋，Then 只顯示S21–S25且不遺漏任何該區站
- Given 某站HIGH，When 顯示分流，Then 提醒改往資料有效且已開放站；沒有可用站則明示無可靠建議
- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證

## TKT-025｜實作本站排隊回報契約

- 父層：E05 → S09 → TSK-09A
- 需求／來源：FR-13, FR-14, FR-28；NORTH_STAR.md §4.3；NORTH_STAR.md §6.B；NORTH_STAR.md §9.2
- 目標：人隊排隊與等待估算；本票交付：個人／隊數分欄、非負整數、更新者／時間及權限
- 做：個人／隊數分欄、非負整數、更新者／時間及權限
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-016, TKT-017, TKT-029, TKT-039, TKT-040
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：個人／隊數分欄、非負整數、更新者／時間及權限；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；各站實測耗時／服務線數與燈號設定待主辦確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-025/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 本站與別站關主，When 更新個人／小隊排隊，Then 本站成功並記人／時，跨站、負值及小數拒絕。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 開站但排隊資料超過設定期限，When 查站況，Then 顯示STALE而非LOW，附更新時間
- Given 6隊、每隊5分鐘、2線，When 計算，Then 預估15分鐘；任一必要值缺失不得硬算0
- Given 負值或非整數，When 更新，Then 拒絕；有效值成功後公開板及戰情中心一致

## TKT-026｜統一等待與過期燈號計算

- 父層：E05 → S09 → TSK-09A
- 需求／來源：FR-13, FR-14, FR-28；NORTH_STAR.md §4.3；NORTH_STAR.md §6.B；NORTH_STAR.md §9.2
- 目標：人隊排隊與等待估算；本票交付：人隊耗時／線數公式、缺值未知、暫停／過期優先
- 做：人隊耗時／線數公式、缺值未知、暫停／過期優先
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-025
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：人隊耗時／線數公式、缺值未知、暫停／過期優先；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；各站實測耗時／服務線數與燈號設定待主辦確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-026/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 6隊×5分鐘÷2線，When 計算，Then 15分鐘；必要值缺失為未知，暫停優先UNAVAILABLE、逾期優先STALE。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 開站但排隊資料超過設定期限，When 查站況，Then 顯示STALE而非LOW，附更新時間
- Given 6隊、每隊5分鐘、2線，When 計算，Then 預估15分鐘；任一必要值缺失不得硬算0
- Given 負值或非整數，When 更新，Then 拒絕；有效值成功後公開板及戰情中心一致

## TKT-027｜驗證容量、未知及分流門檻

- 父層：E05 → S09 → TSK-09B
- 需求／來源：FR-13, FR-14, FR-28；NORTH_STAR.md §4.3；NORTH_STAR.md §6.B；NORTH_STAR.md §9.2
- 目標：人隊排隊與等待估算；本票交付：5／10分鐘邊界、線數零／缺值、S29舊燈號不沿用
- 做：5／10分鐘邊界、線數零／缺值、S29舊燈號不沿用
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-026
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：5／10分鐘邊界、線數零／缺值、S29舊燈號不沿用；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；各站實測耗時／服務線數與燈號設定待主辦確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-027/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 等候5、6、10、11分鐘及線數0／null，When 判級，Then LOW、MEDIUM、MEDIUM、HIGH及未知，不能沿用舊S29錯燈號。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 開站但排隊資料超過設定期限，When 查站況，Then 顯示STALE而非LOW，附更新時間
- Given 6隊、每隊5分鐘、2線，When 計算，Then 預估15分鐘；任一必要值缺失不得硬算0
- Given 負值或非整數，When 更新，Then 拒絕；有效值成功後公開板及戰情中心一致

## TKT-028｜核對30站名稱與場地配置

- 父層：E05 → S10 → TSK-10A
- 需求／來源：FR-29, FR-42；NORTH_STAR.md §5；NORTH_STAR.md §8.3；NORTH_STAR.md §4.2；NORTH_STAR.md §13
- 目標：場地核准與站點設定；本票交付：新版與舊CSV／Stitch逐站差異、現勘／雨備待填
- 做：新版與舊CSV／Stitch逐站差異、現勘／雨備待填
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：新版與舊CSV／Stitch逐站差異、現勘／雨備待填；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；現勘核准點位、分齡任務、可及性與雨備說明未齊
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-028/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 新seed與舊CSV／Stitch，When 對照，Then 30站皆有新舊名稱及場域差異，F1–B3來源清楚且位置仍待現勘。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 未核准場地或服務線數未知，When 嘗試開站，Then 拒絕並提示缺項；變更可追溯
- Given 未核定，When 啟動功能，Then 不把15站、活動日期或全隊名冊自動當成已核准規則

## TKT-029｜實作站點維護與開關站

- 父層：E05 → S10 → TSK-10A
- 需求／來源：FR-29, FR-42；NORTH_STAR.md §5；NORTH_STAR.md §8.3；NORTH_STAR.md §4.2；NORTH_STAR.md §13
- 目標：場地核准與站點設定；本票交付：站名、位置、分齡、可及性、雨備、耗時、線數及理由
- 做：站名、位置、分齡、可及性、雨備、耗時、線數及理由
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-005, TKT-016, TKT-039, TKT-040
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：站名、位置、分齡、可及性、雨備、耗時、線數及理由；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；現勘核准點位、分齡任務、可及性與雨備說明未齊
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-029/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 授權管理員，When 修改分齡／雨備／位置／線數並開站，Then 設定可讀且有稽核；缺核准／線數不得OPEN。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 未核准場地或服務線數未知，When 嘗試開站，Then 拒絕並提示缺項；變更可追溯
- Given 未核定，When 啟動功能，Then 不把15站、活動日期或全隊名冊自動當成已核准規則

## TKT-030｜驗證未核准場地不得開站

- 父層：E05 → S10 → TSK-10B
- 需求／來源：FR-29, FR-42；NORTH_STAR.md §5；NORTH_STAR.md §8.3；NORTH_STAR.md §4.2；NORTH_STAR.md §13
- 目標：場地核准與站點設定；本票交付：缺線數／場地／授權拒絕，設定變更可追溯
- 做：缺線數／場地／授權拒絕，設定變更可追溯
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-029
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：缺線數／場地／授權拒絕，設定變更可追溯；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；現勘核准點位、分齡任務、可及性與雨備說明未齊
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-030/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 未核准場地、空耗時或無權帳號，When 開站／維護，Then 明確拒絕且不意外開站，失敗證據可重現。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 未核准場地或服務線數未知，When 嘗試開站，Then 拒絕並提示缺項；變更可追溯
- Given 未核定，When 啟動功能，Then 不把15站、活動日期或全隊名冊自動當成已核准規則

## TKT-031｜串接掃碼／手動查驗與最少投影

- 父層：E06 → S11 → TSK-11A
- 需求／來源：FR-19, FR-20, FR-21, FR-24；NORTH_STAR.md §6.C；NORTH_STAR.md §9.2；NORTH_STAR.md §10
- 目標：關主查驗與個人核章；本票交付：相機權限、手動核身、查無／已完成／資格提示
- 做：相機權限、手動核身、查無／已完成／資格提示
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-014, TKT-016, TKT-017, TKT-029, TKT-065
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：相機權限、手動核身、查無／已完成／資格提示；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機相機／GAS iframe授權未驗證
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-031/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 相機授權成功／拒絕／不支援，When 掃碼，Then 成功只到預覽不自動核章；手動編號須額外核身且只回必要資料。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相機拒絕或瀏覽器不支援，When 開掃描，Then 提供可理解錯誤及手動身分核對流程
- Given 未確認本人，When 以公開編號查詢／核章，Then 拒絕；授權核對後僅回必要識別與本站狀態
- Given 本人首次合法通過S03，When 伺服器確認，Then 增一筆有效PASS；同站重複回ALREADY_STAMPED
- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕

## TKT-032｜實作個人核章驗證與確認契約

- 父層：E06 → S11 → TSK-11A
- 需求／來源：FR-19, FR-20, FR-21, FR-24；NORTH_STAR.md §6.C；NORTH_STAR.md §9.2；NORTH_STAR.md §10
- 目標：關主查驗與個人核章；本票交付：本站開放、有效參加者、提交防連點與伺服器確認
- 做：服務端核章驗證、確認參數、唯一有效章及錯誤回應；畫面二次確認由TKT-033驗證
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-014, TKT-016, TKT-017, TKT-029, TKT-039, TKT-040
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：本站開放、有效參加者、提交防連點與伺服器確認；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機相機／GAS iframe授權未驗證
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-032/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 首次、重複、關站、無資格與跨站請求，When approveIndividualStamp，Then 只有首次合法者增一PASS，其餘拒絕且不變更成果。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相機拒絕或瀏覽器不支援，When 開掃描，Then 提供可理解錯誤及手動身分核對流程
- Given 未確認本人，When 以公開編號查詢／核章，Then 拒絕；授權核對後僅回必要識別與本站狀態
- Given 本人首次合法通過S03，When 伺服器確認，Then 增一筆有效PASS；同站重複回ALREADY_STAMPED
- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕

## TKT-033｜驗證個人閉環與相機降級

- 父層：E06 → S11 → TSK-11B
- 需求／來源：FR-19, FR-20, FR-21, FR-24；NORTH_STAR.md §6.C；NORTH_STAR.md §9.2；NORTH_STAR.md §10
- 目標：關主查驗與個人核章；本票交付：首次／重複／未核身／跨站、相機拒絕與手動備援
- 做：首次／重複／未核身／跨站、相機拒絕與手動備援；含畫面二次確認與提交防連點
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-031, TKT-032
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：首次／重複／未核身／跨站、相機拒絕與手動備援；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機相機／GAS iframe授權未驗證
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-033/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 關主查到本人，When 未二次確認／連點／相機不可用，Then 不產生未授權章，提交中禁連點且可走手動核身閉環。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相機拒絕或瀏覽器不支援，When 開掃描，Then 提供可理解錯誤及手動身分核對流程
- Given 未確認本人，When 以公開編號查詢／核章，Then 拒絕；授權核對後僅回必要識別與本站狀態
- Given 本人首次合法通過S03，When 伺服器確認，Then 增一筆有效PASS；同站重複回ALREADY_STAMPED
- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕

## TKT-034｜實作實到與缺席核准快照

- 父層：E06 → S12 → TSK-12A
- 需求／來源：FR-22, FR-23；NORTH_STAR.md §4.1；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D
- 目標：小隊實到核章與隊站統計；本票交付：不預勾全隊、只允許合法同隊成員，保留缺席ID
- 做：不預勾全隊、只允許合法同隊成員，保留缺席ID
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-010, TKT-011, TKT-029, TKT-016
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：不預勾全隊、只允許合法同隊成員，保留缺席ID；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；實到通過政策與缺席規則尚待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-034/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 8人隊其中1人缺席，When 核准實到快照，Then 存7人實到／1人缺席，ID不可重複／跨隊，初始不預勾全隊。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊其中1人缺席，When 其餘7人核章，Then 缺席者無章，批次保存實到及缺席快照
- Given 已核准實到快照的所有成員有效通過，When 聚合，Then 隊站次+1；任一有效章撤銷須重算

## TKT-035｜提交逐人核章與同批關聯

- 父層：E06 → S12 → TSK-12A
- 需求／來源：FR-22, FR-23；NORTH_STAR.md §4.1；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D
- 目標：小隊實到核章與隊站統計；本票交付：實到N人各一PASS、batch_id、政策快照與提交狀態
- 做：實到N人各一PASS、batch_id、政策快照與提交狀態
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-034, TKT-039, TKT-040
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：實到N人各一PASS、batch_id、政策快照與提交狀態；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；實到通過政策與缺席規則尚待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-035/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 核准N名實到者，When 原子提交，Then 同批N筆個人PASS、批次／Requests／稽核齊備；缺席者零章。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊其中1人缺席，When 其餘7人核章，Then 缺席者無章，批次保存實到及缺席快照
- Given 已核准實到快照的所有成員有效通過，When 聚合，Then 隊站次+1；任一有效章撤銷須重算

## TKT-036｜完成小隊預覽與二次確認UI

- 父層：E06 → S12 → TSK-12B
- 需求／來源：FR-22, FR-23；NORTH_STAR.md §4.1；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D
- 目標：小隊實到核章與隊站統計；本票交付：清楚列出此次實到／缺席與人數，成功前不加章
- 做：清楚列出此次實到／缺席與人數，成功前不加章
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-031, TKT-035
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：清楚列出此次實到／缺席與人數，成功前不加章；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；實到通過政策與缺席規則尚待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-036/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 實到候選，When 確認前預覽，Then 明列人數及各ID、缺席不勾選；只有二次確認後可提交且未知結果不顯成功。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊其中1人缺席，When 其餘7人核章，Then 缺席者無章，批次保存實到及缺席快照
- Given 已核准實到快照的所有成員有效通過，When 聚合，Then 隊站次+1；任一有效章撤銷須重算

## TKT-037｜驗證缺席、重複與隊員異動

- 父層：E06 → S12 → TSK-12B
- 需求／來源：FR-22, FR-23；NORTH_STAR.md §4.1；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D
- 目標：小隊實到核章與隊站統計；本票交付：缺席不章、重複成員／跨隊拒絕、異動不污染快照
- 做：缺席不章、重複成員／跨隊拒絕、異動不污染快照
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-034, TKT-035
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：缺席不章、重複成員／跨隊拒絕、異動不污染快照；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；實到通過政策與缺席規則尚待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-037/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 重複成員、其他隊員、無效成員及名冊異動，When 核章，Then 非法名單整批拒絕，舊快照不被後續異動改寫。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊其中1人缺席，When 其餘7人核章，Then 缺席者無章，批次保存實到及缺席快照
- Given 已核准實到快照的所有成員有效通過，When 聚合，Then 隊站次+1；任一有效章撤銷須重算

## TKT-038｜驗證完成隊數與撤銷重算

- 父層：E06 → S12 → TSK-12B
- 需求／來源：FR-22, FR-23；NORTH_STAR.md §4.1；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D
- 目標：小隊實到核章與隊站統計；本票交付：八人站次+8且隊站次+1，同隊同站不重複計隊
- 做：八人站次+8且隊站次+1，同隊同站不重複計隊
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-035, TKT-045
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：八人站次+8且隊站次+1，同隊同站不重複計隊；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；實到通過政策與缺席規則尚待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-038/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 8人成批通過後撤銷其中1章，When 聚合，Then 先隊員站次+8／隊站次+1，撤銷後按原快照重算，隊數不重複。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊其中1人缺席，When 其餘7人核章，Then 缺席者無章，批次保存實到及缺席快照
- Given 已核准實到快照的所有成員有效通過，When 聚合，Then 隊站次+1；任一有效章撤銷須重算

## TKT-039｜建立冪等鍵與請求結果帳本

- 父層：E07 → S13 → TSK-13A
- 需求／來源：FR-24, FR-25, FR-26, NFR-04；NORTH_STAR.md §9.2；NORTH_STAR.md §10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.3；NORTH_STAR.md §1.2
- 目標：冪等、並行與批次復原；本票交付：鍵／actor／內容綁定、衝突拒絕、原結果查回
- 做：鍵／actor／內容綁定、衝突拒絕、原結果查回
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004, TKT-016
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：鍵／actor／內容綁定、衝突拒絕、原結果查回；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真Google測試帳號、雙關主環境與故障注入窗口未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-039/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 相同鍵同actor同內容及相同鍵異內容／actor，When 重送，Then 前者回原結果、後者衝突拒絕，未保存秘密payload。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕
- Given 兩關主並發核同人同站，When 提交，Then 最多一筆有效PASS且兩方回饋可對帳
- Given 批次第5名寫入故障或API拒絕，When 查進度，Then 不公布無復原狀態的部分完成
- Given 重送／並行／回應遺失／中途故障，When 對帳，Then 有效章、Requests、批次與稽核一致

## TKT-040｜實作鎖定與原子跨表提交

- 父層：E07 → S13 → TSK-13A
- 需求／來源：FR-24, FR-25, FR-26, NFR-04；NORTH_STAR.md §9.2；NORTH_STAR.md §10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.3；NORTH_STAR.md §1.2
- 目標：冪等、並行與批次復原；本票交付：章／批次／稽核／Requests同次提交，不把Sheets當原生交易庫
- 做：章／批次／稽核／Requests同次提交，不把Sheets當原生交易庫
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-005, TKT-039
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：章／批次／稽核／Requests同次提交，不把Sheets當原生交易庫；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真Google測試帳號、雙關主環境與故障注入窗口未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-040/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 需要章／批次／稽核／Requests的操作，When 提交，Then 同一受鎖檢查與原子API邊界，任一請求無效不得部分可見。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕
- Given 兩關主並發核同人同站，When 提交，Then 最多一筆有效PASS且兩方回饋可對帳
- Given 批次第5名寫入故障或API拒絕，When 查進度，Then 不公布無復原狀態的部分完成
- Given 重送／並行／回應遺失／中途故障，When 對帳，Then 有效章、Requests、批次與稽核一致

## TKT-041｜注入批次中斷與拒絕故障

- 父層：E07 → S13 → TSK-13B
- 需求／來源：FR-24, FR-25, FR-26, NFR-04；NORTH_STAR.md §9.2；NORTH_STAR.md §10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.3；NORTH_STAR.md §1.2
- 目標：冪等、並行與批次復原；本票交付：第5員故障不公布半批；可重試／補償及對帳
- 做：第5員故障不公布半批；可重試／補償及對帳
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-035, TKT-040
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：第5員故障不公布半批；可重試／補償及對帳；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真Google測試帳號、雙關主環境與故障注入窗口未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-041/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 第5人或批次API注入失敗，When 對外讀取及重試，Then 無未追復的部分成功，失敗／重試前後證據俱在。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕
- Given 兩關主並發核同人同站，When 提交，Then 最多一筆有效PASS且兩方回饋可對帳
- Given 批次第5名寫入故障或API拒絕，When 查進度，Then 不公布無復原狀態的部分完成
- Given 重送／並行／回應遺失／中途故障，When 對帳，Then 有效章、Requests、批次與稽核一致

## TKT-042｜驗證寫成但回應遺失重送

- 父層：E07 → S13 → TSK-13B
- 需求／來源：FR-24, FR-25, FR-26, NFR-04；NORTH_STAR.md §9.2；NORTH_STAR.md §10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.3；NORTH_STAR.md §1.2
- 目標：冪等、並行與批次復原；本票交付：原鍵查回已承諾結果，不產生第二組有效章
- 做：原鍵查回已承諾結果，不產生第二組有效章
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-035, TKT-039, TKT-040
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：原鍵查回已承諾結果，不產生第二組有效章；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真Google測試帳號、雙關主環境與故障注入窗口未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-042/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 寫入成功但回應遺失，When 用原鍵重送，Then 查回原成功結果、有效章不增加；不得改鍵掩蓋未知結果。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕
- Given 兩關主並發核同人同站，When 提交，Then 最多一筆有效PASS且兩方回饋可對帳
- Given 批次第5名寫入故障或API拒絕，When 查進度，Then 不公布無復原狀態的部分完成
- Given 重送／並行／回應遺失／中途故障，When 對帳，Then 有效章、Requests、批次與稽核一致

## TKT-043｜執行真Google雙關主併發測試

- 父層：E07 → S13 → TSK-13B
- 需求／來源：FR-24, FR-25, FR-26, NFR-04；NORTH_STAR.md §9.2；NORTH_STAR.md §10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.3；NORTH_STAR.md §1.2
- 目標：冪等、並行與批次復原；本票交付：同人同站競爭、鎖逾時及全表一致性證據
- 做：同人同站競爭、鎖逾時及全表一致性證據
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-032, TKT-035, TKT-040, TKT-042
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：同人同站競爭、鎖逾時及全表一致性證據；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真Google測試帳號、雙關主環境與故障注入窗口未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-043/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 兩個真Google關主工作階段，When 同時核同人同站，Then 至多一有效PASS，附實際時間／回應／Sheet對帳及鎖等待紀錄。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 相同鍵／人／內容，When 重送，Then 不重複寫入；相同鍵不同內容或人員須拒絕
- Given 兩關主並發核同人同站，When 提交，Then 最多一筆有效PASS且兩方回饋可對帳
- Given 批次第5名寫入故障或API拒絕，When 查進度，Then 不公布無復原狀態的部分完成
- Given 重送／並行／回應遺失／中途故障，When 對帳，Then 有效章、Requests、批次與稽核一致

## TKT-044｜實作組長更正申請與權責分離

- 父層：E07 → S14 → TSK-14A
- 需求／來源：FR-27, FR-38, FR-43, NFR-10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.2；NORTH_STAR.md §1.1；NORTH_STAR.md §8.7；NORTH_STAR.md §3；NORTH_STAR.md §6.D；NORTH_STAR.md §0 第7項；NORTH_STAR.md §12
- 目標：更正申請、補償與稽核；本票交付：組長可申請、管理員核對及執行，原因與原章關聯
- 做：組長可申請、管理員核對及執行，原因與原章關聯
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-016, TKT-032
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：組長可申請、管理員核對及執行，原因與原章關聯；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；成績更正申請／核准流程與管理員責任人待指定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-044/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given EVENT_LEAD提出更正，When 送申請，Then 有申請ID／原章／理由／申請人但有效章不變；未受權角色拒絕。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 管理員撤銷一章，When 重算，Then 個人／小隊／地圖／報表一致且原PASS仍存在
- Given 更正或越權，When 查稽核，Then 能定位事件與操作者而不含token／PIN原文
- Given 組長申請，When 流轉，Then 不直接刪改核章且有申請與執行的責任追溯
- Given 任一票，When 查證據，Then 可找到基準版本、輸入、預期／實際、結果與責任人

## TKT-045｜實作不可無痕刪除的補償事件

- 父層：E07 → S14 → TSK-14A
- 需求／來源：FR-27, FR-38, FR-43, NFR-10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.2；NORTH_STAR.md §1.1；NORTH_STAR.md §8.7；NORTH_STAR.md §3；NORTH_STAR.md §6.D；NORTH_STAR.md §0 第7項；NORTH_STAR.md §12
- 目標：更正申請、補償與稽核；本票交付：REVOKED指向原PASS，衍生統計重算，稽核不記秘密
- 做：REVOKED指向原PASS，衍生統計重算，稽核不記秘密
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-032, TKT-040, TKT-044
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：REVOKED指向原PASS，衍生統計重算，稽核不記秘密；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；成績更正申請／核准流程與管理員責任人待指定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-045/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 核准更正申請，When SYSTEM_ADMIN撤銷，Then 原PASS保留、新補償指向原章並連申請，申請結案且統計重算。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 管理員撤銷一章，When 重算，Then 個人／小隊／地圖／報表一致且原PASS仍存在
- Given 更正或越權，When 查稽核，Then 能定位事件與操作者而不含token／PIN原文
- Given 組長申請，When 流轉，Then 不直接刪改核章且有申請與執行的責任追溯
- Given 任一票，When 查證據，Then 可找到基準版本、輸入、預期／實際、結果與責任人

## TKT-046｜驗證更正前後跨畫面與報表

- 父層：E07 → S14 → TSK-14B
- 需求／來源：FR-27, FR-38, FR-43, NFR-10；NORTH_STAR.md §8.4；NORTH_STAR.md §9.2；NORTH_STAR.md §1.1；NORTH_STAR.md §8.7；NORTH_STAR.md §3；NORTH_STAR.md §6.D；NORTH_STAR.md §0 第7項；NORTH_STAR.md §12
- 目標：更正申請、補償與稽核；本票交付：原紀錄保留、兩次撤銷拒絕、本人／小隊／總表一致
- 做：原紀錄保留、兩次撤銷拒絕、本人／小隊／總表一致
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-045, TKT-047, TKT-054
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：原紀錄保留、兩次撤銷拒絕、本人／小隊／總表一致；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；成績更正申請／核准流程與管理員責任人待指定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-046/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 已更正案例，When 比對A／B／D及匯出，Then 同口徑一致，第二次撤銷不可重減，附真整合證據。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 管理員撤銷一章，When 重算，Then 個人／小隊／地圖／報表一致且原PASS仍存在
- Given 更正或越權，When 查稽核，Then 能定位事件與操作者而不含token／PIN原文
- Given 組長申請，When 流轉，Then 不直接刪改核章且有申請與執行的責任追溯
- Given 任一票，When 查證據，Then 可找到基準版本、輸入、預期／實際、結果與責任人

## TKT-047｜聚合30站及六類全場KPI

- 父層：E08 → S15 → TSK-15A
- 需求／來源：FR-30, FR-35, FR-44, NFR-05；NORTH_STAR.md §6.D；NORTH_STAR.md §1.2；NORTH_STAR.md §10；NORTH_STAR.md §7；NORTH_STAR.md §12
- 目標：30站戰情與同步健康；本票交付：報到／有效隊伍／個人站次／隊員站次／隊站次／總章分開
- 做：報到／有效隊伍／個人站次／隊員站次／隊站次／總章分開
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-025, TKT-026, TKT-035, TKT-045
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：報到／有效隊伍／個人站次／隊員站次／隊站次／總章分開；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；正式參與規模及效能驗收門檻待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-047/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 1名個人與8名隊員各過1站，When 聚合，Then 個人站次1／隊員站次8／隊站次1／總章9；報到不由9推算。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊同站通過，When 顯示KPI，Then 隊員站次+8、隊站次+1，不把8當8隊或8個報到新增
- Given 連續API失敗，When 再同步，Then 不假裝即時成功，顯示過期／故障及最後同步時間
- Given API連續故障或容量保護，When 管理頁恢復，Then 可見故障時間／類別與處置提示
- Given 核定負載模型，When 壓測，Then 記錄吞吐、p95/p99、錯誤率、配額及鎖競爭，門檻需事前核定

## TKT-048｜串接戰情搜尋與20秒退避

- 父層：E08 → S15 → TSK-15A
- 需求／來源：FR-30, FR-35, FR-44, NFR-05；NORTH_STAR.md §6.D；NORTH_STAR.md §1.2；NORTH_STAR.md §10；NORTH_STAR.md §7；NORTH_STAR.md §12
- 目標：30站戰情與同步健康；本票交付：場域／狀態篩選、背景降頻、最後同步、系統故障指示
- 做：場域／狀態篩選、背景降頻、最後同步、系統故障指示
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-047, TKT-065
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：場域／狀態篩選、背景降頻、最後同步、系統故障指示；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；正式參與規模及效能驗收門檻待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-048/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 正常／連續失敗／背景頁，When 輪詢，Then 正常預設20秒、失敗退避、背景降頻，最後成功時間不被失敗刷新。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊同站通過，When 顯示KPI，Then 隊員站次+8、隊站次+1，不把8當8隊或8個報到新增
- Given 連續API失敗，When 再同步，Then 不假裝即時成功，顯示過期／故障及最後同步時間
- Given API連續故障或容量保護，When 管理頁恢復，Then 可見故障時間／類別與處置提示
- Given 核定負載模型，When 壓測，Then 記錄吞吐、p95/p99、錯誤率、配額及鎖競爭，門檻需事前核定

## TKT-049｜驗證統計口徑與核定負載

- 父層：E08 → S15 → TSK-15B
- 需求／來源：FR-30, FR-35, FR-44, NFR-05；NORTH_STAR.md §6.D；NORTH_STAR.md §1.2；NORTH_STAR.md §10；NORTH_STAR.md §7；NORTH_STAR.md §12
- 目標：30站戰情與同步健康；本票交付：人工算表、過期、連續失敗、配額與p95/p99壓測
- 做：人工算表、過期、連續失敗、配額與p95/p99壓測
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-047, TKT-048
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：人工算表、過期、連續失敗、配額與p95/p99壓測；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；正式參與規模及效能驗收門檻待核准
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-049/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 事前核准的人數／隊數／延遲及錯誤門檻，When 真Google壓測，Then 記錄p95/p99、吞吐、配額、錯誤率及鎖競爭，不以420人示例當核准負載。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 8人小隊同站通過，When 顯示KPI，Then 隊員站次+8、隊站次+1，不把8當8隊或8個報到新增
- Given 連續API失敗，When 再同步，Then 不假裝即時成功，顯示過期／故障及最後同步時間
- Given API連續故障或容量保護，When 管理頁恢復，Then 可見故障時間／類別與處置提示
- Given 核定負載模型，When 壓測，Then 記錄吞吐、p95/p99、錯誤率、配額及鎖競爭，門檻需事前核定

## TKT-050｜建立異常類型、狀態與權限

- 父層：E08 → S16 → TSK-16A
- 需求／來源：FR-31, FR-32, FR-33；NORTH_STAR.md §8.5；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D；NORTH_STAR.md §6.B
- 目標：異常派工與公開安全公告；本票交付：人潮／物資／醫療等類型，PENDING至結案，本站／分區限制
- 做：人潮／物資／醫療等類型，PENDING至結案，本站／分區限制
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-016, TKT-029, TKT-039, TKT-040
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：人潮／物資／醫療等類型，PENDING至結案，本站／分區限制；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；告警調度責任、醫療資訊最小化與公告授權待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-050/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 關主或區長在權限範圍回報異常，When 建立，Then 類型／嚴重度／站點合法，越界拒絕、內外描述分離。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given MEDICAL內部描述，When 公開查站況，Then 不回傳病患個資或內部醫療內容
- Given PENDING異常，When 指派及結案，Then 狀態與處置軌跡可查，未授權關主不得全場派工
- Given 重大安全公告，When 參加者同步，Then 可見必要指示，不含內部細節；結案後不再當有效公告

## TKT-051｜串接派工、結案與安全公告

- 父層：E08 → S16 → TSK-16A
- 需求／來源：FR-31, FR-32, FR-33；NORTH_STAR.md §8.5；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D；NORTH_STAR.md §6.B
- 目標：異常派工與公開安全公告；本票交付：組長處置、handler／時間、另填公開安全指示
- 做：組長處置、handler／時間、另填公開安全指示
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-050
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：組長處置、handler／時間、另填公開安全指示；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；告警調度責任、醫療資訊最小化與公告授權待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-051/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 組長選定有效處理人，When 派工／結案／公告，Then 記handler與時間，公開訊息另填，結案公告解除。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given MEDICAL內部描述，When 公開查站況，Then 不回傳病患個資或內部醫療內容
- Given PENDING異常，When 指派及結案，Then 狀態與處置軌跡可查，未授權關主不得全場派工
- Given 重大安全公告，When 參加者同步，Then 可見必要指示，不含內部細節；結案後不再當有效公告

## TKT-052｜驗證重大告警與醫療隱私

- 父層：E08 → S16 → TSK-16B
- 需求／來源：FR-31, FR-32, FR-33；NORTH_STAR.md §8.5；NORTH_STAR.md §9.2；NORTH_STAR.md §6.D；NORTH_STAR.md §6.B
- 目標：異常派工與公開安全公告；本票交付：重大優先、醫療內文不公開、解除公告、角色越權
- 做：重大優先、醫療內文不公開、解除公告、角色越權
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-050, TKT-051
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：重大優先、醫療內文不公開、解除公告、角色越權；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；告警調度責任、醫療資訊最小化與公告授權待核定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-052/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 同時存在LOW與CRITICAL及內部醫療描述，When 顯示，Then CRITICAL優先，公開端無病患細節，非管理員不可公開內文。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given MEDICAL內部描述，When 公開查站況，Then 不回傳病患個資或內部醫療內容
- Given PENDING異常，When 指派及結案，Then 狀態與處置軌跡可查，未授權關主不得全場派工
- Given 重大安全公告，When 參加者同步，Then 可見必要指示，不含內部細節；結案後不再當有效公告

## TKT-053｜定義報表口徑與篩選契約

- 父層：E09 → S17 → TSK-17A
- 需求／來源：FR-34, NFR-07；NORTH_STAR.md §6.D；NORTH_STAR.md §9.1；NORTH_STAR.md §8.4
- 目標：受控報表與數據一致；本票交付：當前有效章、時間／區域／狀態範圍、Asia/Taipei
- 做：當前有效章、時間／區域／狀態範圍、Asia/Taipei
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004, TKT-047, TKT-045
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：當前有效章、時間／區域／狀態範圍、Asia/Taipei；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；成果報表使用者與時間範圍口徑待業務確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-053/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 成果需求，When 定義報表，Then 人／隊／站次、有效章、from/to含端點及Asia/Taipei有可核算說明，非歷史狀態重播。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 全站匯出，When 核對，Then 恰30站，個人站次／隊員站次／隊數分欄且無敏感名冊
- Given 人工可核算測試集，When 比對護照／地圖／戰情／CSV，Then 同口徑數值完全一致

## TKT-054｜實作受權CSV匯出與跳脫

- 父層：E09 → S17 → TSK-17A
- 需求／來源：FR-34, NFR-07；NORTH_STAR.md §6.D；NORTH_STAR.md §9.1；NORTH_STAR.md §8.4
- 目標：受控報表與數據一致；本票交付：30站欄位、個人／隊員／隊數分開、無敏感名冊
- 做：30站欄位、個人／隊員／隊數分開、無敏感名冊
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-016, TKT-053, TKT-039, TKT-040
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：30站欄位、個人／隊員／隊數分開、無敏感名冊；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；成果報表使用者與時間範圍口徑待業務確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-054/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 組長全站匯出及未授權匯出，When 下載，Then 前者恰30站且分欄、後者拒絕；含公式字首者安全跳脫、無敏感名冊。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 全站匯出，When 核對，Then 恰30站，個人站次／隊員站次／隊數分欄且無敏感名冊
- Given 人工可核算測試集，When 比對護照／地圖／戰情／CSV，Then 同口徑數值完全一致

## TKT-055｜比對人工真值與公式注入

- 父層：E09 → S17 → TSK-17B
- 需求／來源：FR-34, NFR-07；NORTH_STAR.md §6.D；NORTH_STAR.md §9.1；NORTH_STAR.md §8.4
- 目標：受控報表與數據一致；本票交付：30站列數、撤銷／區間、公式字首、跨畫面一致
- 做：30站列數、撤銷／區間、公式字首、跨畫面一致
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-045, TKT-054
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：30站列數、撤銷／區間、公式字首、跨畫面一致；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；成果報表使用者與時間範圍口徑待業務確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-055/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 手算測試集含撤銷及時間範圍，When 比較API／畫面／CSV，Then 每欄一致，新增公式／換行／引號測試不得執行或破壞列數。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 全站匯出，When 核對，Then 恰30站，個人站次／隊員站次／隊數分欄且無敏感名冊
- Given 人工可核算測試集，When 比對護照／地圖／戰情／CSV，Then 同口徑數值完全一致

## TKT-056｜定義離線候選與只讀快取界線

- 父層：E09 → S18 → TSK-18A
- 需求／來源：FR-36, NFR-06；NORTH_STAR.md §10；NORTH_STAR.md §6
- 目標：弱網、離線與安全重試；本票交付：未確認不得有效核章，不長期存QR／PIN，恢復策略明確
- 做：未確認不得有效核章，不長期存QR／PIN，恢復策略明確
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：未確認不得有效核章，不長期存QR／PIN，恢復策略明確；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真機弱網測試環境及紙本對帳責任待指定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-056/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 無網路，When 規劃離線資料範圍，Then 僅允許最後成功只讀或候選，不定義為有效核章，不長期保存原token／PIN。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 核章提交斷線，When 畫面回饋，Then 顯示未確認並允許安全重試，不顯示綠色成功章
- Given 服務未確認，When 回饋使用者，Then 可知道尚未完成及下一步，不丟棄原冪等關聯

## TKT-057｜實作逾時、失敗及重送UX

- 父層：E09 → S18 → TSK-18A
- 需求／來源：FR-36, NFR-06；NORTH_STAR.md §10；NORTH_STAR.md §6
- 目標：弱網、離線與安全重試；本票交付：原鍵保留、防雙擊、非綠色假成功、最後成功時間
- 做：原鍵保留、防雙擊、非綠色假成功、最後成功時間
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-032, TKT-035, TKT-040, TKT-065
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：原鍵保留、防雙擊、非綠色假成功、最後成功時間；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真機弱網測試環境及紙本對帳責任待指定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-057/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 提交逾時／斷線後重試，When 操作UI，Then 顯示未確認、沿用原鍵、防連點，未顯綠色成功；恢復後可核對結果。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 核章提交斷線，When 畫面回饋，Then 顯示未確認並允許安全重試，不顯示綠色成功章
- Given 服務未確認，When 回饋使用者，Then 可知道尚未完成及下一步，不丟棄原冪等關聯

## TKT-058｜執行真機弱網與背景恢復測試

- 父層：E09 → S18 → TSK-18B
- 需求／來源：FR-36, NFR-06；NORTH_STAR.md §10；NORTH_STAR.md §6
- 目標：弱網、離線與安全重試；本票交付：斷網／高延遲／背景頁／時鐘差、保留原請求對帳
- 做：斷網／高延遲／背景頁／時鐘差、保留原請求對帳
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-020, TKT-033, TKT-036, TKT-048, TKT-057
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：斷網／高延遲／背景頁／時鐘差、保留原請求對帳；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真機弱網測試環境及紙本對帳責任待指定
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-058/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 真手機弱網、背景頁及時鐘誤差，When 核章／同步，Then 不丟原請求、不假成功，附實機版本及每情境實際結果。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 核章提交斷線，When 畫面回饋，Then 顯示未確認並允許安全重試，不顯示綠色成功章
- Given 服務未確認，When 回饋使用者，Then 可知道尚未完成及下一步，不丟棄原冪等關聯

## TKT-059｜審查公開／管理欄位投影

- 父層：E10 → S19 → TSK-19A
- 需求／來源：FR-39, NFR-09, NFR-10；NORTH_STAR.md §8.8；NORTH_STAR.md §10；NORTH_STAR.md §0 第6項；NORTH_STAR.md §0 第7項；NORTH_STAR.md §8.7；NORTH_STAR.md §12
- 目標：公開資料、輸入安全與證據；本票交付：兒少／電話／醫療／token／PIN／權限欄位隔離
- 做：兒少／電話／醫療／token／PIN／權限欄位隔離
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001, TKT-004
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：兒少／電話／醫療／token／PIN／權限欄位隔離；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；資料留存、隱私存取與安全驗證責任人待確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-059/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 公開／本人／關主／組長API清單，When 審欄位投影，Then 每欄有必要角色，姓名／電話／醫療／token／PIN不落公開端。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 公式或script字串，When 寫入／顯示／匯出，Then 不執行、不洩露秘密且回可理解錯誤
- Given 公開API／頁面／CSV檢查，When 搜尋敏感欄位或注入payload，Then 不洩露且不執行
- Given 任一票，When 查證據，Then 可找到基準版本、輸入、預期／實際、結果與責任人

## TKT-060｜實作輸入與輸出注入防護

- 父層：E10 → S19 → TSK-19A
- 需求／來源：FR-39, NFR-09, NFR-10；NORTH_STAR.md §8.8；NORTH_STAR.md §10；NORTH_STAR.md §0 第6項；NORTH_STAR.md §0 第7項；NORTH_STAR.md §8.7；NORTH_STAR.md §12
- 目標：公開資料、輸入安全與證據；本票交付：schema、長度、狀態、CSV／Sheet公式及HTML安全
- 做：schema、長度、狀態、CSV／Sheet公式及HTML安全
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004, TKT-059
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：schema、長度、狀態、CSV／Sheet公式及HTML安全；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；資料留存、隱私存取與安全驗證責任人待確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-060/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 公式、HTML、超長字串、非法列舉及數值，When 輸入／顯示／寫Sheet／CSV，Then 拒絕或安全編碼，不執行且不洩露例外秘密。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 公式或script字串，When 寫入／顯示／匯出，Then 不執行、不洩露秘密且回可理解錯誤
- Given 公開API／頁面／CSV檢查，When 搜尋敏感欄位或注入payload，Then 不洩露且不執行
- Given 任一票，When 查證據，Then 可找到基準版本、輸入、預期／實際、結果與責任人

## TKT-061｜執行權限與個資外洩安全驗證

- 父層：E10 → S19 → TSK-19B
- 需求／來源：FR-39, NFR-09, NFR-10；NORTH_STAR.md §8.8；NORTH_STAR.md §10；NORTH_STAR.md §0 第6項；NORTH_STAR.md §0 第7項；NORTH_STAR.md §8.7；NORTH_STAR.md §12
- 目標：公開資料、輸入安全與證據；本票交付：公開API／來源碼／console／storage／報表與拒絕稽核
- 做：公開API／來源碼／console／storage／報表與拒絕稽核
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-014, TKT-017, TKT-051, TKT-060
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：公開API／來源碼／console／storage／報表與拒絕稽核；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；資料留存、隱私存取與安全驗證責任人待確認
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-061/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 真登入權限及公開頁，When 查來源碼／console／storage／API／CSV，Then 無敏感洩露，前端偽造／停權／跨站均拒絕；附突變測試適用性證據。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 公式或script字串，When 寫入／顯示／匯出，Then 不執行、不洩露秘密且回可理解錯誤
- Given 公開API／頁面／CSV檢查，When 搜尋敏感欄位或注入payload，Then 不洩露且不執行
- Given 任一票，When 查證據，Then 可找到基準版本、輸入、預期／實際、結果與責任人

## TKT-062｜建立可重現部署與設定手冊

- 父層：E10 → S20 → TSK-20A
- 需求／來源：FR-40, NFR-11, NFR-12；NORTH_STAR.md §12；NORTH_STAR.md §14；NORTH_STAR.md §10；NORTH_STAR.md §13；NORTH_STAR.md §7
- 目標：部署、復原與活動驗收；本票交付：建置、HtmlService、Sheets／Forms、帳號、trigger與安全預設
- 做：建置、HtmlService、Sheets／Forms、帳號、trigger與安全預設
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001, TKT-004, TKT-005, TKT-016, TKT-065
- 類型／環境：規格／設計；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：建置、HtmlService、Sheets／Forms、帳號、trigger與安全預設；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦現勘核准、負載門檻、簽核人與測試Google資源未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-062/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 新隔離測試專案，When 依手冊建置與設定，Then 可重現Google閉環並記權限／Form／Sheet／trigger／版本；不得用靜態DEMO充當。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 備份還原演練，When 切換資料，Then 可驗證有效章與批次一致，舊已撤銷憑證不復活
- Given 活動結束或服務故障，When 執行SOP，Then 受權人可完成對帳／封存；保留期限須由主辦核定
- Given 新測試環境，When 依部署文件操作，Then 可重建閉環，不能以雙擊靜態HTML視為後端驗證

## TKT-063｜建立備份還原與現場紙本SOP

- 父層：E10 → S20 → TSK-20A
- 需求／來源：FR-40, NFR-11, NFR-12；NORTH_STAR.md §12；NORTH_STAR.md §14；NORTH_STAR.md §10；NORTH_STAR.md §13；NORTH_STAR.md §7
- 目標：部署、復原與活動驗收；本票交付：憑證輪替、對帳、封存／刪除、資源歸屬及回復
- 做：憑證輪替、對帳、封存／刪除、資源歸屬及回復
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-004, TKT-040, TKT-062
- 類型／環境：實作／設定；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：憑證輪替、對帳、封存／刪除、資源歸屬及回復；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦現勘核准、負載門檻、簽核人與測試Google資源未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-063/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 複製備份及撤銷過的QR，When 實際還原演練，Then 章／批次／Requests／稽核一致且舊撤銷碼不復活，記恢復耗時與對帳差異。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 備份還原演練，When 切換資料，Then 可驗證有效章與批次一致，舊已撤銷憑證不復活
- Given 活動結束或服務故障，When 執行SOP，Then 受權人可完成對帳／封存；保留期限須由主辦核定
- Given 新測試環境，When 依部署文件操作，Then 可重建閉環，不能以雙擊靜態HTML視為後端驗證

## TKT-064｜執行現勘、真手機與UAT簽核

- 父層：E10 → S20 → TSK-20B
- 需求／來源：FR-40, NFR-11, NFR-12；NORTH_STAR.md §12；NORTH_STAR.md §14；NORTH_STAR.md §10；NORTH_STAR.md §13；NORTH_STAR.md §7
- 目標：部署、復原與活動驗收；本票交付：正式規模壓測、雨備、強光、相機、還原演練與簽核
- 做：正式規模壓測、雨備、強光、相機、還原演練與簽核
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-009, TKT-012, TKT-015, TKT-018, TKT-021, TKT-024, TKT-027, TKT-030, TKT-033, TKT-036, TKT-037, TKT-038, TKT-041, TKT-042, TKT-043, TKT-046, TKT-049, TKT-052, TKT-055, TKT-058, TKT-061, TKT-062, TKT-063
- 類型／環境：驗證／整合；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：正式規模壓測、雨備、強光、相機、還原演練與簽核；需求／變更對照與實際測試紀錄
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；主辦現勘核准、負載門檻、簽核人與測試Google資源未配置
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-064/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 前置測試報告及主辦核准，When 現勘／雨備／真機／負載／UAT，Then 每項有正式責任人結果；未通過不發布、不計完成。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 備份還原演練，When 切換資料，Then 可驗證有效章與批次一致，舊已撤銷憑證不復活
- Given 活動結束或服務故障，When 執行SOP，Then 受權人可完成對帳／封存；保留期限須由主辦核定
- Given 新測試環境，When 依部署文件操作，Then 可重建閉環，不能以雙擊靜態HTML視為後端驗證

## TKT-065｜建立Stitch tokens與四視圖DEMO骨架

- 父層：E04 → S07 → TSK-07A
- 需求／來源：NFR-01, FR-08；NORTH_STAR.md §11；NORTH_STAR.md §12 Phase 1
- 目標：建立可在390px操作的四視圖導航與Stitch視覺基線，展示與正式寫入隔離
- 做：design tokens、四視圖路由、48px互動、DEMO標示與寫入拒絕
- 不做：不變更主辦未核准政策；不宣稱其他票、Google正式環境或活動UAT已完成
- 前置：TKT-001, TKT-002, TKT-056
- 類型／環境：實作／本機驗證；本機；涉及Google能力須在隔離測試專案驗證，不接觸正式名冊
- 輸入：NORTH_STAR.md NS-1.0；SRS.md v0.2；已提供交接檔與對照紀錄
- 估算：未估算；由TL／TM評估，不視為排程承諾；執行者：未分派
- 交付物：可重建四視圖骨架、tokens、DEMO狀態；390px與觸控／導航證據
- DoR：NOT_READY；估算與票大小未經TL／TM檢視；票級AC／依賴尚待PM／TL審查；真手機／強光UAT環境未提供
- DoD：DoD-COMMON；涉及個資、核章或權限者加DoD-SECURITY；Google或真機票加DoD-INTEGRATION
- 證據：docs/evidence/TKT-065/（票級正式證據待補；共享本機證據另列，不冒稱票驗收完成）
- 模型限制：不預設模型、代理數量或執行者；不得以模型能力擴張權限
- 恢復：先保存基準與未提交結果；不確定寫入先查冪等結果／有效章；涉及資料先備份，不刪稽核或略過檢查

本票AC：

- Given 未連接Google的390px頁面，When 切四視圖與操作寫入，Then 視覺符合Stitch／按鈕≥48px／無非表格溢出，DEMO明示且所有正式寫入拒絕。
- Given 本票測試結果，When 上繳驗證報告，Then 附版本、輸入、預期、實際、PASS／FAIL／NOT_TESTED及證據；替身明示。

父Story AC（由同Story全部相關票共同覆蓋）：

- Given 390px手機，When 操作四視圖，Then 能讀取／觸控／鍵盤聚焦，強光可讀性另以真機驗證
- Given 本人完成一站，When 同步成功，Then 護照只增加該人的有效站數；失敗時保留舊資料並標示

