import { createStore, applyMiddleware } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import fetcher from '../middleware/fetcher'

export default function configureStore(history, initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, fetcher, syncHistory(history))
  )
}
