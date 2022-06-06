const Router = require("koa-router");
const { RegisterValidator } = require("@validator");
const { User } = require("@models/user");
const { success } = require("@lib/helper");

const router = new Router({
  prefix: "/v1/user"
})

router.post("/register", async (ctx) => {
  const v = new RegisterValidator().validate(ctx)
  const { email, password2: password, nickname } = v.get("body")
  await User.create({ email, password, nickname })
  success("注册成功")
})
