const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const passport = require('passport')

// 創造認證 strategy
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false, { message: 'User not exsists' })
        if (user.password !== password)
          return done(null, false, { message: 'Incorrect Email or Password' })
        return done(null, user)
      })
    })
  )

  // 執行 session 功能
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
/* passport.user(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }).then((err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false)
      if (user.password !== password) return done(null, false)
      return done(null, user)
    })
  })
)

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false)
      if (user.password !== password) return done(null, false)
      return done(null, user)
    })
  })
)
*/
