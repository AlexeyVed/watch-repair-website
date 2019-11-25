const request = require('supertest')
const app = require('../../app.js')

describe('Test the userController', () => {
  test('It should request for login, path = "/login"', (done) => {
    return request(app)
      .post('/api/users/login')
      .send({ email: 'admin@example.com', password: 'passwordsecret' })
      .set('Accept', 'application/json')
      .then((res) => {
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

  test('It should request for logout, path = "/logout"', (done) => {
    return request(app)
      .get('/api/users/logout')
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.text).toBe('logout')
        done()
      })
  })

  test('It should request for login with error user not found, path = "/login"', (done) => {
    return request(app)
      .post('/api/users/login')
      .send({ email: 'notAdmin@example.com', password: 'passwordsecret' })
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.body).toBe('User not found.')
        done()
      })
  })
})
