// I need to have two main objects user ans movie
// User will have an id, forename, surname, email, password and date
// Movie will have an id, title, year, genre, rating, date and an poster
// for the user I will use an array to store the users
// for the movie I will use an array to store the movies
// User should be able to put the movie on a watchlist
// User should be able to remove the movie from the watchlist
// User should be able to put the movie on a watched list
// User should be able to rate the movie

class User {
  watchlist = []
  watchedlist = []

  constructor(id, forename, surname, email, password, date) {
    this.id = id
    this.forename = forename
    this.surname = surname
    this.email = email
    this.password = password
    this.date = date
  }
  putMovieOnWatchlist(id, title, year, genre, rating, date, poster) {
    const movie = new Movie(id, title, year, genre, rating, date, poster)
    this.watchlist.push(movie)
    return movie
  }
  removeMovieFromWatchlist(id) {
    this.watchlist = this.watchlist.filter(movie => movie.id !== id)
  }
  putMovieOnWatchedlist(id, title, year, genre, rating, date, poster) {
    const movie = new Movie(id, title, year, genre, rating, date, poster)
    this.watchedlist.push(movie)
    return movie
  }
  removeMovieFromWatchedlist(id) {
    this.watchedlist = this.watchedlist.filter(movie => movie.id !== id)
  }
  rateMovie(id, rating) {
    const movie = this.watchedlist.find(movie => movie.id === id)
    movie.rating = rating
  }
}

class Movie {
  constructor(id, title, year, genre, rating, date, poster) {
    this.id = id
    this.title = title
    this.year = year
    this.genre = genre
    this.rating = rating
    this.date = date
    this.poster = poster
  }
}
// Two users with their data in an array
const users = [
  [1, 'Morgan', 'Lindgren', 'johan@hedman.de', 'Df1234PWD', '2023-07-17'],
  [2, 'Jenny', 'Karlsson', 'johan.hedman@echoload.com', 'GtABcPWD', '2023-07-17'],
]

// Movies with their data in an array
const movies = [
  [
    1,
    'The Matrix',
    1999,
    'Action',
    5,
    '2023-07-17',
    'https://www.imdb.com/title/tt0133093/mediaviewer/rm3594684160/?ref_=tt_ov_i',
  ],
  [
    2,
    'The Matrix Reloaded',
    2003,
    'Action',
    5,
    '2023-07-17',
    'https://www.imdb.com/title/tt0234215/mediaviewer/rm3594684160/?ref_=tt_ov_i',
  ],
  [
    3,
    'The Matrix Revolutions',
    2003,
    'Action',
    5,
    '2023-07-17',
    'https://www.imdb.com/title/tt0242653/mediaviewer/rm3594684160/?ref_=tt_ov_i',
  ],
  [
    4,
    'The Matrix Resurrections',
    2021,
    'Action',
    5,
    '2023-07-17',
    'https://www.imdb.com/title/tt10838180/mediaviewer/rm3594684160/?ref_=tt_ov_i',
  ],
  [
    5,
    'Find Nemo',
    2003,
    'Animation',
    5,
    '2023-07-17',
    'https://www.imdb.com/title/tt0266543/mediaviewer/rm3594684160/?ref_=tt_ov_i',
  ],
]

const morgan = new User(...users[0])
const jenny = new User(...users[1])

//const morganWatchlist = movies.map(movie => new Movie(...movie))
//morgan.watchlist = morganWatchlist

morgan.putMovieOnWatchlist(
  5,
  'The Matrix',
  1999,
  'Action',
  5,
  '2023-07-17',
  'https://www.imdb.com/title/tt0133093/mediaviewer/rm3594684160/?ref_=tt_ov_i'
)

morgan.putMovieOnWatchedlist(
  4,
  'The Matrix Resurrections',
  2021,
  'Action',
  5,
  '2023-07-17',
  'https://www.imdb.com/title/tt10838180/mediaviewer/rm3594684160/?ref_=tt_ov_i'
)
morgan.putMovieOnWatchedlist(
  6,
  'Find Nemo',
  2003,
  'Animation',
  5,
  '2023-07-17',
  'https://www.imdb.com/title/tt0266543/mediaviewer/rm3594684160/?ref_=tt_ov_i'
)

morgan.removeMovieFromWatchedlist(4) // remove the movie with id 4 from the watchedlist (Matrix Resurrections)
morgan.rateMovie(6, 9) // rate the movie with id 6 to 9 (Nemo)
console.log(morgan)
