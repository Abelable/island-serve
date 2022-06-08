const Router = require("koa-router")
const { PositiveIntegerValidator, SearchValidator, AddShortCommentValidator } = require("@root/app/validators")
const { HotBook } = require("@root/app/models/hot-book")
const { Book } = require("@root/app/models/book")
const { Auth } = require("@root/middlewares/auth")
const { Favor } = require("@root/app/models/favor")
const { Comment } = require("@root/app/models/book-comment")
const { success } = require("@root/app/lib/helper")

const router = new Router({
  prefix: "/v1/book"
})

router.get("/hot_list", async (ctx) => {
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

router.get("/favor/count", new Auth().middlewave, async (ctx) => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  ctx.body = { count }
})

router.get("/:book_id/favor", new Auth().middlewave, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: "book_id" })
  const favor = await Favor.getBookFavor(ctx.auth.uid, v.get("path.book_id"))
  ctx.body = favor
})

router.post("/add/short_comment", new Auth().middlewave, async (ctx) => {
  const v = await new AddShortCommentValidator().validate(ctx, { id: "book_id" })
  await Comment.addComment(v.get("body.book_id"), v.get("book.content"))
  success("评论添加成功")
})

router.get("/:book_id/short_comment", new Auth().middlewave, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: "book_id" })
  const book_id = v.get("path.book_id")
  const bookcomments = await Comment.getBookComments(book_id)
  ctx.body = {
    bookcomments,
    book_id
  }
})

module.exports = router
