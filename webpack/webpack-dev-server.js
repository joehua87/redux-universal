const Express = require('express')
const webpack = require('webpack')

const config = {}
const webpackConfig = require('./webpack.config.js')
const compiler = webpack(webpackConfig)

const host = config.host || 'localhost'
const port = (config.port + 1) || 3001

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
}

const app = new Express()

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port)
  }
}

app.listen(port, onAppListening)
