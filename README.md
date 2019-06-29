# 餐廳收藏清單(CURD)

展示收藏的餐廳，點進去可以查看各餐廳的詳細資訊，此外可以新增、刪除餐廳及修改餐廳訊息

## 開發環境

- Node 10.15.0
- Express 4.17.1
- [MongoDB](https://www.mongodb.com/download-center/community) 4.0.10

### 安裝

安裝並設定打開 mongoDB 伺服器後
可以下載安裝[Robo 3T](https://robomongo.org/download)
在裡面新增名為「restaurants」的資料庫

接著在終端機(Termianl)輸入

```
cd 資料夾名稱      //移動到指定資料夾
```

或輸入

```
mkdir 資料夾名稱   //創建新資料夾
```

並在此資料夾中依序輸入

```
git clone https://github.com/F-Kibatodos/restaurant-list.git       //將此專案下載到資料夾
cd restaurant-list                                                 //移動到專案資料夾
npm install                                                        //下載相關npm套件
cd S4-restaurant-DB/models/seeds                                   //進到種子檔案
node restaurantSeeder                                              //將資料導入資料庫
cd ../..                                                           //回到專案目錄
npm run dev                                                        //執行專案
```

接著就可以在網頁輸入http://localhost:3000見到頁面

### 功能說明

- 查看餐廳資訊
- 新增餐廳
- 修改餐廳
- 刪除餐廳
- 增加註冊、登入和登出功能
- 使用者可以更新自己的基本資料
- 使用 Facebook 及 Google 第三方登入
- 註冊時檢查使用者名稱及密碼格式

### 作者

[F-Kibatodos](https://github.com/F-Kibatodos)
