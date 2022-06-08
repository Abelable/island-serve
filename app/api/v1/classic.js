const Router = require("koa-router")
const { Auth } = require("@root/middlewares/auth")
const { Flow } = require("@root/app/models/flow")
const { Art } = require("@root/app/models/art")
const { Favor } = require("@root/app/models/favor")
const { PositiveIntegerValidator, ClassicValidator } = require("@root/app/validators")
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
  // 排除字段
  // art.exclude = ['index']
  return art
}

router.get("/:type/:id/favor", new Auth().middlewave, async (ctx) => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get("path.id")
  const type = parseInt(v.get("path.type"))
  const art = await Art.getData(id, type)
  if (!art) throw new NotFound()
  const favor = await Favor.userLikeIt(id, type, ctx.auth.uid)
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: favor
  }
})

router.get("/:type/:id", new Auth().middlewave, async (ctx) => {
  const v = await new ClassicValidator().validate(ctx)
  const artDetail = await new Art(v.get("path.id"), parseInt(v.get("path.type"))).getDetail(ctx.auth.uid)
  artDetail.art.setDataValue("like_status", artDetail.like_status)
  ctx.body = artDetail.art
})

router.get("/favor", new Auth().middlewave, async (ctx) => {
  const favor = await Favor.getMyClassicFavors(ctx.auth.uid)
  ctx.body = favor
})

module.exports = router
