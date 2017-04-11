const express = require('express')
const app = express()
const ejsLayout = ('express-ejs-layouts')
const port = 3000

// setting up the layout and template engine for express
app.set('view engine', 'ejs')
app.use(ejsLayout)

// this is the main page
app.get('/', function (req, res) {
  res.render('landing')
})

// To make sure we are connected to heroku or localhost
.app.listen(port, function () {
  console.log('express is running on port ' + port)
})
