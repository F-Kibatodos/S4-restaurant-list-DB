const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
require('../config/passport')(passport)
const { authenticated } = require('../config/auth')
const { check, validationResult } = require('express-validator')

router.get('/:id', authenticated, (req, res) => {
  res.render('profile')
})

router.get('/:id/edit', authenticated, (req, res) => {
  res.render('profile-edit')
})

router.put(
  '/:id/edit',
  authenticated,
  [
    check('name')
      .exists()
      .custom(value => /^\S+(?: \S+)*$/.test(value))
      .withMessage('名稱格式有誤')
  ],
  (req, res) => {
    const { name, image, phone, birthday, location } = req.body
    const nameErrors = validationResult(req)
    if (!nameErrors.isEmpty()) {
      const errorMsg = nameErrors.errors[0].msg
      return res.status(422).render('profile-edit', {
        errorMsg,
        name,
        image,
        phone,
        birthday,
        location
      })
    }
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
  }
)
module.exports = router
