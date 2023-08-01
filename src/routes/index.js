const express = require('express')
const User = require('../models/user')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'OMDb Movie List Helper' })
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

module.exports = router
