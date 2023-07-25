const fs = require('fs')
const User = require('./User.js')
const Movie = require('./Movie.js')
const Review = require('./Review.js')
const Rating = require('./Rating.js')
const JSONReader = require('./Jsonreader.js')
const Test = require('./Test.js')
const axios = require('axios')

async function main() {
  try {
    const response = await axios.get('http://localhost:3000/index')
    const data = response.data
    console.log('Response from the server:', data.title)
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

main()
console.log(`index.js is running`)

// // use JSONReader to read the USER json file
// const filePathUsers = './src/source/user.json'
// const jsonReaderUsers = new JSONReader(filePathUsers)
// const registeredUsers = jsonReaderUsers.readJSON()
// //console.log(registeredUsers)

// // use JSONReader to read the MOVIES json file
// const filePathMovies = './src/source/movies_omdb.json'
// const jsonReaderMovies = new JSONReader(filePathMovies)
// const MovieSource = jsonReaderMovies.readJSON()
// //console.log(MovieSource['Search'])

// const test = new Test(registeredUsers, MovieSource)
// test.run()

//const morgan = new User(registeredUsers[0])
//const jenny = new User(...arrayUser[1])
