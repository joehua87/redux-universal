import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'

import { Card } from 'react-toolbox/lib/card'
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list'
import { routeActions } from 'react-router-redux'

import { getUsers } from '../../actions/user'
import * as user from '../../redux/modules/user'

const hooks = {
  defer: ({ dispatch, query: { keyword, repos, followers }, ...rest }) => {
    console.log('-------', rest)
    return dispatch(getUsers({ keyword, repos, followers }))
  }
}

class User extends Component {
  static propTypes = {
    entities: PropTypes.array.isRequired,
    children: PropTypes.node,
  }

  onUserClick = (username) => {
    this.props.dispatch(routeActions.push(`/user/${username}`))
  }

  renderEntities() {
    if (!this.props.entities.length) {
      return <div>Has no users</div>
    }

    return (
      <div className="row" style={{ overflowY: 'auto', padding: 10 }}>
        <Card className="col-sm-4" style={{ overflowY: 'auto' }}>
          <List ripple>
            <ListSubHeader caption="Users"/>
            {this.props.entities.map((item) => (
              <ListItem key={item.id} avatar={item.avatar_url} caption={item.login}
                        onClick={() => this.onUserClick(item.login)}/>
            ))}
          </List>
        </Card>
        <div className="col-sm-4">
          <div className="box">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>
    }
    return this.renderEntities()
  }
}

const ReduxComponent = connect(state => state.user, dispatch => ({
  ...bindActionCreators(user, dispatch),
  dispatch
}))(User)

export default provideHooks(hooks)(ReduxComponent)
