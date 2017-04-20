const express = require('express')
const router = express.Router()
var User = require('../models/user')
var passport = require('../config/passport')

// routing from landing page to sign up page
router.route('/sign-ajax') // change back to /signup if modal doesnt work
// .get(function (req, res) {
//   res.render('signup')
// })
.post(function (req, res, next) {
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
      req.flash('error', 'Could not create user account')
      res.redirect('/signup')
    }

    passport.authenticate('local-login', function (err, user, info) {
      if (err) { return res.json({message: 'error'}) }
      if (!user) { return res.json({message: 'error'}) }
      req.login(user, function (err) {
        if (err) return res.json({message: 'error'})
        return res.json({message: 'success'})
      })
    })(req, res, next)

    // passport.authenticate('local-login', {
    //   successRedirect: '/home',
    //   successFlash: 'Account created and logged in'
    // })(req, res, next)
  })
})

// .post(passport.authenticate('local-login', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: 'Invalid username and/or password',
//   successFlash: 'You have logged in'
// }))

// .get(function (req, res) {
//   res.render('home')
// })

router.post('/login-ajax', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
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
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
