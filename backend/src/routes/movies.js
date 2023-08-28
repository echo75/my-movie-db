var express = require('express')
const omdb = require('../lib/omdb')
const omdbDetails = require('../lib/omdb-details')
var router = express.Router()

router.get('/', async function (req, res, next) {
  const query = { title: req.query.title }
  const movieSearch = await omdb(query.title)
  res.send(movieSearch.Search)
})

router.get('/details', async function (req, res, next) {
  const query = { imdbID: req.query.imdbID }
  const movieDetails = await omdbDetails(query.imdbID)
  res.send(movieDetails)
})

module.exports = router
