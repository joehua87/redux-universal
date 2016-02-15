import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './modules'
import fetcher from './middleware/fetcher'

const logger = createLogger()

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, fetcher, syncHistory(browserHistory))
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
