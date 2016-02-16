import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { match, browserHistory } from 'react-router'
import { trigger } from 'redial'

import Root from '../containers/Root'
import configureStore from '../redux/configureStore'
import routes from '../routes'

const rootElement = document.getElementById('content')

const initialState = window.__data
const store = configureStore(browserHistory, initialState)
const { dispatch } = store

browserHistory.listen(location => {
  // Match routes based on location object:
  match({ routes, location }, (routerError, redirectLocation, renderProps) => {
    if (!renderProps) {
      return
    }
    // Get array of route components:
    const components = renderProps.routes.map(route => route.component)

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch
    }

    // Don't fetch data for initial route, server has already done the work:
    if (window.__data) {
      // Delete global data so that subsequent data fetches can occur:
      delete window.__data
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals)
    }

    // Fetch deferred, client-only data dependencies
    trigger('defer', components, locals)
    // Finally, trigger 'done' lifecycle hooks:
      .then(() => trigger('done', components, locals))
  })
})

render(
  <Root store={store}/>,
  rootElement
)
