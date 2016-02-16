export default () => next => action => {
  console.log('Action', action)
  return next(action)
}
