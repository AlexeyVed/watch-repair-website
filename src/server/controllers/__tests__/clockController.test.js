const request = require('supertest')
const app = require('../../app.js')

describe('Test the clockController', () => {
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

  test('It should request for get clocks, path = "/api/clocks/"', (done) => {
    return request(app)
      .get('/api/clocks/')
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([])
        done()
      })
  })

  test('It should request for create clock, path = "/api/clocks/"', (done) => {
    return request(app)
      .post('/api/clocks/')
      .send({ name: 'Small', duration: 1 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Small', duration: 1 })
        done()
      })
  })

  test('It should request for create clock with error validation, path = "/api/clocks/"', (done) => {
    return request(app)
      .post('/api/clocks')
      .send({ name: 2, duration: 2 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: name.')
        done()
      })
  })

  test('It should request for get clock with error validation, path = "/api/clocks/"', (done) => {
    return request(app)
      .get('/api/clocks/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for get clock with error not found, path = "/api/clocks/"', (done) => {
    return request(app)
      .get('/api/clocks/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Clock with id = 2 not found!')
        done()
      })
  })

  test('It should request for get clock, path = "/api/clocks/"', (done) => {
    return request(app)
      .get('/api/clocks/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Small', duration: 1 })
        done()
      })
  })

  test('It should request for update clock with error validation, path = "/api/clocks/"', (done) => {
    return request(app)
      .put('/api/clocks/null')
      .send({ name: 1, duration: 'some' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id, name, duration, ')
        done()
      })
  })

  test('It should request for update clock with error not found, path = "/api/clocks/"', (done) => {
    return request(app)
      .put('/api/clocks/2')
      .send({ name: 'Big', duration: 3 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Clock with id = 2 not found for update!')
        done()
      })
  })

  test('It should request for update clock, path = "/api/clocks/"', (done) => {
    return request(app)
      .put('/api/clocks/1')
      .send({ name: 'Big', duration: 3 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Big', duration: 3 })
        done()
      })
  })

  test('It should request for delete clock with error validation, path = "/api/clocks/"', (done) => {
    return request(app)
      .delete('/api/clocks/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for delete clock, path = "/api/clocks/"', (done) => {
    return request(app)
      .delete('/api/clocks/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(1)
        done()
      })
  })
})
