const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String
  },
  birthday: {
    type: String
  },
  location: {
    type: String
  },
  image: {
    type: String,
    default:
      'https://sophosnews.files.wordpress.com/2013/08/facebook-silhouette_thumb.jpg?w=250'
  }
})

module.exports = mongoose.model('User', userSchema)
