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

// routing to get the user to portfolio/profile page
router.route('/portfolio')
.get(proList.profiles)
.post(proList.portUpdate)

// routing to update user details
router.route('/portfolio/:id')
.put(proList.profUpdate)

module.exports = router
