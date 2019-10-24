const request = require('supertest')
const app = require('../../app.js')
const Order = require('../../models/orders.js')
const City = require('../../models/cities.js')
const Master = require('../../models/masters.js')
const Clock = require('../../models/clocks.js')
const Customer = require('../../models/customers.js')
const db = require('../../db/db-connection.js')

describe('Test the orderController', () => {
  let token

  const data = {
    city1: { id: 1, name: 'Dnipro' },
    city2: { id: 2, name: 'Uzghorod' },
    clock1: { id: 1, name: 'Medium', duration: 2 },
    clock2: { id: 2, name: 'Big', duration: 3 },
    customer1: { id: 1, name: 'Anton', email: 'anton@email.com' },
    customer2: { id: 2, name: 'Stepan', email: 'stepan@email.com' },
    customertoAdd: { id: 3, name: 'Sergey', email: 'sergey@gmail.com' },
    master1: { id: 1, name: 'Nick', city_id: 1, rating: 5 },
    master2: { id: 2, name: 'Zorro', city_id: 1, rating: 5 },
    master3: { id: 3, name: 'Someone', city_id: 2, rating: 4 }
  }

  const { city1, city2, clock1, clock2, customer1, customer2, master1, master2, master3, customertoAdd } = data

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

  test('Prepare inviroment to test orders', done => {
    return request(app)
      .post('/api/cities')
      .send({ name: city1.name })
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(city1)
      })
      .then(() => {
        return request(app)
          .post('/api/cities')
          .send({ name: city2.name })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual(city2)
          })
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
          .post('/api/clocks/')
          .send({ name: clock2.name, duration: clock2.duration })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual(clock2)
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
          .post('/api/customers/')
          .send({ name: customer2.name, email: customer2.email })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual(customer2)
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
          .post('/api/masters/')
          .send({ name: master2.name, city_id: master2.city_id, rating: master2.rating })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual({ ...master2, city: city1 })
          })
      })
      .then(() => {
        return request(app)
          .post('/api/masters/')
          .send({ name: master3.name, city_id: master3.city_id, rating: master3.rating })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .then((res) => {
            expect(JSON.parse(res.text)).toEqual({ ...master3, city: city2 })
            done()
          })
      })
  })

  test('It should request for create order from admin, path = "/api/orders/"', (done) => {
    const create = {
      city_id: 1,
      master_id: 1,
      clock_id: 1,
      customer_id: 1,
      date: '2019-11-24',
      time: 9
    }
    const expected = {
      id: 1,
      city_id: 1,
      master_id: 1,
      clock_id: 1,
      customer_id: 1,
      date: '2019-11-24',
      time: 9,
      duration: 2,
      customer: customer1,
      clock: clock1,
      city: city1,
      master: master1
    }
    return request(app)
      .post('/api/orders/admin')
      .send(create)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(expected)
        done()
      })
  })

  test('It should request for get orders, path = "/api/orders/"', (done) => {
    const expected = {
      id: 1,
      city_id: 1,
      master_id: 1,
      clock_id: 1,
      customer_id: 1,
      date: '2019-11-24',
      time: 9,
      duration: 2,
      customer: customer1,
      clock: clock1,
      city: city1,
      master: master1
    }
    return request(app)
      .get('/api/orders/')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual([expected])
        done()
      })
  })

  test('It should request for create admin order with error validation, path = "/api/orders/"', (done) => {
    const create = {
      city_id: 'null',
      master_id: void 0,
      clock_id: 1,
      customer_id: 1,
      date: 2019,
      time: 9
    }
    return request(app)
      .post('/api/orders/admin')
      .send(create)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: city_id, master_id.')
        done()
      })
  })

  test('It should request for create admin order, when master work in other city, path = "/api/orders/"', (done) => {
    const create = {
      city_id: 1,
      master_id: 3,
      clock_id: 1,
      customer_id: 1,
      date: '2019-10-10',
      time: 9
    }
    return request(app)
      .post('/api/orders/admin')
      .send(create)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Master doesnt work in this town')
        done()
      })
  })

  test('It should request for get order with error validation, path = "/api/orders/"', (done) => {
    return request(app)
      .get('/api/orders/null')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
        done()
      })
  })

  test('It should request for create order from client, path = "/api/orders/"', (done) => {
    const create = {
      name: customertoAdd.name,
      city_id: 1,
      master_id: 2,
      clock_id: 2,
      email: customertoAdd.email,
      date: '2019-11-24',
      time: 10
    }
    const expected = {
      id: 2,
      city_id: 1,
      master_id: 2,
      clock_id: 2,
      customer_id: 3,
      date: '2019-11-24',
      time: 10,
      duration: 3,
      customer: customertoAdd,
      clock: clock2,
      city: city1,
      master: master2
    }
    return request(app)
      .post('/api/orders/')
      .send(create)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(expected)
        done()
      })
  })

  test('It should request for create order from client with error validation, path = "/api/orders/"', (done) => {
    const create = {
      name: ' ',
      city_id: null,
      master_id: 2,
      clock_id: null,
      email: customertoAdd.email,
      date: '2019-11-24',
      time: 10
    }
    return request(app)
      .post('/api/orders/')
      .send(create)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Incorrect fields: name, city_id, clock_id.')
        done()
      })
  })

  test('It should request for get order with error not found, path = "/api/orders/"', (done) => {
    return request(app)
      .get('/api/orders/10')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Order with id = 10 not found!')
        done()
      })
  })

  test('It should request for get order, path = "/api/orders/"', (done) => {
    const expected = {
      id: 2,
      city_id: 1,
      master_id: 2,
      clock_id: 2,
      customer_id: 3,
      date: '2019-11-24',
      time: 10,
      duration: 3,
      customer: customertoAdd,
      clock: clock2,
      city: city1,
      master: master2
    }
    return request(app)
      .get('/api/orders/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(expected)
        done()
      })
  })

  test('It should request for create admin order, when master already busy, path = "/api/orders/"', (done) => {
    const create = {
      city_id: 1,
      master_id: 1,
      clock_id: 1,
      customer_id: 1,
      date: '2019-11-24',
      time: 10
    }
    return request(app)
      .post('/api/orders/admin')
      .send(create)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual('Master already busy at this time.')
        done()
      })
  })

  // test('It should request for update order with error validation, path = "/api/orders/"', (done) => {
  //   return request(app)
  //     .put('/api/orders/1')
  //     .send({ name: 'Anton', city_id: void 0, rating: void 0 })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Incorrect fields: rating, city_id.')
  //       done()
  //     })
  // })

  // test('It should request for update order with error not found, path = "/api/orders/"', (done) => {
  //   return request(app)
  //     .put('/api/orders/2')
  //     .send({ name: 'Sergey', city_id: 1, rating: 4 })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Order with id = 2 not found for update!')
  //       done()
  //     })
  // })

  // test('It should request for update order, path = "/api/orders/"', (done) => {
  //   return request(app)
  //     .put('/api/orders/1')
  //     .send({ name: 'Sergey', city_id: 1, rating: 4 })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual({ id: 1, name: 'Sergey', city_id: 1, city: { id: 1, name: 'Dnipro' }, rating: 4 })
  //       done()
  //     })
  // })

  // test('It should request for delete order with error validation, path = "/api/orders/"', (done) => {
  //   return request(app)
  //     .delete('/api/orders/null')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual('Incorrect fields: id.')
  //       done()
  //     })
  // })

  // test('It should request for delete order, path = "/api/orders/"', (done) => {
  //   return request(app)
  //     .delete('/api/orders/1')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .then((res) => {
  //       expect(JSON.parse(res.text)).toEqual(1)
  //       done()
  //     })
  // })
})
