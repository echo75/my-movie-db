const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  imdbID: String,
  Type: String,
  Poster: String,
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  Ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
})

module.exports = mongoose.model('Movie', movieSchema)
