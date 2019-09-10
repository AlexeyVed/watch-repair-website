const config = {
    db: {
        dialect: 'mysql',
        database: 'clockwise',
        username: 'root',
        password: 'e8zbprhH',
        host: '127.0.0.1',
        port: 3306,
        pool: {
            max: 5,
            min: 0,
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
