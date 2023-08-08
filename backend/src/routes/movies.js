var express = require('express')
const User = require('../models/user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

//create new user
router.post('/', function (req, res, next) {
  try {
    console.log(req.body)
    const user = User.create({
      firstname: req.body.firstname,
      surname: req.body.surname,
    })
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
})
module.exports = router
