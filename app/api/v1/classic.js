const Router = require("koa-router")
const { Auth } = require("@root/middlewares/auth")
const { Flow } = require("@root/app/models/flow")
const { Art } = require("@root/app/models/art")
const { Favor } = require("@root/app/models/favor")
const { PositiveIntegerValidator } = require("@root/app/validators")
const { NotFound } = require("@root/core/http-exception")

const router = new Router({
  prefix: "/v1/classic"
})

router.get("/latest", new Auth().middlewave, async (ctx) => {
  const flow = await Flow.findOne({ order: [["index", "DESC"]] })
  ctx.body = await getArt(flow, ctx.auth.uid)
})

router.get("/:index/next", new Auth().middlewave, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: "index" })
  const flow = await Flow.findOne({ where: { index: parseInt(v.get("path.index")) + 1 } })
  if (!flow) throw new NotFound("没有找到下一期期刊")
  ctx.body = await getArt(flow, ctx.auth.uid)
})

router.get("/:index/previous", new Auth().middlewave, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: "index" })
  const flow = await Flow.findOne({ where: { index: v.get("path.index") - 1 } })
  if (!flow) throw new NotFound("没有找到上一期期刊")
  ctx.body = await getArt(flow, ctx.auth.uid)
})

const getArt = async (flow, uid) => {
  const favor = await Favor.userLikeIt(flow.art_id, flow.type, uid)
  const art = await Art.getData(flow.art_id, flow.type)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', favor)
  return art
}

module.exports = router
