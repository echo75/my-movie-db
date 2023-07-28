const fs = require('fs')
const User = require('./models/user.js')
const Movie = require('./models/movie.js')
const Review = require('./models/review.js')
const Rating = require('./models/rating.js')
const JSONReader = require('./models/jsonreader.js')
const Test = require('./models/test.js')

// use JSONReader to read the USER json file
const filePathUsers = './src/source/user.json'
const jsonReaderUsers = new JSONReader(filePathUsers)
const registeredUsers = jsonReaderUsers.readJSON()
//console.log(registeredUsers)

// use JSONReader to read the MOVIES json file
const filePathMovies = './src/source/movies_omdb.json'
const jsonReaderMovies = new JSONReader(filePathMovies)
const movieSource = jsonReaderMovies.readJSON()
//console.log(movieSource['Search'])

const test = new Test(registeredUsers, movieSource)
test.run()

const morgan = new User(registeredUsers[0])
//const jenny = new User(...arrayUser[1])
