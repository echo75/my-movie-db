const fs = require('fs')
const User = require('./user.js')
const Movie = require('./movie.js')
const Review = require('./review.js')
const Rating = require('./rating.js')
const JSONReader = require('./jsonreader.js')
const Test = require('./test.js')

// use JSONReader to read the USER json file
const filePathUsers = './src/source/user.json'
const jsonReaderUsers = new JSONReader(filePathUsers)
const registeredUsers = jsonReaderUsers.readJSON()
//console.log(registeredUsers)

// use JSONReader to read the MOVIES json file
const filePathMovies = './src/source/movies_omdb.json'
const jsonReaderMovies = new JSONReader(filePathMovies)
const MovieSource = jsonReaderMovies.readJSON()
//console.log(MovieSource['Search'])

const test = new Test(registeredUsers, MovieSource)
test.run()

const morgan = new User(registeredUsers[0])
//const jenny = new User(...arrayUser[1])
