const db = require('../db/db-config.js')

const mode = process.env.NODE_ENV || 'development'

const development = {
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

const staging = {
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
}

const production = {
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
}

module.exports = (mode === 'poduction') ? production : (mode === 'staging') ? staging : development
