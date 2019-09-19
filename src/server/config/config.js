const db = require('../db/db-config.js')

const development = {
  db: db.development,
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
  db: db.staging,
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
  db: db.prodution,
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

const mode = process.env.NODE_ENV

module.exports = (mode === 'poduction') ? production : (mode === 'staging') ? staging : development
