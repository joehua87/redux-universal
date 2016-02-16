import request from 'axios'
import qs from 'qs'
const debug = require('debug')('redux-universal:middleware:fetcher')

export const CALL_API = Symbol('Call API')

export function callApi({ endpoint, method, params, data }) {
  debug(`Call Api with`, { endpoint, method, params, data })

  return request[method](endpoint, {
    params,
    data,
    paramsSerializer: (param) => qs.stringify(param, { encode: false })
  })
    .then(response => response.data)
}

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  debug(`Trigger middleware with`, callAPI)

  let { endpoint } = callAPI
  const { types, method, params, data } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!['get', 'post', 'put', 'patch', 'del'].includes(method)) {
    throw new Error('Expected method should be get, post, put, patch, del')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(actionData) {
    const finalAction = Object.assign({}, action, actionData)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi({ endpoint, method, params, data })
    .then(response => next(actionWith({
      payload: response,
      type: successType
    })))
    .catch(error => next(actionWith({
      type: failureType,
      payload: error.message || 'Something bad happened'
    })))
}
