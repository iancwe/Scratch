const express = require('express')
const router = express.Router()

// routing from landing page to sign up page
router.route('/signup')
.get(function (req, res) {
  res.render('signup')
})

// routing from landing page to home page (log in should be a modal box?)
router.route('/login')
.get(function (req, res) {
  res.render('home')
})

module.exports = router
