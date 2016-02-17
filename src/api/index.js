require('babel-register')
const mongoose = require('mongoose')

const env = process.env.NODE_ENV || 'dev'
const config = require('../config')[env]

if (env !== 'test') {
  mongoose.connect(config.db)
}

const app = require('./app.es6').default
app.listen(config.port)
