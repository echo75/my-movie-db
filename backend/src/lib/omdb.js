const axios = require('axios')
require('dotenv').config()
const apiKey = process.env.OMDB_API_KEY

module.exports = async function fetchAndAccessMovieData(movieTitle) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}&type=movie`
    )
    return response.data
  } catch (error) {
    throw error
  }
}

// class OMDBService {
//   constructor() {
//     this.apiKey = apiKey

//     this.apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`
//     this.cachedMovieData = null
//   }

//   async fetchMovieData(movieTitle) {
//     if (this.cachedMovieData) {
//       return this.cachedMovieData
//     }

//     try {
//       const response = await axios.get(`${this.apiUrl}&s=${encodeURIComponent(movieTitle)}`)
//       this.cachedMovieData = response.data
//       return this.cachedMovieData
//     } catch (error) {
//       throw error
//     }
//   }
// }

// module.exports = OMDBService
