require('babel-register')
const rootDir = require('path').resolve(__dirname, '..')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(true)
  .server(rootDir, () => {
    require('../src/server/server.redial')
  })
