const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const path = require('path')
const parameter = require('koa-parameter')

const spa = require('koa-spa')

const errorHandler = require('./middleware/error_handler.js')
const successHandler = require('./middleware/success_handler.js')

// const index = require('./routes/index')
// const users = require('./routes/users')
const apply = require('./routes/apply')
// require('./server/router')(spa.routeCollector(routes));

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser)
app.use(json())
app.use(logger())

app.use(parameter(app))
// app.use(errorHandler())
app.use(successHandler('^/api/apply'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

app.use(apply.routes(), apply.allowedMethods())

app.use(spa(path.join(__dirname, '/public')), {
  index: 'index.html',
  404: '404.html',
  routeBase: '/',
  routes: spa.routeCollector(apply)
})
module.exports = app
