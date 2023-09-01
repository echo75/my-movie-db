const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const reviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', autopopulate: { maxDepth: 1 } },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { maxDepth: 1 } },
})

reviewSchema.plugin(autopopulate)
module.exports = mongoose.model('Review', reviewSchema)
