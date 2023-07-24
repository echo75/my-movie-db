const User = require('./User.js')
const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')

class Test {
  constructor(registeredUsers, MovieSource) {
    this.registeredUsers = registeredUsers
    this.MovieSource = MovieSource
    //console.log(this.registeredUsers)
  }

  run() {
    const morgan = new User(this.registeredUsers[0])
    morgan.putMovieOnWatch(this.MovieSource, 'tt0385752') // The Golden Compass
    morgan.putMovieOnWatch(this.MovieSource, 'tt0473444') // Curse of the Golden Flower
    morgan.putMovieOnWatched(this.MovieSource, 'tt4649466') // Kingsman: The Golden Circle
    morgan.putMovieOnWatched(this.MovieSource, 'tt0091129') // The Golden Child
    morgan.putMovieOnWatched(this.MovieSource, 'tt0071807') // The man with the golden gun

    console.log(morgan.removeMovieFromWatch(this.MovieSource, 'tt0473444')) // Curse of the Golden Flower - remove from watch
    console.log(morgan.removeMovieFromWatched(this.MovieSource, 'tt0071807')) // The man with the golden gun - remove from watched
    morgan.Rating(9, 'tt0091129', 1) // rate the movie with id 1, rating 9, imdbID 6, userId 1
    morgan.Rating(3, 'tt0071807', 1) // rate the movie with id 1, rating 9, imdbID 6, userId 1
    morgan.Review('"The Golden Child" is a great movie', 'tt0091129', 1) // review 'This is a great movie', imdbID: tt0091129 , userId 1
    console.log(morgan)
  }
}

module.exports = Test
