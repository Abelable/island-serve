class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10001) {
    super()
    this.errorCode = errorCode
    this.msg = msg
    this.code = 400
  }
}

class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 0) {
    super()
    this.errorCode = errorCode
    this.msg = msg
    this.code = 201
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10000) {
    super()
    this.errorCode = errorCode
    this.msg = msg
    this.code = 404
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10004) {
    super()
    this.errorCode = errorCode
    this.msg = msg
    this.code = 401
  }
}

class Forbbiden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super()
    this.errorCode = errorCode
    this.msg = msg
    this.code = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden
}