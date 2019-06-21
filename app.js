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

// 顯示首頁
app.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ _id: 1 })
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant })
    })
})

// 一餐廳詳細頁面
app.get('/restaurants/:id', (req, res) => {
  // 詳細希望
})

// 新增一間餐廳頁面
app.get('/restaurants/new', (req, res) => {})

// 執行新增
app.post('/restaurants', (req, res) => {})

// 更新頁面
app.get('/restaurants/:id/edit', (req, res) => {})

// 執行更新
app.post('/restaurants/:id', (req, res) => {})

//刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {})

// 啟動並監聽
app.listen(3000)
