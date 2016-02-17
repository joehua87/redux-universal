import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { Link } from 'react-router'
import marked from 'marked'

import { loadPost } from '../../actions/post'

const hooks = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPost(slug))
}

class Post extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    post: PropTypes.object
  }

  render() {
    const { isLoading, post } = this.props

    if (isLoading || !post) {
      return (<div>Loading Post</div>)
    }

    const { title, body, categories, tags } = post
    const content = marked(body || '')

    return (
      <div>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: content }}/>
        <h4>Categories</h4>
        <ul>
          {categories.map(({ slug, name }, idx) => (
            <li key={idx}>
              <Link to={`/category/${slug}`}>{name}</Link>
            </li>
          ))}
        </ul>
        <h4>Tags</h4>
        <ul>
          {tags.map(({ slug, name }, idx) => (
            <li key={idx}>
              <Link to={`/tag/${slug}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const ReduxComponent = connect(state => state.post)(Post)
export default provideHooks(hooks)(ReduxComponent)
