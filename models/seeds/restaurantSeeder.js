const mongoose = require('mongoose')
// 連接至指定資料庫
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true
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
  const newUser = new User({
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser
        .save()
        .then(user => {
          for (let i = 0; i < 3; i++) {
            Restaurant.create({
              name: restaurantList[i].name,
              name_en: restaurantList[i].name_en,
              category: restaurantList[i].category,
              image: restaurantList[i].image,
              location: restaurantList[i].location,
              phone: restaurantList[i].phone,
              google_map: restaurantList[i].google_map,
              rating: restaurantList[i].rating,
              description: restaurantList[i].description,
              userId: user._id
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
  const newUser2 = new User({
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser2.password = hash
      newUser2
        .save()
        .then(user => {
          for (let i = 3; i < 6; i++) {
            Restaurant.create({
              name: restaurantList[i].name,
              name_en: restaurantList[i].name_en,
              category: restaurantList[i].category,
              image: restaurantList[i].image,
              location: restaurantList[i].location,
              phone: restaurantList[i].phone,
              google_map: restaurantList[i].google_map,
              rating: restaurantList[i].rating,
              description: restaurantList[i].description,
              userId: user._id
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
  console.log('done')
})
/*
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
*/
