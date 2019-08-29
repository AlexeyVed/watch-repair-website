const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('./modules/passport.js')
const handleError = require('./modules/middleware/handleError.js')
const checkConnectionDB = require('./modules/middleware/checkDbConnection.js')
const path = require('path')
const cors = require('cors')
const pathToStatic = path.join(__dirname, '../../dist')

const customersRouter = require('./routes/customersRoutes.js')
const usersRouter = require('./routes/usersRoutes.js')
const citiesRouter = require('./routes/citiesRoutes.js')
const workersRouter = require('./routes/mastersRoutes.js')
const clocksRouter = require('./routes/clocksRoutes.js')
const ordersRouter = require('./routes/ordersRoutes.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())
app.use(express.static(pathToStatic))
app.use(passport.initialize())
app.use(checkConnectionDB)

app.use('/api/users', usersRouter)
app.use('/api/clocks', clocksRouter)
app.use('/api/customers', customersRouter)
app.use('/api/cities', citiesRouter)
app.use('/api/masters', workersRouter)
app.use('/api/orders', ordersRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(pathToStatic, 'index.html'))
})

app.use(handleError)

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`))
