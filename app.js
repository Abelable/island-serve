const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const catchError = require('./middlewares/exception')
const InitManager = require('./core/init')

const app = new Koa()
app.use(catchError)
app.use(bodyparser())
InitManager.initCore(app)

app.listen(3001)
