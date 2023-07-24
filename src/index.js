const fs = require('fs')
const User = require('./User.js')
const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')
const JSONReader = require('./Jsonreader.js')

// use JSONReader to read the USER json file
const filePathUsers = './src/user.json'
const jsonReaderUsers = new JSONReader(filePathUsers)
const assocArrayUser = jsonReaderUsers.readJSON()
//console.log(assocArrayUser)

// use JSONReader to read the MOVIES json file
const filePathMovies = './src/movies_omdb.json'
const jsonReaderMovies = new JSONReader(filePathMovies)
const MovieSource = jsonReaderMovies.readJSON()
//console.log(MovieSource['Search'])

const morgan = new User(assocArrayUser[0])
//const jenny = new User(...arrayUser[1])

morgan.putMovieOnwatch(MovieSource, 'tt0385752') // The Golden Compass
morgan.putMovieOnwatch(MovieSource, 'tt0473444') // Curse of the Golden Flower
morgan.putMovieOnwatched(MovieSource, 'tt4649466') // Kingsman: The Golden Circle
morgan.putMovieOnwatched(MovieSource, 'tt0091129') // The Golden Child
morgan.putMovieOnwatched(MovieSource, 'tt0071807') // The man with the golden gun

console.log(morgan.removeMovieFromwatch(MovieSource, 'tt0473444')) // Curse of the Golden Flower - remove from watch
console.log(morgan.removeMovieFromwatched(MovieSource, 'tt0071807')) // The man with the golden gun - remove from watched
morgan.Rating(9, 'tt0091129', 1) // rate the movie with id 1, rating 9, imdbID 6, userId 1
morgan.Rating(3, 'tt0071807', 1) // rate the movie with id 1, rating 9, imdbID 6, userId 1
morgan.Review('"The Golden Child" is a great movie', 'tt0091129', 1) // review 'This is a great movie', imdbID: tt0091129 , userId 1
console.log(morgan)
