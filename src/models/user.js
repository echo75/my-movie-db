const mongoose = require('mongoose')
const Movie = require('./movie.js')
const Review = require('./review.js')
const Rating = require('./rating.js')
const chalk = require('chalk')

const userSchema = new mongoose.Schema({
  firstName: String,
  surName: String,
  watch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
})

class User {
  watch = []
  watched = []
  ratings = []
  reviews = []

  constructor(registeredUsers) {
    this.firstName = registeredUsers.firstname
    this.surName = registeredUsers.surname
  }
  async putWatch(movie) {
    const newMovie = await Movie.create({ ...movie })
    this.watch.push(newMovie)
    await this.save()
    return newMovie
  }
  async removeWatch(movie) {
    this.watch.pull(movie)
    await this.save()
  }
  putWatched(imdbID) {
    const movie = this.watch.find(film => film.imdbID === imdbID)
    if (!movie) throw new Error('Movie not found on the watchlist with the given ID')
    this.watched.push(movie)
    this.removeWatch(imdbID)
    return movie
  }
  removeWatched(imdbID) {
    const removeMovie = this.watched.find(movie => movie.imdbID === imdbID) // find movie by imdbID
    this.watched = this.watched.filter(watched => watched.imdbID !== imdbID)
  }
  rate(rating, imdbID) {
    const movieRating = new Rating(rating, imdbID, this.firstName)
    this.ratings.push(movieRating)
    return movieRating
  }
  review(text, imdbID) {
    const movieReview = new Review(text, imdbID, this.firstName)
    this.reviews.push(movieReview)
    return movieReview
  }

  //getters here:

  ratingsAverage(imdbID) {
    //console.log('ratingsAverage', this.ratings)
    const filteredRatings = this.ratings.filter(rating => rating.imdbID === imdbID)
    //console.log('filteredRatings', filteredRatings)
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
                `${index + 1}. ${element.text} -> Movie:(${element.imdbID}), says User: ${this.firstName}`
            )
            .join('\n')
    return `--- Review-List ---\n${result}\n`
  }

  onWatch() {
    // onWatchInfo
    const result =
      this.watch === 0
        ? 'No movies are put on the watch-list'
        : this.watch
            .map((element, index) => `${index + 1}. ${element.Title} (${element.Year}) (firstName: ${this.firstName})`)
            .join('\n')
    return `--- Watch-List ---\n${result}\n`
  }

  onWatched() {
    // onWatchedInfo
    const result =
      this.watched === 0
        ? 'No movies are put on the watched-list'
        : this.watched
            .map((element, index) => `${index + 1}. ${element.Title} (${element.Year}) (firstName: ${this.firstName})`)
            .join('\n')
    return `--- Watched-List ---\n${result}\n`
  }

  // static create({ firstname, surname }) {
  //   const newUser = new User({ firstname, surname })
  //   User.list.push(newUser)
  //   return newUser
  // }
  // static list = []
}

userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
//module.exports = User
