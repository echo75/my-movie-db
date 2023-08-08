const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  imdbID: String,
  Type: String,
  Poster: String,
})

module.exports = mongoose.model('Movie', movieSchema)
