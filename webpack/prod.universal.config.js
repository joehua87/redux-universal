const rucksack = require('rucksack-css')
const path = require('path')
const webpack = require('webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackModule = require('./config/module.prod')
const projectRootPath = path.resolve(__dirname, '..')
const assetsPath = path.resolve(projectRootPath, 'static/dist')

const outputPath = path.resolve(__dirname, '../static/dist')
const entry = require('./config/entry')

const config = {
  devtool: 'source-map',
  entry,
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
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
    webpackIsomorphicToolsPlugin
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

module.exports = config
