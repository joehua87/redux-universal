const entry = {
  main: [
    './src/client/index.js'
  ],
  vendor: []
}

if (global.__DEVELOPMENT__) {
  entry.main.unshift('webpack-hot-middleware/client')
}

module.exports = entry
