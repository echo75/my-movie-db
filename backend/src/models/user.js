const mongoose = require('mongoose')
const Movie = require('./movie.js')
const Review = require('./review.js')
const Rating = require('./rating.js')
const autopopulate = require('mongoose-autopopulate')
const chalk = require('chalk')

const userSchema = new mongoose.Schema({
  firstName: String,
  surName: String,
  watch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', autopopulate: { maxDepth: 1 } }],
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
    //check if movie is allredy in watchlist
    const movieIsInWatch = await Movie.findOne({ imdbID: movie.imdbID })
    if (movieIsInWatch) {
      throw new Error('Movie is allready in watchlist')
    }
    //find if movie allready in database
    let movieToWatch = await Movie.findOne({ imdbID: movie.imdbID })

    if (!movieToWatch) {
      movieToWatch = await Movie.create({ ...movie })
    }
    this.watch.push(movieToWatch)
    await this.save()
    return movieToWatch
  }
  async removeWatch(movie) {
    this.watch.pull(movie)
    await this.save()
  }
  async putWatched(movie) {
    // TODO check if movie is allredy in watchedlist
    const MovieToWatched = await Movie.findOne({ imdbID: movie.imdbID })
    if (!movie) throw new Error('Movie not found on the watchlist with the given ID')
    this.watched.push(MovieToWatched)
    this.removeWatch(movie)
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
