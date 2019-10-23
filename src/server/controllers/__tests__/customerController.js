const request = require('supertest')
const app = require('../../app.js')

describe('Test the customerController', () => {
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

  test('It should request for create customer, path = "/api/customers/"', (done) => {
    return request(app)
      .post('/api/customers/')
      .send({ name: 'Anton', email: 'anton@email.com' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Anton', email: 'anton@email.com' })
        done()
      })
  })

  test('It should request for get customers, path = "/api/customers/"', (done) => {
    return request(app)
      .get('/api/customers/')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([{ id: 1, name: 'Anton', email: 'anton@email.com' }])
        done()
      })
  })

  test('It should request for create customer with error validation, path = "/api/customers/"', (done) => {
    return request(app)
      .post('/api/customers')
      .send({ name: 123, email: 'antonemail.com' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: email, name.')
        done()
      })
  })

  test('It should request for get customer with error validation, path = "/api/customers/"', (done) => {
    return request(app)
      .get('/api/customers/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for get customer with error not found, path = "/api/customers/"', (done) => {
    return request(app)
      .get('/api/customers/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Customer with id = 2 not found!')
        done()
      })
  })

  test('It should request for get customer, path = "/api/customers/"', (done) => {
    return request(app)
      .get('/api/customers/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Anton', email: 'anton@email.com' })
        done()
      })
  })

  test('It should request for update customer with error validation, path = "/api/customers/"', (done) => {
    return request(app)
      .put('/api/customers/null')
      .send({ name: 123, email: 'antonemail.com' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: email, name, id.')
        done()
      })
  })

  test('It should request for update customer with error not found, path = "/api/customers/"', (done) => {
    return request(app)
      .put('/api/customers/2')
      .send({ name: 'Sasha', email: 'sasha@email.com' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Customer with id = 2 not found for update!')
        done()
      })
  })

  test('It should request for update customer, path = "/api/customers/"', (done) => {
    return request(app)
      .put('/api/customers/1')
      .send({ name: 'Sasha', email: 'sasha@email.com' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Sasha', email: 'sasha@email.com' })
        done()
      })
  })

  test('It should request for delete customer with error validation, path = "/api/customers/"', (done) => {
    return request(app)
      .delete('/api/customers/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for delete customer, path = "/api/customers/"', (done) => {
    return request(app)
      .delete('/api/customers/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(1)
        done()
      })
  })
})
