const request = require('supertest')
const app = require('../../app.js')

describe('Test the cityController', () => {
  let token

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

  test('It should request for get cities, path = "/api/cities/"', (done) => {
    return request(app)
      .get('/api/cities/')
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([])
        done()
      })
  })

  test('It should request for create city, path = "/api/cities/"', (done) => {
    return request(app)
      .post('/api/cities')
      .send({ name: 'Dnipro' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Dnipro' })
        done()
      })
  })

  test('It should request for create city with error validation, path = "/api/cities/"', (done) => {
    return request(app)
      .post('/api/cities')
      .send({ name: 2 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: name.')
        done()
      })
  })

  test('It should request for get city with error validation, path = "/api/cities/"', (done) => {
    return request(app)
      .get('/api/cities/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for get city with error not found, path = "/api/cities/"', (done) => {
    return request(app)
      .get('/api/cities/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('City with id = 2 not found!')
        done()
      })
  })

  test('It should request for get city, path = "/api/cities/"', (done) => {
    return request(app)
      .get('/api/cities/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Dnipro' })
        done()
      })
  })

  test('It should request for update city with error validation, path = "/api/cities/"', (done) => {
    return request(app)
      .put('/api/cities/null')
      .send({ name: 1 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id, name.')
        done()
      })
  })

  test('It should request for update city with error not found, path = "/api/cities/"', (done) => {
    return request(app)
      .put('/api/cities/2')
      .send({ name: 'Uzghorod' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('City with id = 2 not found for update!')
        done()
      })
  })

  test('It should request for update city, path = "/api/cities/"', (done) => {
    return request(app)
      .put('/api/cities/1')
      .send({ name: 'Uzghorod' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Uzghorod' })
        done()
      })
  })

  test('It should request for delete city with error validation, path = "/api/cities/"', (done) => {
    return request(app)
      .delete('/api/cities/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for delete city, path = "/api/cities/"', (done) => {
    return request(app)
      .delete('/api/cities/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(1)
        done()
      })
  })
})
