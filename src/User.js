const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')

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
  putMovieOnwatch(movieId, title, year, genre, rating, date, poster) {
    const movie = new Movie(movieId, title, year, genre, rating, date, poster)
    this.watch.push(movie)
    return movie
  }
  removeMovieFromwatch(MovieSource, movieId) {
    this.watch = this.watch.filter(MovieSource => MovieSource.movieId !== movieId)
  }
  putMovieOnwatched(movieId, title, year, genre, rating, date, poster) {
    const movie = new Movie(movieId, title, year, genre, rating, date, poster)
    this.watched.push(movie)
    return movie
  }
  removeMovieFromwatched(MovieSource, movieId) {
    this.watched = this.watched.filter(MovieSource => MovieSource.movieId !== movieId)
  }
  Rating(rating, movieId, userId) {
    const movierating = new Rating(rating, movieId, userId)
    this.rating.push(movierating)
    return movierating
  }
  Review(review, movieId, userId) {
    const moviereview = new Review(review, movieId, userId)
    this.review.push(moviereview)
    return moviereview
  }
}

module.exports = User
