const Router = require("koa-router")
const { Auth } = require("@root/middlewares/auth")
const { Flow } = require("@root/app/models/flow")
const { Art } = require("@root/app/models/art")
const { Favor } = require("@root/app/models/favor")

const router = new Router({
  prefix: "/v1/classic"
})

router.get("/latest", new Auth().middlewave, async (ctx) => {
  const flow = await Flow.findOne({ order: [["index", "DESC"]] })
  const favor = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  const art = await Art.getData(flow.art_id, flow.type)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', favor)
  ctx.body = art
})

module.exports = router
