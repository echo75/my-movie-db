const express = require('express')
const User = require('../models/user')
const Movie = require('../models/movie')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find()
  res.send(users)
})

// router.get('/', function (req, res, next) {
//   res.send(User.list)
// })

//create new user
router.post('/', async function (req, res, next) {
  try {
    console.log(req.body)
    const user = await User.create({
      firstName: req.body.firstname,
      surName: req.body.surname,
    })
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
})

// user/:id/watchlist
// router.post('/:id/watchlist', function (req, res, next) {
//   try {
//     const user = User.list.find(user => user.firstName === req.params.id)
//     const movie = user.putWatch(req.body.movieSource, req.body.imdbID)
//     res.send(movie)
//   } catch (error) {
//     res.send(error.message)
//   }
// })

// user/:id/watchlist
router.post('/:id/watchlist', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    const movie = await user.putWatch(req.body.movie)
    res.send(movie)
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
    user.removeWatch(movie)
    res.sendStatus(200)
  } catch (error) {
    res.send(error.message)
  }
})

// delete movie from watchedlist
router.delete('/:id/watchedlist/:imdbID', function (req, res, next) {
  try {
    const user = User.list.find(user => user.firstName === req.params.id)
    const movie = user.removeWatched(req.params.imdbID)
    res.sendStatus(200)
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
