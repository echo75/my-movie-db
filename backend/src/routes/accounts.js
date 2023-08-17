const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/session', async function (req, res, next) {
  res.send(req.session)
})

// router.post('/session', async function (req, res, next) {
//   const { email, firstName, surName, password } = req.body
//   const user = await User.register({ email, firstName, surName }, password)
//   res.send(user)
// })

router.post('/session', passport.authenticate('local', { failWithError: true }), function (req, res) {
  res.send(req.user)
})

module.exports = router
