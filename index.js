const express = require('express')
const app = express()
var port = process.env.PORT || 3000

// setting my template engine for express
app.set('view engine', 'ejs')

// setting the layout structure
var ejsLayout = require('express-ejs-layouts')
app.use(ejsLayout)
app.use(express.static('assets'))

// this is the main page
app.get('/', function (req, res) {
  res.render('landing')
})

// this is the main page
app.get('/home', function (req, res) {
  res.render('home')
})

// To make sure we are connected to heroku or localhost
app.listen(port, function () {
  console.log('express is running on port ' + port)
})
