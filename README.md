> # Line 團購機器人


## 實作動機 - motivation
家人想要想要建立一個團購群組作為副業，但客人下定商品時總是用私訊或是直接在貼文底下留言，統計起來非常困擾，
於是在想減輕家人負擔的情況下，建立了一支可以自動記錄顧客訂單的「LINE 團購機器人」。

## 檔案簡介 - motivation
## 使用技術 - motivation
## 功能展示 - motivation

LINE 團購群組盛行，前期營業額還不夠支付後台網站月費時，只好用免費的 Google Sheet 來記錄啦 ~
「LINE 團購機器人」當使用者以固定格式私訊官方帳號，機器人會幫忙記錄到 Google 試算表，並且連成本、總金額都計算好囉！

<br/>



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

