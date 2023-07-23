class Movie {
  constructor(MovieSource, imdbID) {
    this.givenMovieId = imdbID
    this.MovieSource = MovieSource
  }

  saveMovie() {
    let entry = null
    for (const movie of this.MovieSource.Search) {
      if (movie.imdbID === this.givenMovieId) {
        entry = movie
        break // Found the entry, no need to continue searching
      }
    }
    return entry
  }
}

module.exports = Movie
