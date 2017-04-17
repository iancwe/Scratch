const express = require('express')
const router = express.Router()

router.post('/home', function (req, res) {
  res.send(req.body)
})

module.exports = router
