const development = {
  db: {
    mysql: {
      dialect: 'mysql',
      database: 'clockwise',
      username: 'root',
      password: 'e8zbprhH',
      host: 'localhost',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  },
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

const test = {
  db: {
    mysql: {
      dialect: 'postgres',
      database: 'dc8mqa68q4p4qt',
      username: 'kxzddwqyrdjfet',
      password: '80b1daa1d854be71ac54a1ef845e478538377dfbd1a0dcc11e11186cda639463',
      host: 'ec2-174-129-229-106.compute-1.amazonaws.com',
      port: 5432,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },
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
  db: {
    postgresql: {
      dialect: 'postgres',
      database: 'ddhe17nk5stidt',
      username: 'cytndkmrdjztds',
      password: '4c34a00ed10369edd02a851b6200870c26ab195d470c0379d1004e908769d84d',
      host: 'ec2-174-129-242-183.compute-1.amazonaws.com',
      port: 5432,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000        
      }
    }
  },
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

module.exports = mode === 'poduction' ? production : mode === 'test' ? test : development
