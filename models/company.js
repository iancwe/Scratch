const mongoose = require('mongoose')

var companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  symbol: {
    type: String,
    required: true,
    minlength: [4, 'Symbol has to only be 4 characters'],
    maxlength: [4, 'Symbol has to only be 4 characters']
  },
  change: String,
  open: {
    type: Number,
    require: true
  },
  close: {
    type: Number,
    require: true
  },
  dhigh: {
    type: Number,
    require: true
  },
  dlow: {
    type: Number,
    require: true
  }
})

// setting up models
var Company = mongoose.model('Company', companySchema)

module.exports = Company
