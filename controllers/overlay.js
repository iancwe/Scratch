const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Company = require('../models/company')

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
  profiles: function (req, res) {
    res.render('portfolio')
  },
  profUpdate: function (req, res, next) {
    if (req.body.emailEdit) {
      User.findByIdAndUpdate(req.params.id, {$set: {email: req.body.emailEdit}}, function (err, updatedData) {
        if (err) next()
      })
    } else if (req.body.passwordEdit) {
      User.findById(req.params.id, function (err, currentUser) {
        if (err) next()
        currentUser.password = req.body.passwordEdit
        currentUser.save()
      })
    }
    req.flash('success', 'Profile Updated')
    res.redirect('/portfolio')
  },
  portUpdate: function (req, res, next) {
    Company.create({
      name: req.body.comName,
      symbol: req.body.comSymbol.toUpperCase(),
      sharePurchased: req.body.sharePurc,
      purchasedPrice: req.body.sharePrice
    })
    req.flash('success', 'Company Added')
    res.render('portfolio')
  }
}

module.exports = proList
