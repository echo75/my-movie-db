const User = require('./models/user.js')
const Movie = require('./models/movie.js')
const Review = require('./models/review.js')
const Rating = require('./models/rating.js')
const Test = require('./models/test.js')
const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  // const response = await axios.get('/')
  // const data = response.data
  // console.log('Response from the server:', data.title)

  const jenny = await axios.post('/users', {
    firstname: 'Jenny',
    surname: 'Smith',
  })
  const morgan_ = await axios.post('/users', {
    firstname: 'Morgan',
    surname: 'Karlsson',
  })
  // change to `jenny.data._id` instead of hardcoded id
  const movieToWatchList = await axios.post('/users/Jenny/watchlist', {
    movie: movieSource.Search[0],
  })

  //const deleteMovieFromWatchList = await axios.delete(`/users/Jenny/watchlist/${movieSource.Search[0].imdbID}`)

  //   const movieToWatchedList = await axios.post('/users/Jenny/watchedlist', {
  //     movie: movieToWatchList.data,
  //     imdbID: 'tt0385752',
  //   })

  //   const deleteMovieFromWatchedList = await axios.delete('/users/Jenny/watchedlist/tt0385752')

  //   //console.log('User Jenny:', jenny.data)
  console.log('Jennys watchlist:', movieToWatchList.data)
  //   const allUsers = await axios.get('/users')
  //   console.log('All users:', allUsers.data)
}

main()
console.log(`index.js is running`)

const movieSource = {
  Search: [
    {
      Title: 'Kingsman: The Golden Circle',
      Year: '2017',
      imdbID: 'tt4649466',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMjQ3OTgzMzY4NF5BMl5BanBnXkFtZTgwOTc4OTQyMzI@._V1_SX300.jpg',
    },
    {
      Title: 'Hellboy II: The Golden Army',
      Year: '2008',
      imdbID: 'tt0411477',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMjA5NzgyMjc2Nl5BMl5BanBnXkFtZTcwOTU3MDI3MQ@@._V1_SX300.jpg',
    },
    {
      Title: 'The Golden Compass',
      Year: '2007',
      imdbID: 'tt0385752',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTM2NDkxMjQxMV5BMl5BanBnXkFtZTYwNTMxMDM4._V1_SX300.jpg',
    },
    {
      Title: 'The Man with the Golden Gun',
      Year: '1974',
      imdbID: 'tt0071807',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYjY3YmM1MTItMWE0NC00NjFmLWFkMDgtMWFiZjY5NzQyZGVjXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
    },
    {
      Title: 'Elizabeth: The Golden Age',
      Year: '2007',
      imdbID: 'tt0414055',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTgzODIwNzcyMF5BMl5BanBnXkFtZTcwMTg0MTQ1MQ@@._V1_SX300.jpg',
    },
    {
      Title: 'The Golden Child',
      Year: '1986',
      imdbID: 'tt0091129',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYmY0MTJmNTktOGZiMC00YmU0LTlhZjQtODBlMmNkNTE3MmVlXkEyXkFqcGdeQXVyMTUyOTc1NDYz._V1_SX300.jpg',
    },
    {
      Title: 'Curse of the Golden Flower',
      Year: '2006',
      imdbID: 'tt0473444',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTA3NTY2MjA0NzFeQTJeQWpwZ15BbWU3MDgwNTA3NDE@._V1_SX300.jpg',
    },
    {
      Title: 'On Golden Pond',
      Year: '1981',
      imdbID: 'tt0082846',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNDhhMWU5YjYtNDM5OC00NDk2LThjYzEtN2FiNTAxMmZlOTFjXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
    },
    {
      Title: 'The Golden Glove',
      Year: '2019',
      imdbID: 'tt7670212',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjdlOWZiYjQtNDFkZi00NzZmLThlYWEtYWY4NjAyNDFjMjNkXkEyXkFqcGdeQXVyNTQwMDA5NTg@._V1_SX300.jpg',
    },
    {
      Title: 'Berserk: The Golden Age Arc I - The Egg of the King',
      Year: '2012',
      imdbID: 'tt2210479',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
  ],
  totalResults: '1731',
  Response: 'True',
}

// // use JSONReader to read the USER json file
// const filePathUsers = './src/source/user.json'
// const jsonReaderUsers = new JSONReader(filePathUsers)
// const registeredUsers = jsonReaderUsers.readJSON()
// //console.log(registeredUsers)

// // use JSONReader to read the MOVIES json file
// const filePathMovies = './src/source/movies_omdb.json'
// const jsonReaderMovies = new JSONReader(filePathMovies)
// const movieSource = jsonReaderMovies.readJSON()
// //console.log(movieSource['Search'])

// const test = new Test(registeredUsers, movieSource)
// test.run()

//const morgan = new User(registeredUsers[0])
//const jenny = new User(...arrayUser[1])
