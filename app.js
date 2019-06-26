// 載入並啟用 express
const express = require('express')
const app = express()

// 載入並設定 express-handlebars 為模板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 告知 express 靜態檔案位置
app.use(express.static('public'))

// 載入 body-parser 解析 req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 mongoose
const mongoose = require('mongoose')
// 連接至指定資料庫
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true
})
// 將資料庫回傳的文件儲存至變數
const db = mongoose.connection

// 導入 method-override
const methodOverride = require('method-override')
// 設定 method-override
app.use(methodOverride('_method'))

// 與資料庫連線失敗訊息
db.on('error', () => {
  console.log('db not connected')
})
// 與資料庫連線成功訊息
db.once('open', () => {
  console.log('db connected')
})

const Restaurant = require('./models/restaurant')

// 設定路由

// 首頁
app.use('/', require('./routes/home'))

// 搜尋
app.use('/search', require('./routes/search'))

// 新增、編輯、刪除
app.use('/restaurants', require('./routes/restaurant'))

// 登入
app.use('/users', require('./routes/user'))

// 啟動並監聽
app.listen(3000)
