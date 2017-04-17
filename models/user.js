const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// regex for email
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at minimum 4 characters'],
    maxlength: [99, 'Name cannot be more than 99 characters']
  }
})

// Creating hashed password for user

userSchema.pre('save', function (next) {
  var user = this

  // hashing password given by user
  var hash = bcrypt.hashSync(user.password, 12)

  // swapping entered password with hashed password
  user.password = hash
  next()
})

userSchema.methods.validPassword = function (password) {
  // Compare is a bcrypt method that will return a boolean,
  return bcrypt.compareSync(password, this.password)
}

// setting up models
var User = mongoose.model('User', userSchema)

module.exports = User
