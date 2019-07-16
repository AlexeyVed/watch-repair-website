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

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`))
