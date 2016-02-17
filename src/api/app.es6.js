import koa from 'koa'
import KoaRouter from 'koa-router'
import koaCors from 'koa-cors'
import koaBodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import koaQs from 'koa-qs'
import koaJson from 'koa-json'
import jwt from 'koa-jwt'

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

const authRouter = new KoaRouter()
app.use(authRouter.middleware())
require('./routes/auth.routes').default(authRouter)

app.use(jwt({ secret: 'shared-secret' }))

const apiRouter = new KoaRouter()
app.use(apiRouter.middleware())
require('./routes/post.routes').default(apiRouter)
require('./routes/category.routes').default(apiRouter)
require('./routes/tag.routes').default(apiRouter)

export default app
