const request = require('supertest')
const app = require('../../app.js')
const Order = require('../../models/orders.js')
const City = require('../../models/cities.js')
const Master = require('../../models/masters.js')
const Clock = require('../../models/clocks.js')
const Customer = require('../../models/customers.js')
const db = require('../../db/db-connection.js')

describe('Test the clockController', () => {
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

  test('It should request for get clocks, path = "/api/clocks/"', (done) => {
    return request(app)
      .get('/api/clocks/')
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([{ id: 1, name: 'Small', duration: 1 }])
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

  test('Test delete clock, when he has order', done => {
    const data = {
      city1: { id: 1, name: 'Dnipro' },
      clock1: { id: 2, name: 'Medium', duration: 2 },
      customer1: { id: 1, name: 'Anton', email: 'anton@email.com' },
      master1: { id: 1, name: 'Nick', city_id: 1, rating: 5 },
      order1: { city_id: 1, master_id: 1, clock_id: 2, customer_id: 1, date: '2019-11-24', time: 9 }
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
          .delete('/api/clocks/2')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual('This clock already have an order.')
            done()
          })
      })
  })
})
