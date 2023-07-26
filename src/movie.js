class Movie {
  constructor(MovieSource, imdbID) {
    this.givenMovieId = imdbID
    this.MovieSource = MovieSource
  }

  save() {
    for (const movie of this.MovieSource.Search) {
      if (movie.imdbID === this.givenMovieId) {
        return movie
      }
    }
    // If the loop completes without finding a movie, throw an exception
    throw new Error('Movie not found with the given ID')
  }
}

module.exports = Movie
