const request = require('supertest')
const app = require('../../app.js')
const Master = require('../../models/masters.js')
const City = require('../../models/cities.js')
const db = require('../../db/db-connection.js')

describe('Test the masterController', () => {
  let token

  afterAll(() => {
    return db
      .query('SET FOREIGN_KEY_CHECKS = 0')
      .then((res) => {
        return Master.destroy({ truncate: true, cascade: true })
      })
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

  test('Prepare inviroment to test masters', done => {
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

  test('It should request for create master, path = "/api/masters/"', (done) => {
    return request(app)
      .post('/api/masters/')
      .send({ name: 'Anton', city_id: 1, rating: 5 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Anton', city_id: 1, city: { id: 1, name: 'Dnipro' }, rating: 5 })
        done()
      })
  })

  test('It should request for get masters, path = "/api/masters/"', (done) => {
    return request(app)
      .get('/api/masters/')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([{ id: 1, name: 'Anton', city_id: 1, city: { id: 1, name: 'Dnipro' }, rating: 5 }])
        done()
      })
  })

  test('It should request for create master with error validation, path = "/api/masters/"', (done) => {
    return request(app)
      .post('/api/masters')
      .send({ name: void 0, city_id: 1, rating: void 0 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: rating, name.')
        done()
      })
  })

  test('It should request for get master with error validation, path = "/api/masters/"', (done) => {
    return request(app)
      .get('/api/masters/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for get master with error not found, path = "/api/masters/"', (done) => {
    return request(app)
      .get('/api/masters/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Master with id = 2 not found!')
        done()
      })
  })

  test('It should request for get master, path = "/api/masters/"', (done) => {
    return request(app)
      .get('/api/masters/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Anton', city_id: 1, city: { id: 1, name: 'Dnipro' }, rating: 5 })
        done()
      })
  })

  test('It should request for update master with error validation, path = "/api/masters/"', (done) => {
    return request(app)
      .put('/api/masters/1')
      .send({ name: 'Anton', city_id: void 0, rating: void 0 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: rating, city_id.')
        done()
      })
  })

  test('It should request for update master with error not found, path = "/api/masters/"', (done) => {
    return request(app)
      .put('/api/masters/2')
      .send({ name: 'Sergey', city_id: 1, rating: 4 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Master with id = 2 not found for update!')
        done()
      })
  })

  test('It should request for update master, path = "/api/masters/"', (done) => {
    return request(app)
      .put('/api/masters/1')
      .send({ name: 'Sergey', city_id: 1, rating: 4 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Sergey', city_id: 1, city: { id: 1, name: 'Dnipro' }, rating: 4 })
        done()
      })
  })

  test('It should request for delete master with error validation, path = "/api/masters/"', (done) => {
    return request(app)
      .delete('/api/masters/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for delete master, path = "/api/masters/"', (done) => {
    return request(app)
      .delete('/api/masters/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(1)
        done()
      })
  })
})
