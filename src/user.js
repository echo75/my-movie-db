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

  //getters here:

  ratingsAverage(imdbID) {
    console.log('ratingsAverage', this.ratings)
    const filteredRatings = this.ratings.filter(rating => rating.imdbID === imdbID)
    console.log('filteredRatings', filteredRatings)
    if (filteredRatings.length === 0) {
      return 0 // Return 0 if there are no ratings
    } else {
      return (
        'Rating for ' +
        imdbID +
        ': ' +
        filteredRatings.reduce((acc, rating) => acc + rating.rating, 0) / filteredRatings.length
      )
    }
  }

  reviewsMovie(imdbID) {
    const filteredReviews = this.reviews.filter(review => review.imdbID === imdbID)
    //console.log('filteredReviews', filteredReviews)
    const result =
      filteredReviews.length === 0
        ? 'No reviews for this movie'
        : filteredReviews.map((element, index) => `${index + 1}. ${element.text} (${element.imdbID})`).join('\n')
    return `--- Review-List ---\n${result}\n`
  }

  onWatch() {
    const result =
      this.watch === 0
        ? 'No movies are put on the watch-list'
        : this.watch.map((element, index) => `${index + 1}. ${element.Title} (${element.Year})\n`).join('\n')
    return `--- Watch-List ---\n${result}\n`
  }

  onWatched() {
    const result =
      this.watched === 0
        ? 'No movies are put on the watched-list'
        : this.watched.map((element, index) => `${index + 1}. ${element.Title} (${element.Year})`).join('\n')
    return `--- Watched-List ---\n${result}\n`
  }
}

module.exports = User
