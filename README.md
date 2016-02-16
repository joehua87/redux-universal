## Live Demo
http://45.79.94.169:3000/

## Features
* Hot Module Reload
* Easy to switch between client & server to **increase dev experience**
* react-toolbox (material design)
* Redux React Local (https://github.com/threepointone/redux-react-local)
* Server Side Render Testing (guarantee content will be render before response to client - SEO Advantage)
* debug (https://www.npmjs.com/package/debug)

## Commands
* npm run dev: Start dev render on client
* npm run dev-universal: Start dev render on server
* npm run test

## Issues
* Nested Route (waiting for https://github.com/markdalgleish/redial/issues/16)
* Exit on test render on server (maybe find way to force stop webpack-isomorphic-tools)

## TODO
* Authentication middleware
* Add More Testing: (http://redux.js.org/docs/recipes/WritingTests.html)
* reselect
* Try redux-saga

## Reference

### Starter Kits
* https://github.com/erikras/react-redux-universal-hot-example/tree/simple-router
* https://github.com/tj/frontend-boilerplate
* https://github.com/mxstbr/react-boilerplate/tree/v3.0.0
* https://github.com/davezuko/react-redux-starter-kit

### Examples & Tutorials
* https://github.com/rackt/redux/tree/master/examples
* https://github.com/reactjs/react-router-tutorial
* https://github.com/gaearon/react-transform-boilerplate
