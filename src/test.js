const User = require('./user.js')
// const Movie = require('./movie.js')
// const Review = require('./review.js')
// const Rating = require('./rating.js')

class Test {
  constructor(registeredUsers, movieSource) {
    this.registeredUsers = registeredUsers
    this.movieSource = movieSource
    //console.log(this.registeredUsers)
  }

  run() {
    const morgan = new User(this.registeredUsers[0])
    morgan.putWatch(this.movieSource, 'tt0385752') // The Golden Compass
    morgan.putWatch(this.movieSource, 'tt0473444') // Curse of the Golden Flower
    morgan.putWatched(this.movieSource, 'tt4649466') // Kingsman: The Golden Circle
    morgan.putWatched(this.movieSource, 'tt0091129') // The Golden Child
    morgan.putWatched(this.movieSource, 'tt0071807') // The man with the golden gun

    console.log(morgan.removeWatch(this.movieSource, 'tt0473444')) // Curse of the Golden Flower - remove from watch
    console.log(morgan.removeWatched(this.movieSource, 'tt0071807')) // The man with the golden gun - remove from watched
    morgan.rate(9, 'tt0091129', 1) // rate the movie with id 1, rating 9, imdbID 6, userId 1
    morgan.rate(3, 'tt0071807', 1) // rate the movie with id 1, rating 9, imdbID 6, userId 1
    morgan.review('"The Golden Child" is a great movie', 'tt0091129', 1) // review 'This is a great movie', imdbID: tt0091129 , userId 1
    console.log(morgan)
  }
}

module.exports = Test
