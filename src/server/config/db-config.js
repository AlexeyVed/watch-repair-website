module.exports = {
  development: {
    username: 'root',
    password: 'e8zbprhH',
    database: 'clockwise',
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  staging: {
    username: 'kxzddwqyrdjfet',
    password: '80b1daa1d854be71ac54a1ef845e478538377dfbd1a0dcc11e11186cda639463',
    database: 'dc8mqa68q4p4qt',
    host: 'ec2-174-129-229-106.compute-1.amazonaws.com',
    dialect: 'postgres',
    operatorsAliases: false,
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: 'cytndkmrdjztds',
    password: '4c34a00ed10369edd02a851b6200870c26ab195d470c0379d1004e908769d84d',
    database: 'ddhe17nk5stidt',
    host: 'ec2-174-129-242-183.compute-1.amazonaws.com',
    dialect: 'postgres',
    operatorsAliases: false,
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
