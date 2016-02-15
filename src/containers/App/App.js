import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import App from 'react-toolbox/lib/app'
import AppBar from 'react-toolbox/lib/app_bar'

import style from './App.scss'

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <App className={style.app}>
        <AppBar fixed>
          <Link to="/">Home Page</Link>
          {' - '}
          <Link to="/counter">Counter</Link>
          {' - '}
          <Link to="/user">User</Link>
        </AppBar>
        <div className={style.main}>
          {this.props.children}
        </div>
      </App>
    )
  }
}
