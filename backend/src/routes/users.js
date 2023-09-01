const express = require('express')
const User = require('../models/user')
const Movie = require('../models/movie')
const Review = require('../models/review')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
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

// create review for a movie by a user
router.post('/:id/reviews/', async function (req, res, next) {
  try {
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
  let movie = await Movie.findOne({ imdbID: req.body.imdbID })
  if (!movie) {
    const { Title, Year, imdbID, Type, Poster } = req.body
    movie = await Movie.create({
      Title,
      Year,
      imdbID,
      Type,
      Poster,
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

// move movie from watchlist to watchedlist
router.post('/:id/watchedlist/:imdbID', async function (req, res, next) {
  let movie = await Movie.findOne({ imdbID: req.params.imdbID })
  const user = await User.findById(req.params.id)

  if (user.watched.includes(movie._id)) {
    res.send('Movie already in watchedlist')
  } else {
    await user.putWatched(movie)
    res.send(user)
  }
})

// get all movies from watchedlist of a user
router.get('/:id/watchedlist', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate('watched')
    res.send(user.watched)
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
