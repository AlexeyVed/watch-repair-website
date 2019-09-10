const config = {
    db: {
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
    },
    mail: {
        service: 'gmail',
        user: 'watches.repair.quick@gmail.com',
        pass: 'watchrepair86',
        from: 'watches.repair.quick@gmail.com'
    },
    jwt: {
        secret: 'secret_word'
    }
  }
  
module.exports = config
  