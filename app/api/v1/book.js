const Router = require("koa-router")
const { PositiveIntegerValidator, SearchValidator } = require("@root/app/validators")
const { HotBook } = require("@root/app/models/hot-book")
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

router.get("/search", async (ctx) => {
  const v = await new SearchValidator().validate(ctx)
  const q = v.get("query.q")
  const start = v.get("query.start")
  const count = v.get("query.count")
  const result = await Book.searchFromYuShu(q, start, count)
  ctx.body = result
})

module.exports = router
