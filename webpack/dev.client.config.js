const path = require('path')
const webpack = require('webpack')
const webpackModule = require('./config/module.dev')

const entry = require('./config/entry')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry,
  output: {
    path: path.join(__dirname, 'static/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: webpackModule,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  toolbox: { theme: './src/theme/theme.scss' }
}
