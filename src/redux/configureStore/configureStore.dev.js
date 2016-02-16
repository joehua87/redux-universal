import { createStore, compose, applyMiddleware } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import DevTools from '../../components/DevTools'
import fetcher from '../middleware/fetcher'
import logger from '../middleware/logger'

export default function configureStore(history, initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, logger, fetcher, syncHistory(history)),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
