const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const usersRouter = require('./routes/userRoutes.js')
const citiesRouter = require('./routes/citiesRoutes.js')
const workersRouter = require('./routes/workersRoutes.js')
const clocksRouter = require('./routes/clocksRoutes.js')
const combinationRouter = require('./routes/combinationRoutes.js')

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.use(express.static('dist'))

app.use('/users', usersRouter)
app.use('/cities', citiesRouter)
app.use('/workers', workersRouter)
app.use('/clocks', clocksRouter)
app.use('/data', combinationRouter)

/*
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
} */

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`))
