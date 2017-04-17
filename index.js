const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config({ silent: true })

// // mongoose setup
// var dbURI = process.env.PROD_MONGODB || mongodb://<dbuser>:<dbpassword>@ds161950.mlab.com:61950/scrbk
// var mongoose = require('mongoose')
// mongoose.connect(dbURI)

// setting my template engine for express
app.set('view engine', 'ejs')

// setting the layout structure
var ejsLayout = require('express-ejs-layouts')
app.use(ejsLayout)
app.use(express.static('assets'))

// setting up bodyParser to use input forms
app.use(bodyParser.urlencoded({extended: false}))

// setting up controllers for webpage
const overCtrl = require('./controllers/overall')
app.use('/', overCtrl)
const authCtrl = require('./controllers/auth')
app.use('/', authCtrl)

// setup for landing page for vistors and user
app.get('/', function (req, res) {
  res.render('landing')
})

// To make sure we are connected to heroku or localhost
// app.listen(port, function () {
//   console.log('express is running the port')
// })
app.listen(process.env.PORT)
