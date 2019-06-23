const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 搜尋功能
router.get('/', (req, res) => {
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

module.exports = router
