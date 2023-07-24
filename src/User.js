const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')
const { chalk } = require('./base.js')

class User {
  watch = []
  watched = []
  rating = []
  review = []

  constructor(registeredUsers) {
    this.firstname = registeredUsers.firstname
    this.surname = registeredUsers.surname
    this.email = registeredUsers.email
    this.password = registeredUsers.password
    this.date = registeredUsers.date
  }
  putMovieOnwatch(MovieSource, imdbID) {
    //
    const movie = new Movie(MovieSource, imdbID).save()
    this.watch.push(movie)
    return movie
  }
  removeMovieFromwatch(MovieSource, imdbID) {
    this.watch = this.watch.filter(MovieSource => MovieSource.imdbID !== imdbID)
    // redundant code - just for display purposes:
    const removedMovie = MovieSource.Search.find(movie => movie.imdbID === imdbID)
    return `Removed from watch-list '${chalk.green(removedMovie.Title)}'`
  }
  putMovieOnwatched(MovieSource, imdbID) {
    const movie = new Movie(MovieSource, imdbID).save()
    this.watched.push(movie)
    return movie
  }
  removeMovieFromwatched(MovieSource, imdbID) {
    this.watched = this.watched.filter(MovieSource => MovieSource.imdbID !== imdbID)
    // redundant code - just for display purposes:
    const removedMovie = MovieSource.Search.find(movie => movie.imdbID === imdbID)
    return `Removed from watched-list '${chalk.green(removedMovie.Title)}'`
  }
  Rating(rating, imdbID, userId) {
    const movierating = new Rating(rating, imdbID, userId)
    this.rating.push(movierating)
    return movierating
  }
  Review(review, imdbID, userId) {
    const moviereview = new Review(review, imdbID, userId)
    this.review.push(moviereview)
    return moviereview
  }
}

module.exports = User
