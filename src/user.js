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
    this.userId = registeredUsers.userId
    this.firstname = registeredUsers.firstname
    this.surname = registeredUsers.surname
    this.email = registeredUsers.email
    this.password = registeredUsers.password
    this.date = registeredUsers.date
  }
  putWatch(movieSource, imdbID) {
    //
    const movie = new Movie(movieSource, imdbID, this.userId).save()
    this.watch.push(movie)
    return movie
  }
  removeWatch(imdbID) {
    const filterMovies = this.watch.filter(watch => watch.userId === this.userId) // filter movies by userId
    const removeMovie = filterMovies.find(movie => movie.imdbID === imdbID) // find movie by imdbID
    this.watch = filterMovies.filter(watch => watch.imdbID !== imdbID)
    // redundant code - just for display purposes:
    return `Removed from watch-list '${chalk.green(removeMovie.Title)}'`
  }
  putWatched(movieSource, imdbID) {
    const movie = new Movie(movieSource, imdbID, this.userId).save()
    this.watched.push(movie)
    return movie
  }
  removeWatched(imdbID) {
    const filterMovies = this.watched.filter(watched => watched.userId === this.userId) // filter movies by userId
    const removeMovie = filterMovies.find(movie => movie.imdbID === imdbID) // find movie by imdbID
    this.watched = filterMovies.filter(watched => watched.imdbID !== imdbID)
    // redundant code - just for display purposes:
    return `Removed from watched-list '${chalk.green(removeMovie.Title)}'`
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
        : filteredReviews
            .map(
              (element, index) =>
                `${index + 1}. ${element.text} -> Movie:(${element.imdbID}), says User: ${element.userId}`
            )
            .join('\n')
    return `--- Review-List ---\n${result}\n`
  }

  onWatch() {
    const result =
      this.watch === 0
        ? 'No movies are put on the watch-list'
        : this.watch
            .map((element, index) => `${index + 1}. ${element.Title} (${element.Year}) (Userid: ${element.userId})`)
            .join('\n')
    return `--- Watch-List ---\n${result}\n`
  }

  onWatched() {
    const result =
      this.watched === 0
        ? 'No movies are put on the watched-list'
        : this.watched
            .map((element, index) => `${index + 1}. ${element.Title} (${element.Year}) (Userid: ${element.userId})`)
            .join('\n')
    return `--- Watched-List ---\n${result}\n`
  }
}

module.exports = User
