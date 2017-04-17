const express = require('express')
const router = express.Router()
var User = require('../models/user')
var passport = require('../config/passport')

// routing from landing page to sign up page
router.route('/signup')
.get(function (req, res) {
  res.render('signup')
})
.post(function (req, res) {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    company: req.body.company
  }, function (err, createdUser) {
    if (err) {
        // FLASH -
      req.flash('error', 'Could not create user account')
      res.redirect('/signup')
    } else {
        // FLASH
      passport.authenticate('local', {
        successRedirect: '/home',
        successFlash: 'Account created and logged in'
      })(req, res)
    }
  })
})

// routing from landing page to home page (log in should be a modal box?)
router.route('/login')
.get(function (req, res) {
  res.render('login')
})
.post(passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))

router.get('/logout', function (req, res) {
  req.logout()
  // FLASH
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
