import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../../routes'
import DevTools from '../../components/DevTools'
import { Router, browserHistory } from 'react-router'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object,
  }

  render() {
    const { history, store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history || browserHistory} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
