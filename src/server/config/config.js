const db = require('./db-config.js')

const mode = process.env.NODE_ENV || 'development'

const config = {
  development: {
    db: db[mode],
    mail: {
      service: 'gmail',
      user: 'watches.repair.quick@gmail.com',
      pass: 'watchrepair86',
      from: 'watches.repair.quick@gmail.com'
    },
    jwt: {
      secret: 'secret_development'
    }
  },
  staging: {
    db: db[mode],
    mail: {
      service: 'gmail',
      user: 'watches.repair.quick@gmail.com',
      pass: 'watchrepair86',
      from: 'watches.repair.quick@gmail.com'
    },
    jwt: {
      secret: 'secret_test'
    }
  },
  production: {
    db: db[mode],
    mail: {
      service: 'gmail',
      user: 'watches.repair.quick@gmail.com',
      pass: 'watchrepair86',
      from: 'watches.repair.quick@gmail.com'
    },
    jwt: {
      secret: 'secret_production'
    }
  },
  test: {
    db: db[mode],
    mail: {
      service: 'gmail',
      user: 'watches.repair.quick@gmail.com',
      pass: 'watchrepair86',
      from: 'watches.repair.quick@gmail.com'
    },
    jwt: {
      secret: 'secret_development'
    }
  }
}

module.exports = config[mode]
