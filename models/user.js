const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  company: String
})

// setting up models
var User = mongoose.model('User', userSchema)

module.exports = User
