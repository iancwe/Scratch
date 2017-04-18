const express = require('express')
const router = express.Router()
const proList = require('../controllers/overlay')

// route once your log in or sign up to get to homepage
router.route('/home')
.get(function (req, res) {
  res.render('home')
})

// routing to bring user to other users list page to follow
router.route('/userlist')
.get(proList.userList)

// routing for users update their current portfolio
router.route('/portfolio')
.get(proList.profile)

module.exports = router
