import request from 'axios'

const methods = ['get', 'post', 'put', 'patch', 'del']

class ApiFetcher {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        request[method](path, { params, data })
          .then(resolve)
          .catch(reject)
      }))
  }
}

export default function fetcherMiddleware({ dispatch, getState }) {
  const fetcher = new ApiFetcher()
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, types, ...rest } = action // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({ ...rest, type: REQUEST })
    return promise(fetcher).then(
      (response) => next({ ...rest, payload: response.data, response, type: SUCCESS }),
      (error) => next({ ...rest, payload: error, type: FAILURE })
    ).catch((error) => {
      console.error('FETCHING MIDDLEWARE ERROR:', error)
      next({ ...rest, error, type: FAILURE })
    })
  }
}
