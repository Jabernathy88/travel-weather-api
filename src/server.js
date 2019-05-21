require('dotenv').config()
import cors from 'cors'
const express = require('express')
const app = express()
import Sequelize from 'sequelize';
// const routes = require('./routes/index')

// Heroku Postgres Client
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

// Sequelize ORM
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    native: true,
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