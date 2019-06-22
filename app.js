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

// 搜尋功能
app.get('/search', (req, res) => {
  let keyword = req.query.keyword
  //$or 是「或」條件; $regex 導入變數; options為 "i"設定找到結果是 "insensitive"
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .sort({ _id: 1 })
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant, keyword })
    })
})

// 新增一間餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// 執行新增
app.post('/restaurants', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  restaurant.save(err => {
    if (err) console.error(err)
    res.redirect('/')
  })
})

// 一餐廳詳細頁面
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    res.render('detail', { restaurant })
  })
})

// 更新頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    res.render('edit', { restaurant })
  })
})

// 執行更新
app.post('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) console.error(err)
      res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    restaurant.remove(err => {
      if (err) console.error(err)
      res.redirect('/')
    })
  })
})

// 啟動並監聽
app.listen(3000)
