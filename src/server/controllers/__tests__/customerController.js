const request = require('supertest')
const app = require('../../app.js')
const Order = require('../../models/orders.js')
const City = require('../../models/cities.js')
const Master = require('../../models/masters.js')
const Clock = require('../../models/clocks.js')
const Customer = require('../../models/customers.js')
const db = require('../../db/db-connection.js')

describe('Test the customerController', () => {
  let token

  afterAll(() => {
    return db
      .query('SET FOREIGN_KEY_CHECKS = 0')
      .then((res) => {
        return Order.destroy({ truncate: true, cascade: true })
      })
      .then((res) => {
        return Master.destroy({ truncate: true, cascade: true })
      })
      .then((res) => {
        return Clock.destroy({ truncate: true, cascade: true })
      })
      .then((res) => {
        return Customer.destroy({ truncate: true, cascade: true })
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

  test('It should request for create customer with duplicate email, path = "/api/customers/"', (done) => {
    return request(app)
      .post('/api/customers/')
      .send({ name: 'Anton', email: 'anton@email.com' })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(`Customer with email 'anton@email.com' already exist.`)
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

  test('Test delete customer, when he has order', done => {
    const data = {
      city1: { id: 1, name: 'Dnipro' },
      clock1: { id: 1, name: 'Medium', duration: 2 },
      customer1: { id: 3, name: 'Anton', email: 'anton@email.com' },
      master1: { id: 1, name: 'Nick', city_id: 1, rating: 5 },
      order1: { city_id: 1, master_id: 1, clock_id: 1, customer_id: 3, date: '2019-11-24', time: 9 }
    }
    const { city1, clock1, customer1, master1, order1 } = data
    const orderExp = {
      ...order1,
      id: 1,
      duration: 2,
      customer: customer1,
      clock: clock1,
      city: city1,
      master: master1 }

    return request(app)
      .post('/api/cities/')
      .send({ name: city1.name })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(city1)
      })
      .then(() => {
        return request(app)
          .post('/api/clocks/')
          .send({ name: clock1.name, duration: clock1.duration })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual(clock1)
          })
      })
      .then(() => {
        return request(app)
          .post('/api/customers/')
          .send({ name: customer1.name, email: customer1.email })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual(customer1)
          })
      })
      .then(() => {
        return request(app)
          .post('/api/masters/')
          .send({ name: master1.name, city_id: master1.city_id, rating: master1.rating })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual({ ...master1, city: city1 })
          })
      })
      .then(() => {
        return request(app)
          .post('/api/orders/admin')
          .send(order1)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual(orderExp)
          })
      })
      .then(() => {
        return request(app)
          .delete('/api/customers/3')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual('Customer already have an order.')
            done()
          })
      })
  })
})
