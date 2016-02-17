import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { Link } from 'react-router'

import { loadPosts } from '../../actions/category'

const hooks = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPosts(slug))
}

export default class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    entities: PropTypes.array.isRequired,
  }

  render() {
    const { isLoading, count, entities } = this.props
    return (
      <div>
        <h3>Posts</h3>
        { isLoading && <div>Loading Posts...</div> }
        { !isLoading && <div>
          <p>Has total {count} posts</p>
          <ul>
            {entities.map(({ slug, title }, idx) => (
              <li key={idx}>
                <Link to={`/post/${slug}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    )
  }
}

const ReduxComponent = connect(state => state.category)(Home)
export default provideHooks(hooks)(ReduxComponent)
