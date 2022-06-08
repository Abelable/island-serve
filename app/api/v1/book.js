const Router = require("koa-router")
const { HotBook } = require("@root/app/models/hot-book")
const { PositiveIntegerValidator } = require("@root/app/validators")
const { Book } = require("@root/app/models/book")

const router = new Router({
  prefix: "/v1/book"
})

router.post("/hot_list", async (ctx) => {
  const books = await HotBook.getAll()
  ctx.body = books
})

router.get("/:id/detail", async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const detail = await new Book().detail(v.get("path.id"))
  ctx.body = detail
})

module.exports = router
