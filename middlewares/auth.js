const { Forbbiden } = require('@root/core/http-exception')
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level = 1) {
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get middlewave() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)

      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) throw new Forbbiden(errMsg)

      let decode
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') errMsg = 'token已过期'
        throw new Forbbiden(errMsg)
      }

      const { uid, scope } = decode
      if (scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }

      ctx.auth = { uid, scope }
      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = { Auth }