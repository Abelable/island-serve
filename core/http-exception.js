class HttpException extends Error {
  constructor(msg = '服务器异常', code = 400, errorCode = 10000) {
    super()
    this.code = code
    this.errorCode = errorCode
    this.msg = msg
  }
}

class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 0) {
    super()
    this.code = 201
    this.errorCode = errorCode
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10001) {
    super()
    this.code = 400
    this.errorCode = errorCode
    this.msg = msg
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10004) {
    super()
    this.code = 401
    this.errorCode = errorCode
    this.msg = msg
  }
}

class Forbbiden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super()
    this.code = 403
    this.errorCode = errorCode
    this.msg = msg
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10000) {
    super()
    this.code = 404
    this.errorCode = errorCode
    this.msg = msg
  }
}

class LikeError extends HttpException{
  constructor(msg = "你点过赞了", errorCode = 60001){
      super()
      this.code = 400
      this.msg = msg
      this.errorCode = errorCode
  }
}

class DislikeError extends HttpException{
  constructor(msg = "你已取消点赞", errorCode = 60002){
      super()
      this.code = 400
      this.msg = msg
      this.errorCode = errorCode
  }
}

module.exports = {
  HttpException,
  Success,
  ParameterException,
  AuthFailed,
  Forbbiden,
  NotFound,
  LikeError,
  DislikeError
}