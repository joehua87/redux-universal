import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../../routes'
import { Router, browserHistory } from 'react-router'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    )
  }
}
