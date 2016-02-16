import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { local } from 'redux-react-local'
import { provideHooks } from 'redial'

import { Button } from 'react-toolbox/lib/button'

import { getUser } from '../../actions/userDetail'

const hooks = {
  fetch: ({ dispatch, params: { username }, }) => dispatch(getUser(username))
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
        <h1>{this.props.user.login}</h1>
        <div>
          <h2>Try redux-react-local</h2>
          <p>Something that should not be in global state</p>
          <p>{this.props.state}</p>
          <Button primary raised label="Increase" onClick={this.handleIncreaseClick}/>
          <Button primary label="Decrease" onClick={this.handleDecreaseClick}/>
        </div>
      </div>
    )
  }
}

const ReduxComponent = connect(state => state.userDetail)(UserDetail)
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
