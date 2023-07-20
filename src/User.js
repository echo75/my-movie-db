const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')

class User {
  watch = []
  watched = []
  rating = []
  review = []

  constructor(forename, surname, email, password, date) {
    this.forename = forename
    this.surname = surname
    this.email = email
    this.password = password
    this.date = date
  }
  putMovieOnwatch(movieId, title, year, genre, rating, date, poster) {
    const movie = new Movie(movieId, title, year, genre, rating, date, poster)
    this.watch.push(movie)
    return movie
  }
  removeMovieFromwatch(movieId) {
    this.watch = this.watch.filter(movie => movie.movieId !== movieId)
  }
  putMovieOnwatched(movieId, title, year, genre, rating, date, poster) {
    const movie = new Movie(movieId, title, year, genre, rating, date, poster)
    this.watched.push(movie)
    return movie
  }
  removeMovieFromwatched(movieId) {
    this.watched = this.watched.filter(movie => movie.movieId !== movieId)
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
