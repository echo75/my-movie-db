const fs = require('fs')
const { chalk } = require('./base.js')
const User = require('./User.js')
const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')

// use fs to read the USER json file
const dataUser = fs.readFileSync('./src/user.json', 'utf8')
// parse the data to get an array of objects
const assocArrayUser = JSON.parse(dataUser)
const arrayUser = assocArrayUser.map(item => Object.values(item)) //convert the assoc array to a numeric array

// use fs to read the MOVIES json file
const dataMovie = fs.readFileSync('./src/movies.json', 'utf8')
// parse the data to get an array of objects
const assocArrayMovie = JSON.parse(dataMovie)
const arrayMovie = assocArrayMovie.map(item => Object.values(item)) //convert the assoc array to a numeric array

const morgan = new User(...arrayUser[0])
//const jenny = new User(...arrayUser[1])

morgan.putMovieOnwatch(...arrayMovie[1])
morgan.putMovieOnwatched(...arrayMovie[2])
morgan.putMovieOnwatched(...arrayMovie[4])

morgan.removeMovieFromwatched(4) // remove the movie with id 4 from the watched (Matrix Resurrections)
morgan.Rating(9, 6, 1) // rate the movie with id 1, rating 9, movieId 6, userId 1
morgan.Review('"Find Nemo" is a great movie', 6, 1) // review the movie with id 1, review 'This is a great movie', movieId 6, userId 1
console.log(morgan)

// Fun with chalk:
string = '\nHello World\n\n'
const array = string.split('') // split the string into an array
const newArray = array.map((letter, index) => {
  if (index % 2 === 0) {
    process.stdout.write(`${chalk.blue(letter)}`)
  } else {
    process.stdout.write(`${chalk.yellow(letter)}`)
  }
})
