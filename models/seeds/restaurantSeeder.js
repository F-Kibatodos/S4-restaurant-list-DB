const mongoose = require('mongoose')
// 連接至指定資料庫
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true
})
// 將資料庫回傳的文件儲存至變數
const db = mongoose.connection
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

// 與資料庫連線失敗訊息
db.on('error', () => {
  console.log('db not connected')
})
// 與資料庫連線成功訊息
db.once('open', () => {
  console.log('db connected')
  for (let item of restaurantList) {
    Restaurant.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  }
})
