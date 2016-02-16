import Koa from 'koa'
import KoaRouter from 'koa-router'
import logger from 'koa-logger'

// TODO Implement a separate Api instead of GitHub

const app = new Koa()
const router = new KoaRouter()

router.get('/', function*(next) {
  this.body = { message: 'Hello world' }
  yield next
})

app.use(logger())
app.use(router.routes())

app.listen(3000)
