const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

require('dotenv').config()

const authRoute = require('./src/routes/authRoutes')
const journalRoute = require('./src/routes/journalRoute')

const { log } = require('./src/middleware/log')
const { errorHanlder } = require('./src/middleware/errorHanlder')


const corsOptions = {
  origin: "http://localhost:5173"
}


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(log)
app.use('/api/auth', authRoute)
app.use('/api/journal', journalRoute)
app.use(errorHanlder)


app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
