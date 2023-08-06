const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

describe('Movie', () => {
  it('Jenny should be able to save a movie on her watchlist', () => {
    const jenny = 'Jenny'
    const movie = 'tt0385752'
    expect(jenny.putWatch(movie)).toBe(true)
  })
})
