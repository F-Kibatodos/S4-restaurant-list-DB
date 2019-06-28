const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy // 載入 passport-facebook

// 創造認證 strategy
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false, { message: 'User not exsists' })
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) return done(null, user)
          else
            return done(null, false, { message: 'Incorrect Email or Password' })
        })
      })
    })
  )
  // facebook strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile._json.email }, function(err, user) {
          if (err) return done(err)
          if (!user) {
            let randomPassword = Math.random()
              .toString(36)
              .slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                const newUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
            })
          } else {
            return done(null, user)
          }
        })
      }
    )
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
