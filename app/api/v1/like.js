const { success } = require("@root/app/lib/helper");
const { Favor } = require("@root/app/models/favor");
const { LikeValidator } = require("@root/app/validators");
const { Auth } = require("@root/middlewares/auth");
const Router = require("koa-router");

const router = new Router({
  prefix: "/v1/like"
})

router.post("/", new Auth().middlewave, async (ctx) => {
  const v = await new LikeValidator().validate(ctx, { id: "art_id" })
  await Favor.like(v.get("body.art_id"), v.get("body.type"), ctx.auth.uid)
  success("点赞成功")
})

router.post("/cancel", new Auth().middlewave, async (ctx) => {
  const v = await new LikeValidator().validate(ctx, { id: "art_id" })
  await Favor.dislike(v.get("body.art_id"), v.get("body.type"), ctx.auth.uid)
  success("成功取消点赞")
})

module.exports = router