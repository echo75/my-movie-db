class Movie {
  constructor(movieSource, imdbID, userId) {
    this.givenMovieId = imdbID
    this.movieSource = movieSource
    this.userId = userId
  }

  save() {
    for (const movie of this.movieSource.Search) {
      if (movie.imdbID === this.givenMovieId) {
        movie.userId = this.userId
        return movie
      }
    }
    // If the loop completes without finding a movie, throw an exception
    throw new Error('Movie not found with the given ID')
  }
}

module.exports = Movie
