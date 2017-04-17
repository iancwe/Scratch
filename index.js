const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
const app = express()
require('dotenv').config({ silent: true })

// mongoose and database set up
const dbURI = 'mongodb://localhost/scratch'
const mongoose = require('mongoose')
mongoose.connect(dbURI, function () {
  console.log('db is connected')
})
mongoose.Promise = global.Promise

// setting up sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// setting my template engine for express
app.set('view engine', 'ejs')

// setting the layout structure
var ejsLayout = require('express-ejs-layouts')
app.use(ejsLayout)
app.use(express.static('assets'))

// setting up bodyParser to use input forms
app.use(bodyParser.urlencoded({extended: false}))

// setting up flash
app.use(flash())

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
app.listen(process.env.PORT, function () {
  console.log('express is running now')
})
