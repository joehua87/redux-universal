/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack/webpack.config.js'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import path from 'path'

import { fetchCounter } from '../api/counter'
import configureStore from '../redux/configureStore'
import routes from '../routes'
import Html from '../helpers/Html.Universal'

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('/static', Express.static(path.resolve(__dirname, '../../static/dist')))
app.use(handleRender)

function handleRender(req, res) {
  /*
   if (__DEVELOPMENT__) {
   // Do not cache webpack stats: the script file would change since
   // hot module replacement is enabled in the development env
   webpackIsomorphicTools.refresh()
   }
   */

  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter, 10) || apiResult || 0

    // Compile an initial state
    const initialState = { counter }
    const store = configureStore(initialState)

    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search)
      } else if (props) {
        const appHtml = (
          <Provider store={store} key="provider">
            <RouterContext {...props}/>
          </Provider>
        )
        const html = renderToString(<Html assets={webpackIsomorphicTools.assets()} component={appHtml}
                                          store={store}/>)
        const response = `<!doctype html>\n${html}`
        res.send(response)
      } else {
        res.status(404).send('Not Found')
      }
    })
  })
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
