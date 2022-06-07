require('module-alias/register')

const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const path = require('path')
const static = require('koa-static')
const catchError = require('./middlewares/exception')
const InitManager = require('./core/init')

const app = new Koa()
app.use(bodyparser())
app.use(static(path.join(__dirname, './static')))
app.use(catchError)
InitManager.initCore(app)

app.listen(3001)
