const { HttpException } = require('@core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isDev = global.config.env === 'dev'
    const isHttpException = error instanceof HttpException

    if (isDev && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      ctx.status = error.code
      ctx.body = {
        error_code: error.errorCode,
        msg: error.msg,
        request: `${ctx.method} ${ctx.path}`
      }
    } else {
      ctx.status = 500
      ctx.body = {
        error_code: 999,
        msg: '服务器异常',
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
