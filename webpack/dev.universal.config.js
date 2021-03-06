const webpack = require('webpack')
const path = require('path')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
const webpackModule = require('./config/module.dev')

const outputPath = path.resolve(__dirname, '../static/dist')
const entry = require('./config/entry')

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry,
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    webpackIsomorphicToolsPlugin.development()
  ],
  module: webpackModule,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  toolbox: { theme: './src/theme/theme.scss' }
}

module.exports = config
