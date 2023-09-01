const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const movieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  imdbID: String,
  Type: String,
  Poster: String,
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', autopopulate: { maxDepth: 2 } }],
})

movieSchema.plugin(autopopulate)
module.exports = mongoose.model('Movie', movieSchema)
