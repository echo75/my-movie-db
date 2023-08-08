const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Review', reviewSchema)
