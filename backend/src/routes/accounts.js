const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

// router.post('/session', async function (req, res, next) {
//   const { email, firstName, surName, password } = req.body
//   const user = await User.register({ email, firstName, surName }, password)
//   res.send(user)
// })

// Login
router.post('/session', passport.authenticate('local', { failWithError: true }), async function (req, res, next) {
  res.send(req.user)
})

router.delete('/session', async function (req, res, next) {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
