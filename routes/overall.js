const express = require('express')
const router = express.Router()
const proList = require('../controllers/overlay')

// route once your log in or sign up to get to homepage
router.route('/home')
.get(proList.popHome)

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

// routing to remove company from portfolio
router.route('/home/:id')
.delete(proList.rmvCom)

// routing to follow other users
router.route('/userlist/:id')
.put(proList.followUser)

module.exports = router
