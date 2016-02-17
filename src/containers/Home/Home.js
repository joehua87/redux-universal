import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { Link } from 'react-router'

import { loadCategories, loadTags } from '../../actions/home'

const hooks = {
  fetch: ({ dispatch }) => Promise.all(
    [dispatch(loadCategories()), dispatch(loadTags())]
  )
}

export default class Home extends Component {
  static propTypes = {
    isLoadingTags: PropTypes.bool.isRequired,
    isLoadingCategories: PropTypes.bool.isRequired,
    categoryCount: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    tagCount: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
  }

  render() {
    const { categories, tags, categoryCount, tagCount, isLoadingTags, isLoadingCategories } = this.props
    return (
      <div>
        <h3>Categories</h3>
        { isLoadingCategories && <div>Loading Categories...</div> }
        { !isLoadingCategories && <div>
          <p>Has total {categoryCount} categories</p>
          <ul>
            {categories.map(({ slug, name }, idx) => (
              <li key={idx}>
                <Link to={`/category/${slug}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>}
        <h3>Tags</h3>
        { isLoadingTags && <div>Loading Tags...</div> }
        { !isLoadingTags && <div>
          <p>Has total {tagCount} tags</p>
          <ul>
            {tags.map(({ slug, name }, idx) => (
              <li key={idx}>
                <Link to={`/tag/${slug}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    )
  }
}

const ReduxComponent = connect(state => state.home)(Home)
export default provideHooks(hooks)(ReduxComponent)
