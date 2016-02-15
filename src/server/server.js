/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import path from 'path'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack/dev.config'

// When rendering on server, webpack transform scss into json => so this is not work
// import routes from '../routes'
// So, how to simulate server rendering? (in componentDidMount or componentWillMount)
const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

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
