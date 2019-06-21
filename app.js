// 載入並啟用 express
const express = require('express')
const app = express()

// 載入並設定 express-handlebars 為模板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 載入 body-parser 解析 req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 mongoose
const mongoose = require('mongoose')
// 連接至指定資料庫
mongoose.connect('mongoosedb://localhost/restaurants', {
  useNewUrlParser: true
})
// 將資料庫回傳的文件儲存至變數
const db = mongoose.connection

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
})

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

// 啟動並監聽
app.listen(3000)
