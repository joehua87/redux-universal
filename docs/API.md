## Code
```
src/api
```
You can change the mongodb config at src/api/config.js

## Start
```
npm run dev-api
```
Then, go to http://localhost:3030/post/query

## Test
```
npm run test-api
```
## Generate Fake Data
```
npm run generate-data
```
If you want generate data for production env, run
```
NODE_ENV=production npm run generate-data
```
## Enhancement

### Repositories
```js
export default class PostRepository extends BaseRepository {
  constructor() {
    super(Post, PostSchema.config)
  }

  // Able to return a promise, generator or async function
  async getSomethingSpecial1() {
  }

  * getSomethingSpecial2() {
  }

  getSomethingSpecial3() {
    return new Promise((resolve, reject) => {
    })
  }
}
```

### Controllers
```js
function* newMethod(next) {
}

const controller = createController(repository)

export default { ...controller, newMethod }
```
### Routes
```js
export default function registerRoute(router) {
  registerRoutes(router, controller, 'post');
  router.post('/post/newMethod', controller.newMethod);
}
```