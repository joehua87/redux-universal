const rucksack = require('rucksack-css')
const path = require('path')
const webpack = require('webpack')

const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackModule = require('./config/module.prod')
const projectRootPath = path.resolve(__dirname, '..')
const assetsPath = path.resolve(projectRootPath, 'static/dist')

const entry = require('./config/entry')

module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
  module: webpackModule,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  toolbox: { theme: './src/theme/theme.scss' }
}
