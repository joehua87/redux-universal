import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Counter from './containers/Counter'
import Home from './containers/Home'
import User from './containers/User'
import UserDetail from './containers/UserDetail'

import Category from './containers/Category'
import Tag from './containers/Tag'
import Post from './containers/Post'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="counter" component={Counter}/>
    <Route path="category/:slug" component={Category}/>
    <Route path="tag/:slug" component={Tag}/>
    <Route path="post/:slug" component={Post}/>
    <Route path="user" component={User}>
      <Route path=":username" component={UserDetail}/>
    </Route>
  </Route>
)
