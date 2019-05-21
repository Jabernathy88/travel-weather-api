import 'dotenv/config'
import cors from 'cors'
const express = require('express')
const app = express()
// const routes = require('./routes/index')

import Sequelize from 'sequelize';

// initialize db
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

// test db connection
sequelize.authenticate()
  .then(() => {
    console.log('Postgres connection successful')
  })
  // catch db error
  .catch(err => {
    console.error('Unable to connect database:', err)
  })

// initialize app & modules
app.use(cors())

// register routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app listen
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})