const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { check, validationResult } = require('express-validator')
// 新增一間餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 執行新增
router.post(
  '/',
  [
    check
      .apply('phone')
      .custom(value => {
        ;/^0\d{1,4}-\d{0,8}/.test(value)
      })
      .withMessage('wrong')
  ],
  (req, res) => {
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
  }
)

// 一餐廳詳細頁面
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    res.render('detail', { restaurant })
  })
})

// 更新頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    res.render('edit', { restaurant })
  })
})

// 執行更新
router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    restaurant.remove(err => {
      if (err) console.error(err)
      res.redirect('/')
    })
  })
})
module.exports = router
