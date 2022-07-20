# Line 團購機器人
LINE 團購群組盛行，前期營業額還不夠支付後台網站月費時，只好用免費的 Google Sheet 來記錄啦 ~
「LINE 團購機器人」當使用者以固定格式私訊官方帳號，機器人會幫忙記錄到 Google 試算表，並且連成本、總金額都計算好囉！

<br/>

# 動機 - motivation
這是我為家人團購群組設計的一支 LINE 機器人，以前客人要下定商品總是用私訊或是直接在貼文底下留言，統計起來非常困擾，
因此這隻機器人是以「LINE 團購群組」為出發點設計，希望團購主能減少繁瑣的統計工作，花更多時間在經營自己的賣場。

<br/>

# 功能 - Features
<ul dir="auto">
  <li>當使用者私訊官方帳號，自動識別「訂單格式」的訊息，將訂單資訊記錄到 Google Sheet</li>
  <li>基礎驗證使用者的訂單內容是否有誤，並通知使用者需要修正的地方</li>
  <li>可以查詢用戶三個月內訂購的訂單，檢視自己目前所有訂單的狀態</li>
  <li>搭配 Google 試算表做免費資料庫，成本、利潤一覽無遺</li>
  <li>使用 Google App Script 語法開發</li>
</ul>

<br/>

# 實際測試 - Demo
這是用戶私訊團購機器人的截圖，只要依照格式填入訂單資訊，機器人會自動記錄，並回傳告知使用者成功失敗：
<br/>
![成功新增訂單](https://user-images.githubusercontent.com/47651623/179910952-435d3506-2f96-4d51-9037-1e4c74b0e556.jpg)
![輸入錯誤資訊](https://user-images.githubusercontent.com/47651623/179911909-fc06d421-14f8-4e30-b293-a9a8ed183f6b.jpg)

用戶如果想要查看目前下訂商品的訂單狀態，可以私訊團購機器人「查詢訂單」，機器人會自動回覆三個月內的訂單紀錄，如果沒有訂單也會告知使用者請他快快下單：
<br/>
![查詢訂單有資料](https://user-images.githubusercontent.com/47651623/179919999-43a55db9-99e2-4a73-8590-c7da4c88fa69.jpg)
![查無訂單](https://user-images.githubusercontent.com/47651623/179920436-58568d82-8182-47cb-ac8f-ca5b9b138f4a.jpg)

所有資料都會依照月份存放在 Google Sheet 裡，每隔一個新的月份都會自動創建新的分頁並且帶入計算公式，團主只需要填入金額及單價就會帶出總金額、成本、獲利，
一切流程皆自動化不需手動更改：
<br/>
![營收1](https://user-images.githubusercontent.com/47651623/179921773-322ffc6c-5818-4ffa-b1eb-97a6938acad8.jpg)
![營收2](https://user-images.githubusercontent.com/47651623/179921793-9cf4ca71-542a-4a46-b411-166593238274.jpg)

<br/>

# 使用方法 How to Use



