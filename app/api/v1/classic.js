const { Auth } = require("@root/middlewares/auth")
const Router = require("koa-router")

const router = new Router({
  prefix: "/v1/classic"
})

router.get("/latest", new Auth().middlewave, async (ctx) => {
  ctx.body = { key: "classic" }
})

module.exports = router
