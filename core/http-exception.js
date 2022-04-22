class HttpException extends Error {
  constructor(code = 400, errorCode = 10000, msg = '服务器异常') {
    super()
    this.code = code
    this.errorCode = errorCode
    this.msg = msg
  }
}

class Success extends HttpException {
  constructor(errorCode = 0, msg = 'ok') {
    super()
    this.code = 201
    this.errorCode = errorCode
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(errorCode = 10001, msg = '参数错误') {
    super()
    this.code = 400
    this.errorCode = errorCode
    this.msg = msg
  }
}

class AuthFailed extends HttpException {
  constructor(errorCode = 10004, msg = '授权失败') {
    super()
    this.code = 401
    this.errorCode = errorCode
    this.msg = msg
  }
}

class Forbbiden extends HttpException {
  constructor(errorCode = 10006, msg = '禁止访问') {
    super()
    this.code = 403
    this.errorCode = errorCode
    this.msg = msg
  }
}

class NotFound extends HttpException {
  constructor(errorCode = 10000, msg = '资源未找到') {
    super()
    this.code = 404
    this.errorCode = errorCode
    this.msg = msg
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