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
  res.locals.userData = req.body
  if (req.body.password !== req.body.confirmPassword) {
    req.flash('error', 'Password does not Match')
    res.redirect('/signup')
    return
  }

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
    }
        // FLASH
    passport.authenticate('local', {
      successRedirect: '/home',
      successFlash: 'Account created and logged in'
    })(req, res)
  })
})

// routing from landing page to home page (log in should be a modal box?)
router.route('/login') /* change back to login if it doesnt work with modal */
.get(function (req, res) {
  res.render('login')
})
.post(passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))

router.post('/login-ajax', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    console.log(err, user, info)
    if (err) { return res.json({message: 'error'}) }
    if (!user) { return res.json({message: 'error'}) }
    req.login(user, function (err) {
      if (err) return res.json({message: 'error'})
      return res.json({message: 'success'})
    })
  })(req, res, next)
})

router.get('/logout', function (req, res) {
  req.logout()
  // FLASH
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
