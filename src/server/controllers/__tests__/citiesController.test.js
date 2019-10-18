const request = require('supertest')
const app = require('../../app.js')

describe('Test the cityController', () => {
  let token

  test('It should request post to path = "/api/user/"', (done) => {
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

  test('It should request get to path = "/api/cities/"', (done) => {
    return request(app)
      .get('/api/cities/')
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([])
        done()
      })
  })

  test('It should request post to path = "/api/cities/"', (done) => {
    return request(app)
      .post('/api/cities')
      .send({ name: 'Dnipro' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Dnipro' })
        done()
      })
      // return request(app)
      // .post('/api/cities')
      // .send({ name: 123 })
      // .set('Accept', 'application/json')
      // .set('Authorization', token)
      // .then((res) => {
      //   expect(res.statusCode).toBe(422)
      //   expect(JSON.parse(res.text)).toEqual('some')
      //   done()
      // })
  })
})
