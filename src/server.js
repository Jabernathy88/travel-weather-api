require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
import models, { sequelize } from './models'

// const routes = require('./routes/index')

// initialize app & modules
app.use(cors())

// register routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app listen
const PORT = process.env.PORT || 3001

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
  })
})