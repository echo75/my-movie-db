const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

describe('Movie', () => {
  it('Create a new user named Jenny', async () => {
    const firstname = 'Jenny'
    const surname = 'Smith'
    const expectedOutput = {
      firstName: firstname,
      surName: surname,
      watched: [],
      watch: [],
      reviews: [],
    }

    const actualOutput = await request(app).post('/users').send({ firstname, surname })

    expect(actualOutput.body.firstname).toBe(expectedOutput.name)
    expect(actualOutput.body.surname).toBe(expectedOutput.surname)
    expect(actualOutput.body.watched).toEqual(expectedOutput.watched)
    expect(actualOutput.body.watch).toEqual(expectedOutput.watch)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })
})
