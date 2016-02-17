require('babel-register')
require('babel-polyfill')

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.__UNIVERSAL__ = true

const rootDir = require('path').resolve(__dirname, '..')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(true)
  .server(rootDir, () => {
    require('../src/server/server.universal')
  })
