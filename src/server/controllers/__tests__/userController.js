const request = require('supertest')
const app = require('../../app.js')
const City = require('../../models/cities.js')
const db = require('../../db/db-connection.js')

describe('Test the cityController', () => {
  let token

  afterAll(() => {
    return db
      .query('SET FOREIGN_KEY_CHECKS = 0')
      .then((res) => {
        return City.destroy({ truncate: true, cascade: true })
      })
      .then(() => {
        return db.query('SET FOREIGN_KEY_CHECKS = 1')
      })
  })

  test('It should request for login, path = "/login"', (done) => {
    return request(app)
      .post('/api/users/login')
      .send({ email: 'admin@example.com', password: 'passwordsecret' })
      .set('Accept', 'application/json')
      .then((res) => {
        token = JSON.parse(res.text).token
        expect(JSON.parse(res.text).auth).toEqual(true)
        done()
      })
  })

  test('It should request for login with error validation, path = "/login"', (done) => {
    return request(app)
      .post('/api/users/login')
      .send({ email: 'admin1example.com', password: 'pass' })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(JSON.parse(res.error.text)).toBe('Incorrect fields: email, password.')
        done()
      })
  })
})
