const Sequelize = require('sequelize')

// connect db
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect:  'postgres',
  protocol: 'postgres'
})

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to Sequelize:', err)
  })

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

const db = {
  sequelize,
  models
}

module.exports = db