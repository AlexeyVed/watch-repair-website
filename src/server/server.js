const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const customersRouter = require('./routes/customersRoutes.js')
const usersRouter = require('./routes/usersRoutes.js')
const citiesRouter = require('./routes/citiesRoutes.js')
const workersRouter = require('./routes/mastersRoutes.js')
const clocksRouter = require('./routes/clocksRoutes.js')
const ordersRouter = require('./routes/ordersRoutes.js')

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.use(express.static('dist'))

app.use('/api/customers', customersRouter)
app.use('/api/users', usersRouter)
app.use('/api/cities', citiesRouter)
app.use('/api/masters', workersRouter)
app.use('/api/clocks', clocksRouter)
app.use('/api/orders', ordersRouter)

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`))
