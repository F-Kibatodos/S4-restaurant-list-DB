const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
require('../config/passport')(passport)
const { authenticated } = require('../config/auth')

router.get('/:id', authenticated, (req, res) => {
  res.render('profile')
})

router.get('/:id/edit', authenticated, (req, res) => {
  res.render('profile-edit')
})

router.put('/:id/edit', authenticated, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.error(err)
    user.name = req.body.name
    user.image = req.body.image
    user.phone = req.body.phone
    user.birthday = req.body.birthday
    user.location = req.body.location
    user.save(err => {
      if (err) console.error(err)
      res.redirect(`/profile/${req.params.id}`)
    })
  })
})
module.exports = router
