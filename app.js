const Koa = require("koa")
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = { key: 'classic' }
})

app.listen(3001)
