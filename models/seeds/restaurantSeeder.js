const mongoose = require('mongoose')
// 連接至指定資料庫
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useCreateIndex: true
})
// 將資料庫回傳的文件儲存至變數
const db = mongoose.connection
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const users = require('../../user.json').results
const bcrypt = require('bcryptjs')

// 與資料庫連線失敗訊息
db.on('error', () => {
  console.log('db not connected')
})
// 與資料庫連線成功訊息
db.once('open', () => {
  console.log('db connected')
  for (let i = 0; i < 2; i++) {
    const newUser = new User({
      name: users[i].name,
      email: users[i].email,
      password: users[i].password
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(user => {
            let restaurants =
              i === 0 ? restaurantList.slice(0, 3) : restaurantList.slice(3, 6)
            for (let restaurant of restaurants) {
              Restaurant.create({
                name: restaurant.name,
                name_en: restaurant.name_en,
                category: restaurant.category,
                image: restaurant.image,
                location: restaurant.location,
                phone: restaurant.phone,
                google_map: restaurant.google_map,
                rating: restaurant.rating,
                description: restaurant.description,
                userId: newUser._id
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
  }
  console.log('Seed established')
})
