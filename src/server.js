require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const db = require('./models')

// const routes = require('./routes/index')

// initialize app & modules
app.use(cors())

// register routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  try {
    const users = await models.User.findAll()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// app listen
const PORT = process.env.PORT || 3001

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
  })
})