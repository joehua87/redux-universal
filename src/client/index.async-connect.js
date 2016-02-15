import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { ReduxAsyncConnect } from 'redux-async-connect'

import configureStore from '../redux/configureStore'
import routes from '../routes'

const initialState = window.__data
const store = configureStore(initialState)
console.log(initialState)
const rootElement = document.getElementById('content')

const renderAsyncConnect = (props) => <ReduxAsyncConnect {...props}/>

render(
  <Provider store={store} key="provider">
    <Router render={renderAsyncConnect} history={browserHistory} routes={routes}/>
  </Provider>,
  rootElement
)
