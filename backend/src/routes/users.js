const express = require('express')
const User = require('../models/user')
const Movie = require('../models/movie')
const Review = require('../models/review')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const numberOfCalls = req.session.numberOfCalls || 0
  console.log('Number of calls: ', numberOfCalls)
  req.session.numberOfCalls = numberOfCalls + 1
  const users = await User.find()
  res.send(users)
})

//create new user

router.post('/', async function (req, res, next) {
  try {
    const { firstName, surName, email, password } = req.body
    const user = await User.register({ firstName, surName, email }, password)
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/:id/reviews/', async function (req, res, next) {
  try {
    //console.log('-->', req.body)
    // save review and rating for a single movie
    const user = await User.findById(req.params.id)
    const movie = await Movie.findOne({ imdbID: req.body.movie.imdbID })
    const review = await Review.create({
      text: req.body.text,
      rating: req.body.rating,
      movie: movie,
      author: user,
    })
    await user.review(movie, review)
    res.send(review)
  } catch (error) {
    res.send(error.message)
  }
})

// user/:id/watchlist
router.post('/:id/watchlist', async function (req, res, next) {
  let movie = await Movie.findOne({ imdbID: req.body.movie.imdbID })

  if (!movie) {
    movie = await Movie.create({
      ...req.body.movie,
    })
  }

  const user = await User.findById(req.params.id)

  if (user.watch.includes(movie._id)) {
    res.send('Movie already in watchlist')
  } else {
    await user.putWatch(movie)
    res.send(user)
  }
})

// get all movies from watchlist of a user
router.get('/:id/watchlist', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate('watch')
    res.send(user.watch)
  } catch (error) {
    res.send(error.message)
  }
})

// user/:id/watchedlist
router.post('/:id/watchedlist', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    const movie = await Movie.findOne({ imdbID: req.body.movie.imdbID })
    await user.putWatched(movie)
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
})

// delete movie from watchlist
router.delete('/:id/watchlist/:imdbID', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id) // findbyid
    const movie = await Movie.findOne({ imdbID: req.params.imdbID }) // findbyid
    await user.removeWatch(movie)
    res.sendStatus(200)
  } catch (error) {
    res.send(error.message)
  }
})

// delete movie from watchedlist
router.delete('/:id/watchedlist/:movieId', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    const movie = await Movie.findOne({ imdbID: req.params.movieId })
    await user.removeWatched(movie)
    res.sendStatus(200)
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
