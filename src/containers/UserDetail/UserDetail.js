import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { local } from 'redux-react-local'
import { provideHooks } from 'redial'

import { Button } from 'react-toolbox/lib/button'

import { getUser } from '../../actions/userDetail'
import * as userDetail from '../../actions/userDetail'

const hooks = {
  fetch: ({ dispatch, params: { username }, ...rest }) => {
    return dispatch(getUser(username))
  }
}

export default class UserDetail extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  handleIncreaseClick = () => {
    const { $, dispatch } = this.props
    dispatch($({ type: 'increase' }))
  };

  handleDecreaseClick = () => {
    const { $, dispatch } = this.props
    dispatch($({ type: 'decrease' }))
  };

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>
    }

    if (!this.props.user) {
      return <div>User does not exists</div>
    }

    return (
      <div style={{ height: 2000 }}>
        <p>This is the very long page</p>
        {this.props.user.login}
        <div>
          <h2>Try Local Redux</h2>
          <p>Simulate fetching something that should not be in global state</p>
          <p>{this.props.state}</p>
          <Button primary raised label="Increase" onClick={this.handleIncreaseClick}/>
          <Button primary label="Decrease" onClick={this.handleDecreaseClick}/>
        </div>
      </div>
    )
  }
}

const ReduxComponent = connect(state => state.userDetail, dispatch => bindActionCreators(userDetail, dispatch))(UserDetail)
const LocalComponent = local({
  ident: 'app',
  initial: 0,
  reducer(state, { me, meta }) {
    if (me) {
      switch (meta.type) {
        case 'increase':
          return state + 1
        case 'decrease':
          return state - 1
        default:
          return state
      }
    }
    return state
  }
})(ReduxComponent)

export default provideHooks(hooks)(LocalComponent)
