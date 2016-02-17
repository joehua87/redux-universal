import koa from 'koa'
import KoaRouter from 'koa-router'
import koaCors from 'koa-cors'
import koaBodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import koaQs from 'koa-qs'
import koaJson from 'koa-json'
require('babel-polyfill')

const app = koa()

const env = process.env.NODE_ENV || 'dev'
if (env === 'dev') {
  app.use(koaLogger())
}

app.use(koaCors())
app.use(koaBodyParser())
app.use(koaJson())
koaQs(app, 'extended')

const router = new KoaRouter()
app.use(router.middleware())

require('./routes/post.routes').default(router)
require('./routes/category.routes').default(router)
require('./routes/tag.routes').default(router)

export default app
