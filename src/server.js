require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const Sequelize = require('sequelize');

// connect db
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect:  'postgres',
  protocol: 'postgres'
})

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to Sequelize:', err);
  })

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