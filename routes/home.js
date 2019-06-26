const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 顯示首頁
router.get('/', (req, res) => {
  const sortField = req.query.sortField || '_id'
  const sortOrder = req.query.sortOrder || 'asc'
  const sortObject = {}
  sortObject[sortField] = sortOrder
  let keyword = req.query.keyword

  Restaurant.find({})
    .sort(sortObject)
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', {
        restaurant: restaurant,
        keyword: keyword,
        style: 'index.css'
      })
    })
})

module.exports = router
