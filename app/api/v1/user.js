const { RegisterValidator } = require("@validator");
const Router = require("koa-router");

const router = new Router({
  prefix: "/v1/user"
})

router.post("/register", async (ctx) => {
  const v = new RegisterValidator().validate(ctx)
})