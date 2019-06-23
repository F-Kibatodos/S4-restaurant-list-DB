const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 搜尋功能
router.get('/name', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant })
    })
})

router.get('/dname', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'desc' })
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant })
    })
})

router.get('/category', (req, res) => {
  Restaurant.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant })
    })
})

router.get('/district', (req, res) => {
  Restaurant.find({})
    .sort({ location: 'asc' })
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant })
    })
})

module.exports = router
