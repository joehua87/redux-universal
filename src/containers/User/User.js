import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'

import { Card } from 'react-toolbox/lib/card'
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list'
import { routeActions } from 'react-router-redux'

import { getUsers } from '../../actions/user'

const hooks = {
  fetch: ({ dispatch }) => dispatch(getUsers())
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
      <div className="row" style={{ overflowY: 'hidden' }}>
        <div className="col-sm-4" style={{ overflowY: 'auto', display: 'flex', flexFlow: 'column nowrap' }}>
          <Card className="box" style={{ overflowY: 'auto', flexGrow: 1 }}>
            <List ripple>
              <ListSubHeader caption="Users"/>
              {this.props.entities.map((item) => (
                <ListItem className="user" key={item.id} avatar={item.avatar_url} caption={item.login}
                          onClick={() => this.onUserClick(item.login)}/>
              ))}
            </List>
          </Card>
        </div>
        <div className="col-sm-8" style={{ overflowY: 'auto', display: 'flex', flexFlow: 'column nowrap' }}>
          <Card className="box" style={{ overflowY: 'auto', flexGrow: 1 }}>
            <div>
              {this.props.children}
            </div>
          </Card>
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

const ReduxComponent = connect(state => state.user)(User)

export default provideHooks(hooks)(ReduxComponent)
