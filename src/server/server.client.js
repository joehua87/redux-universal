/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import path from 'path'

const debug = require('debug')('redux-universal:server:server.client')
const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
if (global.__DEVELOPMENT__) {
  debug('In Development Mode - Load Hot Dev')
  require('./middleware/hot-dev.middleware').default(app, require('../../webpack/dev.client.config'))
} else {
  app.use(Express.static(path.join(__dirname, '../../static')))
}

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
