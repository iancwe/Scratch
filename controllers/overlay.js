const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')

const proList = {
  userList: function (req, res) {
    User.find({}, function (err, users) {
      if (err) {
        req.flash('Cant find users')
        res.redirect('/home')
      } else {
        res.render('userlist', {allUsers: users})
      }
    })
  },
  profile: function (req, res) {
    res.render('portfolio')
  }
}

module.exports = proList
