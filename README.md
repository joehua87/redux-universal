The code is only my opinion & the docs need to be improved. If you see any problem with it, please correct me. Thank you.
## Demo
http://45.79.94.169:3000 (still run on NODE_ENV=dev, so the performance would be slow)

## Increase Dev Experience when coding on Client Side Render (not server)

### Why?
* Currently we rely on **webpack-isomorphic-tools** & webpack-isomorphic-tools will run every time we change code (it's take a lots of time - and sometime you need to restart the process to see the changes)
* If you find any better solution, please notify me. Thank you

### My Solution
* Write tests for server rendering to make sure content will be rendered into html before sending to browser, see
```
tests/server-render.tests.js
```
* We define webpack into 2 config files. 1 for client (dev.config) & 1 for universal (dev.universal.config (see in webpack) & production.universal.config - not implemented yet).
* When coding, we start the client side render process to take all advantages on client render (speed & reloading)

## Get Started
* npm run dev-api
* Start a new terminal and run: **npm run dev** (If you want to try server rendering, run: **npm run dev-universal**)

## Features

### Real world examples
* An Blog site with server rendering for SEO Advantage (content will be rendered into Html before sending to client)

### Tech
* API (see docs/API.md)
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
* Post Administration
* Add More Testing: (http://redux.js.org/docs/recipes/WritingTests.html)
* reselect
* Try redux-saga
* FlowType
* Refactor webpack
* SEO meta with react-helmet
* Test Render on Server (for Blog Example) to make sure html is rendered on server
  * route to home
  * route to category page
  * route to tag page
  * route to post page

## Reference

### Starter Kits
* https://github.com/erikras/react-redux-universal-hot-example/tree/simple-router
* https://github.com/tj/frontend-boilerplate
* https://github.com/mxstbr/react-boilerplate/tree/v3.0.0
* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/halt-hammerzeit/webapp.git

### Libraries
* https://github.com/bdefore/universal-redux

### Examples & Tutorials
* https://github.com/rackt/redux/tree/master/examples
* https://github.com/reactjs/react-router-tutorial
* https://github.com/gaearon/react-transform-boilerplate