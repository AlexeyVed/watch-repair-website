const request = require('supertest')
const app = require('../../app.js')

describe('Test the cityController', () => {
  test('It should response the path = "/api/cities/"', () => {
    return request(app).get('/api/cities/')
      .then((res) => {
        expect(res.statusCode).toBe(404)
        expect(res.error.text).toBe('Page not found!')
      })
  })
})
