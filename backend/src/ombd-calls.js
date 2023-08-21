const OMDBService = require('./omdb')
require('dotenv').config()
const axios = require('axios')



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
    }
  ],
  totalResults: '1731',
  Response: 'True',
}



async function main() {

// Create a new OMDBService instance
const apiKey = process.env.OMDB_API_KEY
const movieTitle = 'Avengers'

// Fetch the movie data using async/await
async function fetchAndAccessMovieData() {
  const omdbService = new OMDBService(apiKey)
  try {
    // Fetch the movie data using async/await
    const movieData = await omdbService.fetchMovieData(movieTitle)
    // You can access movieData here
    return movieData;
  } catch (error) {
    console.error('Error:', error)
  }
}

const movieData = await fetchAndAccessMovieData()
console.log(movieData.Search[0].imdbID)

axios.defaults.baseURL = 'http://localhost:3000/users'

  const lassberg = await axios.post('/', {
    firstname: 'Morgan',
    surname: 'Lassberg',
  })


  await axios.post(`/${lassberg.data._id}/watchlist`, {
    movie: movieData.Search[1],
    //movie: movieData,
  })

  await axios.post(`/${lassberg.data._id}/reviews`, {
    movie: movieData.Search[1],
    text: 'Test Review. One of the best movies ever!',
    rating: 5,
  })

}
main()

console.log(`index.js is running`)


