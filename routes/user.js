const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login', { style: 'login.css', error: req.flash('error') })
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    // 使用 passport 認證
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login', // 失敗會留在登入頁面
    failureFlash: true
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
      .withMessage('密碼格式錯誤')
  ],
  (req, res) => {
    const errors = validationResult(req)
    let loginErrors = []
    const { name, email, password, password2 } = req.body
    if (!errors.isEmpty()) {
      loginErrors.push({ message: errors.errors[0].msg })
    }

    if (!name || !email || !password || !password2) {
      loginErrors.push({ message: '每個欄位都要填寫' })
    }
    if (password !== password2) {
      loginErrors.push({ message: '密碼與驗證密碼不一致' })
    }
    if (loginErrors.length > 0) {
      res.render('register', {
        loginErrors,
        name,
        email,
        password,
        password2
      })
    } else {
      User.findOne({ email }).then(user => {
        if (user) {
          loginErrors.push({ message: '這個 Email 已經註冊過了' })
          res.render('register', {
            loginErrors,
            name,
            email,
            password,
            password2
          })
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
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router
