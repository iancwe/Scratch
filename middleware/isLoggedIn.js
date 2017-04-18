module.exports = function (req, res, next) {
  console.log('user',req.user)
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page')
    res.redirect('/')
  } else {
    next()
  }
}
