import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Counter from './containers/Counter'
import Home from './containers/Home'
import User from './containers/User'
import UserDetail from './containers/UserDetail'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="counter" component={Counter}/>
    <Route path="user" component={User}>
      <Route path=":username" component={UserDetail}/>
    </Route>
  </Route>
)
