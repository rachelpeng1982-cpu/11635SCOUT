# 決策紀錄

- D01：NORTH_STAR NS-1.0 優先；新版 seed 的 F1/F2/G1/B1/B2/B3 與站名為待審基準，舊 Z01–Z06 僅歷史對照。
- D02：GAS HtmlService + google.script.run；不提供 JSONP、URL憑證或可寫 doGet。工作人員只信任 Session.getActiveUser() 的 Google email，取得空值立即拒絕，不信任前端傳 role/email。
- D03：純服務邏輯可在 Node 測試，GAS adapter 使用相同核心；Google Advanced Sheets v4 batchUpdate 對多工作表 updateCells 原子提交＋ScriptLock，實際 Sheets 服務仍需沙盒驗證。表規模超出設定上限直接拒絕，勿冒險截斷。
- D04：小隊核章在同次原子提交寫入每人 StampLogs、COMMITTED StampBatches（實到及缺席快照）、AuditLogs、Requests。原子請求失敗全不提交；回應遺失用相同冪等鍵查回。無 PENDING 半成品對外可見。舊版部分批次不可匯入，需人工隔離對帳。
- D05：QR token 以兩個隨機 UUID 產生；資料表只儲存 HMAC hash。QR交換短效 session，重發時清除舊 session 並更新 hash。QR原文僅發行時及本人工作階段記憶體內顯示；不寫 URL/localStorage。QR持有人可讀本人，因此需私密發放。
- D06：保守預設全站 CLOSED／PENDING、線數與排隊未知、榮譽門檻 null；依核准實到快照統計小隊完成隊次，同一隊站只計一次。此政策可停用，正式須主辦核定。
- D07：PIN置 Script Properties、HMAC核驗、限次鎖定、15分鐘本站解鎖。工作人員角色及範圍每次請求重新讀取，不靠前端隱藏控制。
- D08：名冊只由管理員或配置的 Forms trigger匯入；使用穩定外部識別碼避免同名誤合併。Forms觸發不寄送QR或訊息；以管理員受控發行／補發交付，正式發放流程須人工確認。

- D09（Increment01）：新增storage-boundary完整性檢查及schema v2稽核摘要；v1遷移須管理員確認備份，未知歷史值明示未知。真Google整合待驗證。
- D10（Increment01）：ZONE_LEAD只能在allowed_zone_ids內派工／結案本站一般異常，可指派本人、同區區長或該站關主；不得處理全場公告或成績更正，也不能指定區外人員。成績更正仍由SYSTEM_ADMIN走補償流程。
