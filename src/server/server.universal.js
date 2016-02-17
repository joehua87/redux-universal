/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, createMemoryHistory } from 'react-router'
import { trigger } from 'redial'
import random from 'lodash/random'

import configureStore from '../redux/configureStore'
import routes from '../routes'
import Html from '../helpers/Html'
import Root from '../containers/Root'

const debug = require('debug')('redux-universal:server:server.universal')
const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
if (global.__DEVELOPMENT__) {
  debug('In Development Mode - Load Hot Dev')
  require('./middleware/hot-dev.middleware').default(app, require('../../webpack/dev.universal.config'))
} else {
  app.use(Express.static(path.join(__dirname, '../../static')))
}

// app.use('/static', Express.static(path.resolve(__dirname, '../../static/dist')))
app.use(handleRender)

function handleRender(req, res) {
  if (global.__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const history = createMemoryHistory(req.url)

  // Compile an initial state
  const initialState = { counter: random(0, 100) }
  const store = configureStore(history, initialState)
  const { dispatch } = store

  match({ routes, history }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const components = props.routes.map(route => route.component)

      const locals = {
        params: props.params,
        query: props.query,
        dispatch
      }

      trigger('fetch', components, locals)
        .then(() => {
          const appHtml = (
            <Root history={history} store={store}/>
          )

          const html = renderToString(<Html assets={webpackIsomorphicTools.assets()} component={appHtml}
                                            store={store}/>)
          const response = `<!doctype html>\n${html}`
          res.send(response)
        })
        .catch((renderErr) => {
          console.log(renderErr)
        })
    } else {
      res.status(404).send('Not Found')
    }
  })
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

export default app
