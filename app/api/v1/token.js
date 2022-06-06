const Router = require("koa-router");
const { User } = require("@root/app/models/user");
const { TokenValidator } = require("@root/app/validators");
const { WXManager } = require("@root/app/services/wx");
const { ParameterException } = require("@core/http-exception");
const { Auth } = require("@middlewares/auth");
const { generateToken } = require("@core/util");
const { loginType } = require("@lib/enum");

const router = new Router({
  prefix: "/v1/token"
})

router.post("/", async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const { type, account, secret } = v.get("body")
  let token
  switch (type) {
    case loginType.USER_EMAIL:
      token = await emailLogin(account, secret)
      break
    case loginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(account)
      break
    default:
      throw new ParameterException("没有响应的处理函数")
  }

  ctx.body = { token }
})

const emailLogin = async (account, secret) => {
  const user = await User.verifyEmailAndPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
