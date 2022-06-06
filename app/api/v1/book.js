const Router = require("koa-router")

const router = new Router({
  prefix: "/v1/book"
})

router.post("/latest", async (ctx, next) => {
  ctx.body = { key: "book" }
})

module.exports = router
