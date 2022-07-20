function doPost(e) {

    // -------------------------------------------  取得必要參數 start  -------------------------------------------

    /*
     * 
     * CHANNEL_ACCESS_TOKEN: LINE Messenging API Token
     * msg: 以 JSON 格式解析 Line User 端傳來的 e 資料
     */
    var CHANNEL_ACCESS_TOKEN = '';	// 此處填入您的 Line Channel access token
    var msg = JSON.parse(e.postData.contents);
    Logger.log(msg);

    /* 
     * LINE API JSON 解析資訊
     *
     * replyToken : 一次性回覆 token
     * user_id : 使用者 user id，查詢 username 用
     * userMessage : 使用者訊息，用於判斷是否為預約關鍵字
     * event_type : 訊息事件類型
     */
    const replyToken = msg.events[0].replyToken;
    const user_id = msg.events[0].source.userId;
    const userMessage = msg.events[0].message.text;
    const event_type = msg.events[0].source.type;

    /*
     * Google Sheet 資料表資訊設定
     *
     * sheet_url: Google sheet 網址
     */
    const sheet_url = '';	// // 此處填入您的 Google 共同編輯的 Url
    const SpreadSheet = SpreadsheetApp.openByUrl(sheet_url);

    // -------------------------------------------  取得必要參數 end  -------------------------------------------

    if (typeof replyToken === 'undefined') {  
        return;
    };

    // -------------------------------------------  Bean 宣告 start  -------------------------------------------
     
    // 訂單 Bean
    function Order(orderDate, orderName, productName, phoneNumber, deliveryMethod, deliveryLocation, quantity, unitPrice, totalPrice, 
                   unitCost, totalCost, netIncome,orderState, company, memo){
      this.orderDate = orderDate  // 訂購日期
      this.orderName = orderName  // 訂購姓名
      this.productName = productName  // 產品名稱
      this.phoneNumber = phoneNumber  // 電話
      this.deliveryMethod = deliveryMethod  // 交貨方式
      this.deliveryLocation = deliveryLocation  // 交貨地點
      this.quantity = quantity  // 數量
      this.unitPrice = unitPrice  // 金額
      this.totalPrice = totalPrice  // 總金額
      this.unitCost = unitCost  // 單價成本 
      this.totalCost = totalCost  // 總成本
      this.netIncome = netIncome  // 獲利
      this.orderState = orderState  // 訂單狀況
      this.company = company  // 廠商別
      this.memo = memo  // 備註
    }
    // API 回傳 Bean
    function OutputBean(isSuccess, message){
      this.isSuccess = isSuccess  // API 執行是否成功
      this.message = message  // API 回傳訊息
      this.obj  // API 回傳物件
    }

    // -------------------------------------------  Bean 宣告 end  -------------------------------------------


    // -------------------------------------------  通用 function 宣告 start  -------------------------------------------

    /*
     * 查詢傳訊者的 LINE 帳號名稱
     * 
     * @param 
     * @return reserve_name 用戶名稱
     */
    function get_user_name() {
        // 判斷為群組成員還是單一使用者
        switch (event_type) {
            case "user":
                var nameurl = "https://api.line.me/v2/bot/profile/" + user_id;
                break;
            case "group":
                var groupid = msg.events[0].source.groupId;
                var nameurl = "https://api.line.me/v2/bot/group/" + groupid + "/member/" + user_id;
                break;
        }

        try {
            //  呼叫 LINE User Info API，以 user ID 取得該帳號的使用者名稱
            var response = UrlFetchApp.fetch(nameurl, {
                "method": "GET",
                "headers": {
                    "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
                    "Content-Type": "application/json"
                },
            });
            var namedata = JSON.parse(response);
            var reserve_name = namedata.displayName;
        } catch {
            reserve_name = "not avaliable";
        }
        return String(reserve_name)
    }

    /*
     * 將輸入文字轉為 LINE 文字訊息格式之 JSON，並 return 給 LINE 用戶
     * 
     * @param 
     * @return
     */
    // 將輸入文字轉為 LINE 文字訊息格式之 JSON，並傳送給使用者
    function send_text_message(word) {
        var text_json = [{
            "type": "text",
            "text": word
        }]

        send_to_line(text_json)
    }

    /*
     * 將輸入值轉為 LINE 貼圖格式之 JSON，並 return 給 LINE 用戶
     * 
     * @param 
     * @return
     */
    function send_expression_message(packageId, stickerId) {
        var text_json = [{
            "type": "sticker",
            "packageId": packageId,
            "stickerId": stickerId
        }]

        send_to_line(text_json)
    }

    /*
     * call Line 回傳訊息 API
     * 
     * @param text_json 訊息格式
     * @return
     */
    function send_to_line(text_json) {
        var url = 'https://api.line.me/v2/bot/message/reply';
        UrlFetchApp.fetch(url, {
            'headers': {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
                'replyToken': replyToken,
                'messages': text_json,
            }),
        });
    }

    /*
     * 取得所有 Sheet 名稱
     * 
     * @param 
     * @return sheet_names 所有 Sheet 名稱的 list 
     */
    function getAllSheetNames() {
      var sheet_names = new Array()
      var sheets = SpreadSheet.getSheets()
      for (var i=0 ; i<sheets.length ; i++) {
        if (sheets[i].getName() !== "template") {
          sheet_names.push( [ sheets[i].getName() ] )
        }
      }
      return sheet_names 
    }

    /*
     * 判斷物件是否為空
     * 
     * @param obj 驗證物件
     * @return boolean 驗證結果
     */
    function isEmpty(obj) {
        if (obj == undefined || obj == null || obj == "") {
            return true
        } else {
            return false
        }
    }

    /*
     * 新增訂單
     * 
     * @param 
     * @return
     */
    function create_order() {
        var errorInfo = ""
        var returnMsg = ""
        var isSuccess = true
        var reserve_name = get_user_name();


        // 1. 取得要寫入的 Sheet 表
        var current_year_month = Utilities.formatDate(new Date(), "Asia/Taipei", "yyyyMM"); // 取得執行時的年月
        var today_sheet = SpreadSheet.getSheetByName(current_year_month) // 以年月訂單列表
        var add_row_num = 2 // 取得工作表插入列（ 直列數 ）
        if (!isEmpty(today_sheet)) {
          add_row_num = today_sheet.getLastRow() 
        }
       

        // 2. 取得輸入參數
        var current_date = Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy/MM/dd"); // 取得執行時的年月
        var order = buildOrderByUserMessage(userMessage, add_row_num, current_date)


        // 3. 進行格式驗證
        var validateResult = validateOrder(order);
        errorInfo = validateResult.message
        isSuccess = validateResult.isSuccess


        // 4. call API 寫入 Google Sheet
        if (isSuccess) {
            // 準備輸入參數 sum_row_num: 取得工作表總和列， orderInfo: 製作 Sheet 訂單物件
            var sum_row_num = parseInt(add_row_num) + 1
            var orderInfo = [[
              order.orderDate, order.orderName + " (" + reserve_name + ")", order.productName, order.phoneNumber, 
              order.deliveryMethod, order.deliveryLocation, order.quantity, order.unitPrice, order.totalPrice, 
              order.unitCost, order.totalCost, order.netIncome, order.orderState, order.company, order.memo
            ]];

            // 準備資料表
            if (isEmpty(today_sheet)) { // 若當月的 Sheet 尚未存在，就新建一個 Sheet
              today_sheet = SpreadSheet.getSheetByName("template").copyTo(SpreadSheet)  // 複製 template 表，rename 成年+月作為今日的表
              today_sheet.setName(current_year_month)
            } else {  // 若當月 Sheet 已經存在，新增一列空白列，方便後續輸入訂單資料
              today_sheet.insertRowAfter(today_sheet.getLastRow() - 1)  
            }

            // call API，新增訂單資訊
            today_sheet.getRange("A" + add_row_num + ":O" + add_row_num).setValues(orderInfo);

            // call API，更新總金額計算邏輯
            today_sheet.getRange("B" + sum_row_num).setValue("=SUM(I2:I" + add_row_num + ")")
            today_sheet.getRange("F" + sum_row_num).setValue("=SUM(K2:K" + add_row_num + ")")
            today_sheet.getRange("L" + sum_row_num).setValue("=SUM(L2:L" + add_row_num + ")")
        }
        

        // 5. 製作回傳訊息
        if (isSuccess) {
            returnMsg = "親愛的叩粉 (" + reserve_name + ") 您好，已收到您的訂單，客服小幫手會盡快與您確認細節並出貨唷，謝謝您的訂購🥰"
        } else {
            errorInfo = errorInfo.substring(0, errorInfo.length - 1);
            returnMsg = "❗❗❗ 您輸入的: 「" + errorInfo + "」 為空或是格式有誤，麻煩您重新填寫後送出🙏"
        }


        // 6. 完成訂購，回覆客戶訊息
        send_text_message(returnMsg)
    }

    /*
     * 依用戶輸入訊息製作訂單物件
     * 
     * @param userMessage 用戶訊息
     * @param add_row_num 新增訂單的行數編號
     * @param current_date 今日日期
     * @return Order 訂單物件
     */
    function buildOrderByUserMessage(userMessage, add_row_num, current_date){
        var orderName = userMessage.split("訂購人：")[1].split("訂購商品：")[0].replace("\n", "").trim()
        var productName = userMessage.split("訂購商品：")[1].split("訂購數量：")[0].replace("\n", "").trim()
        var quantity = userMessage.split("訂購數量：")[1].split("電話：")[0].replace("\n", "").trim()
        var phoneNumber = userMessage.split("電話：")[1].split("配送方式：")[0].replace("\n", "").trim()
        var deliveryMethod = userMessage.split("配送方式：")[1].split("配送地點：")[0].replace("\n", "").trim()
        var deliveryLocation = userMessage.split("配送地點：")[1].split("E-mail：")[0].replace("\n", "").trim()
        var email = userMessage.split("E-mail：")[1].split("備註：")[0].replace("\n", "").trim()
        var msgMemo = userMessage.split("備註：")[1].replace("\n", "").trim()
        var unitPrice = ""
        var totalPrice = "=G" + add_row_num + "*H" + add_row_num
        var unitCost = ""
        var totalCost = "=G" + add_row_num + "*J" + add_row_num
        var netIncome = "=I" + add_row_num + "-K" + add_row_num
        var orderState = "新訂單"
        var company = ""

        // 備註 = 用戶信箱 + 用戶備註
        var memo = ""
        if (!isEmpty(email) && !isEmpty(msgMemo)) {
          memo = "Email: " + email + "\n 用戶備註: " + msgMemo
        } else if (!isEmpty(email) && isEmpty(msgMemo)) {
          memo = "Email: " + email
        } else if (isEmpty(email) && !isEmpty(msgMemo)) {
          memo = "用戶備註: " + msgMemo
        }

        var order = new Order(current_date, orderName, productName, phoneNumber, deliveryMethod, deliveryLocation, quantity, unitPrice, totalPrice, unitCost, totalCost, netIncome, orderState, company, memo)

        return order;
    }

    /*
     * 驗證用訂單訊息是否正確
     * 
     * @param Order 訂單物件
     * @return validateResult 驗證結果、錯誤訊息
     */
    function validateOrder(order) {
      var isSuccess = true
      var errInfo = ""

      if (isEmpty(order.orderName)) {
        isSuccess = false
        errInfo += "訂購人、"
      }
      if (isEmpty(order.productName)) {
        isSuccess = false
        errInfo += "訂購商品、"
      }
      if (isEmpty(order.quantity)) {
        isSuccess = false
        errInfo += "訂購數量、"
      }
      if (isEmpty(order.phoneNumber) || !order.phoneNumber.match(/^(09)[0-9]{8}$/)) {
        isSuccess = false
        errInfo += "電話、"
      }
      if (isEmpty(order.deliveryMethod)) {
        isSuccess = false
        errInfo += "配送方式、"
      }
      if (isEmpty(order.deliveryLocation)) {
        isSuccess = false
        errInfo += "配送地點、"
      }
      if (!isSuccess) { // 刪除字尾
        errInfo = errInfo.substring(0, errInfo.length);
      }

      var validateResult = new OutputBean(isSuccess, errInfo)
      return validateResult
    }

    /*
     * 查詢三個月內的訂單資訊
     * 
     * @param 
     * @return
     */
    function query_order_in_three_month() {
      var reserve_name = get_user_name();

      // 1. 取得近三個月內的 Sheet Name
      var sheet_names = getAllSheetNames()
      var nowDay = new Date();
      var pastDay = new Date();
      pastDay.setMonth(pastDay.getMonth() - 3);
      var nowMonth = Utilities.formatDate(nowDay, "Asia/Taipei", "yyyyMM"); // 今天月份 ex: 202201
      var pastMonth = Utilities.formatDate(pastDay, "Asia/Taipei", "yyyyMM"); // 三個月前月份 ex: 202111
      sheet_names = sheet_names.filter(function(item){
        return item !== "template" && (parseInt(pastMonth) <= parseInt(item)) && (parseInt(item) <= parseInt(nowMonth)); 
      });


      // 2. 以 Sheet Name 取得底下所有訂單資訊
      var order_list = new Array()
      sheet_names.forEach(function(history_sheet_name){
        var history_sheet = SpreadSheet.getSheetByName(history_sheet_name)
        var history_sheet_last_row = history_sheet.getLastRow() - 1
        var history_info_list = history_sheet.getRange("A2:O" + history_sheet_last_row).getValues()

        history_info_list.forEach(function(history_info){
          // 訂購者名稱統一為 "訂購者(Line 名稱)" Ex: 王曉明(BcYe)，舊的訂單名稱不參考
          var orderer_name = ""
          if (history_info[1].includes("(") && history_info[1].includes(")")) {
            orderer_name = history_info[1].split("(")[1].split(")")[0]
          }

          if (orderer_name == reserve_name) {
            var order = new Order(history_info[0], history_info[1], history_info[2], history_info[3], history_info[4], history_info[5],
                                  history_info[6], history_info[7], history_info[8],history_info[9], history_info[10],history_info[11], 
                                  history_info[12], history_info[13], history_info[14])

            order_list.push(order)
          }
        })
      })


      // 3. 組合訂單資訊
      var returnMsg = ""
      if (order_list.length > 0) {
        returnMsg += "❣親愛的叩粉您好，以下是您三個月內的訂單資訊❣\n"
        order_list.forEach(function(orderInfo, index){
          var orderStr = "";
          var orderState = orderInfo.orderState.toString() !== "已結單" ? "訂單處理中" : "已結單"
          var orderDate = isEmpty(orderInfo.orderDate) ? "" : Utilities.formatDate(orderInfo.orderDate, "Asia/Taipei", "yyyy 年 MM 月 dd 日");

          orderStr += "訂購日期: " + orderDate + "\n"
          orderStr += "訂購人: " + orderInfo.orderName.toString().split("(")[0] + "\n"
          orderStr += "訂購商品: " + orderInfo.productName + "\n"
          orderStr += "訂購數量: " + orderInfo.quantity + "\n"
          orderStr += "是否狀態: " + orderState + "\n"  

          returnMsg += orderStr
          if (index < order_list.length - 1) {
            returnMsg += "\n"
          }
        })
      } else {
        returnMsg += "親愛的叩粉您好，您最近三個月內無訂單資訊哦😭\n"
        returnMsg += "歡迎您快快去下單❣❣"
      }


      // 4. 回覆客戶訂單資訊
      send_text_message(returnMsg)
    }
    // -------------------------------------------  通用 function 宣告 end  -------------------------------------------


       
    // -------------------------------------------  用戶傳送訊息事件 start  -------------------------------------------
    // 新增訂單
    if (userMessage.includes("訂購人：") && userMessage.includes("訂購商品：") && userMessage.includes("訂購數量：") &&
        userMessage.includes("電話：") && userMessage.includes("配送方式：") && userMessage.includes("配送地點：") &&
        userMessage.includes("備註：") && userMessage.substring(0, 3) == "訂購人" && event_type == "user") {

        create_order();
    } 

    // 查詢訂單
    else if (userMessage == "查詢訂單" && event_type == "user") {

        query_order_in_three_month();

    }
    // -------------------------------------------  用戶傳送訊息事件 end  -------------------------------------------
}