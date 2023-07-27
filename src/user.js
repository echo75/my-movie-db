const Movie = require('./movie.js')
const Review = require('./review.js')
const Rating = require('./rating.js')
const chalk = require('chalk')

class User {
  watch = []
  watched = []
  ratings = []
  reviews = []

  constructor(registeredUsers) {
    this.firstname = registeredUsers.firstname
    this.surname = registeredUsers.surname
    this.email = registeredUsers.email
    this.password = registeredUsers.password
    this.date = registeredUsers.date
  }
  putWatch(movieSource, imdbID) {
    //
    const movie = new Movie(movieSource, imdbID).save()
    this.watch.push(movie)
    return movie
  }
  removeWatch(movieSource, imdbID) {
    this.watch = this.watch.filter(movieSource => movieSource.imdbID !== imdbID)
    // redundant code - just for display purposes:
    const removedMovie = movieSource.Search.find(movie => movie.imdbID === imdbID)
    return `Removed from watch-list '${chalk.green(removedMovie.Title)}'`
  }
  putWatched(movieSource, imdbID) {
    const movie = new Movie(movieSource, imdbID).save()
    this.watched.push(movie)
    return movie
  }
  removeWatched(movieSource, imdbID) {
    this.watched = this.watched.filter(movieSource => movieSource.imdbID !== imdbID)
    // redundant code - just for display purposes:
    const removedMovie = movieSource.Search.find(movie => movie.imdbID === imdbID)
    return `Removed from watched-list '${chalk.green(removedMovie.Title)}'`
  }
  rate(rating, imdbID, userId) {
    const movieRating = new Rating(rating, imdbID, userId)
    this.ratings.push(movieRating)
    return movieRating
  }
  review(text, imdbID, userId) {
    const movieReview = new Review(text, imdbID, userId)
    this.reviews.push(movieReview)
    return movieReview
  }
}

module.exports = User
