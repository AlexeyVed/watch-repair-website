const request = require('supertest')
const app = require('../../app.js')
const City = require('../../models/cities.js')

describe('Test the masterController', () => {
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

  test('Prepare inviroment to test masters', done => {
    City.truncate()
      .then((res) => {
        console.log('after truncateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', res)
        return request(app)
          .post('/api/cities')
          .send({ name: 'Dnipro' })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            console.log('create city after truncateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', res)
            done()
          })
      })
  })

  test('It should request for create master, path = "/api/masters/"', (done) => {
    return request(app)
      .post('/api/masters/')
      .send({ name: 'Anton', city_id: 2, rating: 5 })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        console.log(JSON.parse(res.text))
        expect(JSON.parse(res.text)).toEqual({ name: 'Anton', city: 2, rating: 5 })
        done()
      })
  })

  // test('It should request for get masters, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .get('/api/masters/')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual([])
  //       done()
  //     })
  // })

  // test('It should request for create master with error validation, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .post('/api/masters')
  //     .send({ name: 123, email: 'antonemail.com' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Incorrect fields: email, name.')
  //       done()
  //     })
  // })

  // test('It should request for get master with error validation, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .get('/api/masters/null')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
  //       done()
  //     })
  // })

  // test('It should request for get master with error not found, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .get('/api/masters/2')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Master with id = 2 not found!')
  //       done()
  //     })
  // })

  // test('It should request for get master, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .get('/api/masters/1')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Anton', email: 'anton@email.com' })
  //       done()
  //     })
  // })

  // test('It should request for update master with error validation, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .put('/api/masters/null')
  //     .send({ name: 123, email: 'antonemail.com' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Incorrect fields: email, name, id.')
  //       done()
  //     })
  // })

  // test('It should request for update master with error not found, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .put('/api/masters/2')
  //     .send({ name: 'Sasha', email: 'sasha@email.com' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Master with id = 2 not found for update!')
  //       done()
  //     })
  // })

  // test('It should request for update master, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .put('/api/masters/1')
  //     .send({ name: 'Sasha', email: 'sasha@email.com' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Sasha', email: 'sasha@email.com' })
  //       done()
  //     })
  // })

  // test('It should request for delete master with error validation, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .delete('/api/masters/null')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
  //       done()
  //     })
  // })

  // test('It should request for delete master, path = "/api/masters/"', (done) => {
  //   return request(app)
  //     .delete('/api/masters/1')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual(1)
  //       done()
  //     })
  // })
})
