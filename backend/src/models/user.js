const mongoose = require('mongoose')
const Movie = require('./movie.js')
const putReview = require('./review.js')
const autopopulate = require('mongoose-autopopulate')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  surName: String,
  watch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', autopopulate: { maxDepth: 1 } }],
  watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

class User {
  async putWatch(movie) {
    this.watch.push(movie)
    await this.save()
    return movie
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
  async removeWatched(movie) {
    this.watched.pull(movie)
    await this.save()
  }
  // rate(rating, imdbID) {
  //   const movieRating = new Rating(rating, imdbID, this.firstName)
  //   this.ratings.push(movieRating)
  //   return movieRating
  // }
  async review(movie, review) {
    this.reviews.push(review)
    movie.Reviews.push(review)
    await this.save()
    await movie.save()
    return review
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
}

userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
//module.exports = User
