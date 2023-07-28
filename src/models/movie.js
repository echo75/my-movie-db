class Movie {
  constructor(movieSource, imdbID, firstName) {
    this.givenMovieId = imdbID
    this.movieSource = movieSource
    this.firstName = firstName
  }

  save() {
    for (const movie of this.movieSource.Search) {
      if (movie.imdbID === this.givenMovieId) {
        return movie
      }
    }
    // If the loop completes without finding a movie, throw an exception
    throw new Error('Movie not found with the given ID')
  }
}

module.exports = Movie
