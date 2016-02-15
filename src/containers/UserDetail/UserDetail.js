import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { getUser } from '../../actions/userDetail'
import * as userDetail from '../../actions/userDetail'

const hooks = {
  fetch: ({ dispatch, params: { username }, ...rest }) => {
    console.log('-------------', rest)
    return dispatch(getUser(username))
  }
}

export default class UserDetail extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>
    }

    if (!this.props.user) {
      return <div>User does not exists</div>
    }

    return (
      <div>
        {this.props.user.login}
      </div>
    )
  }
}

const ReduxComponent = connect(state => state.userDetail, dispatch => bindActionCreators(userDetail, dispatch))(UserDetail)
export default provideHooks(hooks)(ReduxComponent)
