require('babel-register')
require('babel-polyfill')

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.__UNIVERSAL__ = false

require('../src/server/server.client')
