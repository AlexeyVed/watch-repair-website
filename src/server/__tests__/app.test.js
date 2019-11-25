const request = require('supertest')
const app = require('../app.js')

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    return request(app).get('/')
      .then((res) => {
        expect(res.statusCode).toBe(404)
        expect(res.error.text).toBe('Page not found!')
        done()
      })
  })
})
