const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login', { style: 'login.css' })
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    // 使用 passport 認證
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login' // 失敗會留在登入頁面
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register', { style: 'login.css' })
})

// 註冊檢查
router.post(
  '/register',
  [
    check('password')
      .exists()
      .custom(value =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[~!@#$%^&*(.)_\-+=\\\/]).{8,16}$/.test(
          value
        )
      )
      .withMessage('密碼需8-16字元，至少有一大寫一小寫一數字，不能有特殊符號')
  ],
  (req, res) => {
    const errors = validationResult(req)
    const { name, email, password, password2 } = req.body
    if (!errors.isEmpty()) {
      const errorMsg = errors.errors[0].msg
      return res.status(422).send(errorMsg)
    } else {
      User.findOne({ email }).then(user => {
        if (user) {
          console.log('使用者已經存在')
          res.redirect('/users/register')
        } else {
          const newUser = new User({
            name,
            email,
            password
          })
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash
              newUser
                .save()
                .then(user => {
                  res.redirect('/users/login')
                })
                .catch(err => {
                  console.log(err)
                })
            })
          })
        }
      })
    }
  }
)

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
