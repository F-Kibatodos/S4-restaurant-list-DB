const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 顯示首頁
router.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ _id: 1 })
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant })
    })
})

module.exports = router
