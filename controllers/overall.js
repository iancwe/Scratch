const express = require('express')
const router = express.Router()

router.route('/home')
.get(function (req, res) {
  res.render('home')
})


module.exports = router
