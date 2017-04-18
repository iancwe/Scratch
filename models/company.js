const mongoose = require('mongoose')

var companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Symbol has to only be 4 characters'],
    maxlength: [4, 'Symbol has to only be 4 characters']
  },
  sharePurchased: {
    type: Number,
    required: true
  },
  purchasedPrice: {
    type: Number,
    required: true
  },
  change: String,
  open: Number,
  close: Number,
  dhigh: Number,
  dlow: Number
})

// setting up models
var Company = mongoose.model('Company', companySchema)

module.exports = Company
