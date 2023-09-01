var express = require('express')
var router = express.Router()
const Movie = require('../models/movie')
const User = require('../models/user')

// get all reviews from all users to a specific movie
router.get('/:imdbID', async function (req, res, next) {
  try {
    const movie = await Movie.findOne({ imdbID: req.params.imdbID }).populate('Reviews')
    console.log('->', movie.Reviews)
    res.send(movie.Reviews)
  } catch (error) {
    res.send(error.message)
  }
})

// create review for a movie by a user
router.post('/', async function (req, res, next) {
  try {
    const user = await User.findById(req.user)
    const movie = await Movie.findOne({ imdbID: req.body.imdbID })
    const review = await user.review(movie, req.body.text, req.body.rating)
    res.send(review)
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
