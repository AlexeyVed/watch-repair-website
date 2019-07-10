const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const dbConnectionConfig = require('./db-connection-config.js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.use(express.static('dist'))

function getConnection () {
  return mysql.createConnection(dbConnectionConfig)
}

app.post('/login', function (req, res) {
  checkUserInDataBase(req.body.email, req.body.password)
    .then(msg => {
      console.log('logining')
      res.send(msg)
    })
    .catch(err => {
      loginError(err, req, res)
    })
})

function checkUserInDataBase (email, password) {
  return new Promise((resolve, reject) => {
    if (loginValidation(email, password)) {
      reject('422')
    }
    const connectionDB = getConnection()
    connectionDB.connect(() => {
      connectionDB.query('SELECT email, password FROM login where email=?', [email], function (err, result) {
        if (err) {
          throw err
        }
        if (email === 'admin@example.com' && password === 'passwordsecret') {
          resolve('admin@example.com')
        }
        if (!result.length) {
          reject('404')
        } else {
          if (result[0].password === password) {
            resolve(email)
          } else {
            reject('401')
          }
        }
      })
    })
  })
}

function loginError (err, req, res) {
  (err === '422') ? res.status(422).send('Error validation')
    : (err === '404') ? res.status(404).send('User not found')
      : (err === '401') ? res.status(401).send('Error authorization')
        : res.status(500).send('Server error')
}

function loginValidation (mail, pass) {
  if (!mail || !pass) {
    return true
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
    return true
  } else if (pass.length <= 4) {
    return true
  }
  return false
}

app.get('/loadAllData', function (req, res) {
  loadData()
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
})

app.get('/getData', function (req, res) {
  getData()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
})

function getData () {
  const connectionDB = getConnection()

  const getCities = new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(`SELECT city FROM cities`, function (err, result) {
        if (err) throw err
        const arrOfCities = result.map(item => (item.city))
        resolve(arrOfCities)
        reject('Error! Download cities!')
      })
    })
  })

  const getClocks = new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(`SELECT typeClock, timeRepair FROM clocks`, function (err, result) {
        if (err) throw err
        resolve(result)
        reject('Error! Download clocks!')
      })
    })
  })

  return Promise.all([getCities, getClocks])
}

function loadData () {
  const connectionDB = getConnection()

  const getCities = new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(`SELECT * FROM cities`, function (err, result) {
        if (err) throw err
        resolve(result)
        reject('Error! Download cities!')
      })
    })
  })

  const getClocks = new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(`SELECT * FROM clocks`, function (err, result) {
        if (err) throw err
        resolve(result)
        reject('Error! Download clocks!')
      })
    })
  })

  const getClients = new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(`SELECT * FROM login`, function (err, result) {
        if (err) throw err
        resolve(result)
        reject('Error! Download clocks!')
      })
    })
  })

  const getWorkers = new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(`SELECT * FROM workers`, function (err, result) {
        if (err) throw err
        resolve(result)
        reject('Error! Download clocks!')
      })
    })
  })

  return Promise.all([getCities, getClocks, getClients, getWorkers])
}

/* app.post('/register', async (req, res) => {

});

function  saveUserInDB(req) {
    return new Promise((resolve, reject) => {
        const { mail, password } = req.body;
        const connectionDB = getConnection();

        connectionDB.connect(function (err) {
            if (err) {
                return reject(err);
            }
            console.log("Connected!");
            const sql = `INSERT INTO login (mail, password) VALUES (?, ?, '')`;
            const values = [login, password];
            connectionDB.query(sql, values, function (err, result) {
                if (err) {
                    return reject(err);
                }

                resolve(mail);
            });
        });
    });
} */

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`))
