const mongoose = require('mongoose')
const Movie = require('./movie.js')
const Review = require('./review.js')
const autopopulate = require('mongoose-autopopulate')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  surName: String,
  watch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', autopopulate: { maxDepth: 1 } }],
  watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', autopopulate: { maxDepth: 1 } }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', autopopulate: { maxDepth: 1 } }],
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

  async review(movie, text, rating) {
    const review = await Review.create({
      text: text,
      rating: rating,
      movie: movie,
      author: this,
    })
    this.reviews.push(review)
    movie.Reviews.push(review)
    await this.save()
    await movie.save()
    return review
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)
//module.exports = User
