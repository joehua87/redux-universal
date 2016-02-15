import React, { Component, PropTypes } from 'react'
// import { Card } from 'react-toolbox'
// import style from './style.scss'
// import { Card, CardText } from 'react-toolbox/lib/card'
import styleCss from './style.css'

class Counter extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    return (
      <div>
        Clicked: {counter} times
        {' '}
        <div>
          <button onClick={increment}>+</button>
          {' '}
          <button onClick={decrement}>-</button>
          {' '}
          <button onClick={incrementIfOdd}>Increment if odd</button>
          {' '}
          <button onClick={incrementAsync}>Increment async</button>
        </div>
      </div>
    )
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}

export default Counter
