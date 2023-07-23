const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')
const { chalk } = require('./base.js')

class User {
  watch = []
  watched = []
  rating = []
  review = []

  constructor(assocArrayUser) {
    this.forename = assocArrayUser.forename
    this.surname = assocArrayUser.surname
    this.email = assocArrayUser.email
    this.password = assocArrayUser.password
    this.date = assocArrayUser.date
  }
  putMovieOnwatch(MovieSource, imdbID) {
    const movie = new Movie(MovieSource, imdbID).saveMovie()
    this.watch.push(movie)
    return movie
  }
  removeMovieFromwatch(MovieSource, imdbID) {
    const removedMovie = MovieSource.Search.find(movie => movie.imdbID === imdbID)
    this.watch = this.watch.filter(MovieSource => MovieSource.imdbID !== imdbID)
    return `Removed from watch-list '${chalk.green(removedMovie.Title)}'`
  }
  putMovieOnwatched(MovieSource, imdbID) {
    const movie = new Movie(MovieSource, imdbID).saveMovie()
    this.watched.push(movie)
    return movie
  }
  removeMovieFromwatched(MovieSource, imdbID) {
    const removedMovie = MovieSource.Search.find(movie => movie.imdbID === imdbID)
    this.watched = this.watched.filter(MovieSource => MovieSource.imdbID !== imdbID)
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
