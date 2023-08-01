const express = require('express')
const User = require('../models/user')
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.query.json) return res.send(User.list)
  res.render('users', { users: User.list })
})

// router.get('/', function (req, res, next) {
//   res.send(User.list)
// })

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

// user/:id/watchlist
router.post('/:id/watchlist', function (req, res, next) {
  try {
    const user = User.list.find(user => user.firstName === req.params.id)
    const movie = user.putWatch(req.body.movieSource, req.body.imdbID)
    res.send(movie)
  } catch (error) {
    res.send(error.message)
  }
})

// user/:id/watchedlist
router.post('/:id/watchedlist', function (req, res, next) {
  try {
    const user = User.list.find(user => user.firstName === req.params.id)
    const movie = user.putWatched(req.body.imdbID)
    res.send(movie)
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
