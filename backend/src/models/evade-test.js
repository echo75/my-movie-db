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
    const morgan = User.create({ firstname: 'Morgan', surname: 'Freeman' })
    morgan.putWatch(this.movieSource, 'tt0385752') // The Golden Compass
    morgan.putWatch(this.movieSource, 'tt0473444') // Curse of the Golden Flower
    morgan.putWatched(this.movieSource, 'tt4649466') // Kingsman: The Golden Circle
    morgan.putWatched(this.movieSource, 'tt0091129') // The Golden Child
    morgan.putWatched(this.movieSource, 'tt0071807') // The man with the golden gun

    console.log(morgan.removeWatch('tt0473444')) // Curse of the Golden Flower - remove from watch
    console.log(morgan.removeWatched('tt0071807')) // The man with the golden gun - remove from watched
    morgan.rate(9, 'tt0091129', 1) // rate the movie with: rating 9, imdbID, userId 1
    morgan.rate(4, 'tt0071807', 1) // rate the movie with: rating 4, imdbID, userId 2
    morgan.review('"The Golden Child" is a great movie.', 'tt0091129', 1) // review 'This is a great movie', imdbID: tt0091129 , userId 1
    console.log(morgan.onWatch()) // display watch list
    console.log(morgan.onWatched()) // display watched list
    console.log(morgan.reviewsMovie('tt0091129')) // display reviews for movie with imdbID tt0091129
    console.log(morgan.ratingsAverage('tt0091129')) // display average rating for movie with imdbID tt0091129
    console.log(morgan)

    const jenny = User.create({ firstname: 'Jenny', surname: 'McCarthy' })
    jenny.putWatch(this.movieSource, 'tt0385752') // The Golden Compass
    jenny.putWatch(this.movieSource, 'tt0473444') // Curse of the Golden Flower
    jenny.putWatched(this.movieSource, 'tt4649466') // Kingsman: The Golden Circle
    jenny.putWatched(this.movieSource, 'tt0091129') // The Golden Child
    jenny.putWatched(this.movieSource, 'tt0071807') // The man with the golden gun

    console.log(jenny.removeWatch('tt0473444')) // Curse of the Golden Flower - remove from watch
    console.log(jenny.removeWatched('tt0071807')) // The man with the golden gun - remove from watched
    jenny.rate(3, 'tt0091129', 2) // rate the movie with: rating 3, imdbID, userId 2
    jenny.rate(4, 'tt0071807', 2) // rate the movie with: rating 4, imdbID, userId 2
    jenny.review('"The Golden Child" is watchable but not too good.', 'tt0091129', 2) // review 'This is a great movie', imdbID: tt0091129 , userId 1
    console.log(jenny.onWatch()) // display watch list
    console.log(jenny.onWatched()) // display watched list
    console.log(jenny.reviewsMovie('tt0091129')) // display reviews for movie with imdbID tt0091129
    console.log(jenny.ratingsAverage('tt0091129')) // display average rating for movie with imdbID tt0091129
    console.log(jenny)
  }
}

module.exports = Test
