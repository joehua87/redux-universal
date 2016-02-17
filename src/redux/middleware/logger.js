const debug = require('debug')('redux-universal:logger')

export default () => next => action => {
  debug('Action', action)
  return next(action)
}
