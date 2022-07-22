> # Line 團購機器人

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


<br/>

# 使用方法 How to Use
1. 將 app.js 的內容複製，貼到你的 Google App Script 專案上
![2](https://user-images.githubusercontent.com/47651623/180342740-b4ed318a-07a7-4f24-bc38-480eff5096f2.jpg)
2. 將 CHANNEL_ACCESS_TOKEN 替換成您的 LINE API Token 權杖：
   將 sheet_url 替換成您的 Google 試算表連結：
![1](https://user-images.githubusercontent.com/47651623/180343166-05390547-7f2e-4ace-9e2c-46be817f3fe5.jpg)
3. 點選 App Script 網頁的部署按鈕，選擇「新增」：
![3](https://user-images.githubusercontent.com/47651623/180343272-cbe58202-6478-4c52-9e95-abedfdab98ac.jpg)
4. 設定為「網路應用程式」：
![4](https://user-images.githubusercontent.com/47651623/180343336-dbf92673-8a25-45d9-9b26-1ff7420b2b26.jpg)
5. 將存取權限改為「所有人」，再按部署：
![5](https://user-images.githubusercontent.com/47651623/180343387-94f3bfe6-0f97-4de5-aa12-a63d63001edd.jpg)
6. 接著瀏覽器會出現小視窗，點按「授與存取權」：
![4](https://user-images.githubusercontent.com/47651623/180343444-1327229c-95d4-45df-a4a5-a6f5b3b0611d.png)
7. 選取 Google 帳號後，點選左下小灰字「顯示進階設定」，並點選做下方的「Go To ****」：
![8](https://user-images.githubusercontent.com/47651623/180343623-df7bcb95-3e9a-45d9-8056-73c144a358b4.jpg)
8. 點選允許：

