const webpack = require('webpack')
const path = require('path')
require('webpack-isomorphic-tools')

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

const config = require('./base.config')
const outputPath = path.resolve(__dirname, '../static/dist')

config.entry.main.unshift(`webpack-hot-middleware/client`)

config.output = {
  path: outputPath,
  filename: '[name]-[hash].js',
  chunkFilename: '[name]-[chunkhash].js',
  publicPath: '/dist/'
}

config.plugins.push(webpackIsomorphicToolsPlugin.development())
config.plugins.push(new webpack.IgnorePlugin(/webpack-stats\.json$/))
config.module.loaders.push({
  test: webpackIsomorphicToolsPlugin.regular_expression('images'),
  loader: 'url?limit=10240'
})

module.exports = config
