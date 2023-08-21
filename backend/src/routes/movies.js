var express = require('express')
const omdb = require('../lib/omdb')
var router = express.Router()

router.get('/', async function (req, res, next) {
  const query = { title: req.query.title }
  const movieSearch = await omdb(query.title)
  res.send(movieSearch.Search)
})

module.exports = router
