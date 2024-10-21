> # Line Bot

## 實作動機 - motivation
家人想要想要建立一個團購群組作為副業，但客人下定商品時總是用私訊或是直接在貼文底下留言，統計起來非常困擾，
於是在想減輕家人負擔的情況下，建立了一支可以自動記錄顧客訂單的「LINE 團購機器人」。

## 檔案簡介 - introduction
* **App.js** - Line 機器人運作邏輯
* **Sheet 範例格式.xlsx** - 寫入 Google Sheet 範例格式

## 使用技術 - skill
* 運用 Webhook 連結 Line & Google Sheet，達到自動記錄的效果
* 了解無伺服器概念，讓 Coding 人員專注於程式邏輯開發
* 語法使用 JavaScript 

## 功能展示 - demo
* **新增訂單** - 偵測用戶私訊內容，若符合訂單格式，機器人會自動記錄，並回傳告知使用者成功失敗： 
  * 情境 1. 驗證資料正確 <br/>
![成功新增訂單](https://user-images.githubusercontent.com/47651623/179910952-435d3506-2f96-4d51-9037-1e4c74b0e556.jpg)
  * 情境 2. 驗證資料錯誤 <br/>
![輸入錯誤資訊](https://user-images.githubusercontent.com/47651623/179911909-fc06d421-14f8-4e30-b293-a9a8ed183f6b.jpg)

* **查詢訂單** - 若用戶私訊"查詢訂單"，機器人會查詢用戶過去三個月內的訂單資訊，並回傳給使用者： 
  * 情境 1. 三個月內有下定過商品 <br/>
  ![查詢訂單有資料](https://user-images.githubusercontent.com/47651623/179919999-43a55db9-99e2-4a73-8590-c7da4c88fa69.jpg)
  * 情境 2. 三個月內無下定商品 <br/>
  ![查無訂單](https://user-images.githubusercontent.com/47651623/179920436-58568d82-8182-47cb-ac8f-ca5b9b138f4a.jpg)
  
* **自動記錄 Google Sheet** - 用戶新增的訂單都會自動記錄在 Google 試算表，並且帶入成本及利潤的計算公式： 
  * 情境 1. 未輸入單價 <br/>
  ![營收1](https://user-images.githubusercontent.com/47651623/179921773-322ffc6c-5818-4ffa-b1eb-97a6938acad8.jpg)
  * 情境 2. 已填入單價 <br/>
  ![營收2](https://user-images.githubusercontent.com/47651623/179921793-9cf4ca71-542a-4a46-b411-166593238274.jpg)

## 參考資料 - references
* [兩小時打造簡單 Line Chatbot — 使用 Google Apps Script & Google Sheet API](https://medium.com/%E6%8A%80%E8%A1%93%E7%AD%86%E8%A8%98/%E5%85%A9%E5%B0%8F%E6%99%82%E6%89%93%E9%80%A0%E7%B0%A1%E5%96%AE-line-chatbot-%E4%BD%BF%E7%94%A8-google-apps-script-google-sheet-api-8fff7372ff3d "link")
* [實作 LINE 聊天機器人 ( Google Apps Script )](https://www.oxxostudio.tw/articles/201804/line-bot-apps-script.html "link")
* [做個 LINE 機器人記錄誰 +1！群組 LINE Bot 製作教學與分享](https://jcshawn.com/addone-linebot/ "link")
* [對 Google Apps Script Debug - 1](https://dotblogs.com.tw/xinyikao/2022/02/05/170535)
* [對 Google Apps Script Debug - 2](https://www.youtube.com/watch?v=e0mZ5dnhHpc&list=PLLrJ9DEA0QKObErDyqvm-Qy8jNZ93vcRU&index=7&ab_channel=Boris%E7%9A%84%E5%88%86%E4%BA%AB%E5%B0%8F%E7%AB%99 "link")

