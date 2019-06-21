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

const mongoose = require('mongoose')

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

// 啟動並監聽
app.listen(3000)
