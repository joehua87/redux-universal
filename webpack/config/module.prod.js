const strip = require('strip-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const moduleConfig = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [strip.loader('debug'), 'babel']
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&importLoaders=2&sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true!toolbox'
      )
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }
  ]
}

if (global.__UNIVERSAL__) {
  const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
  const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../webpack-isomorphic-tools'))

  moduleConfig.loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('images'),
    loader: 'url?limit=10240'
  })
}

module.exports = moduleConfig
