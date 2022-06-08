const { Rule, LinValidator } = require('@core/lin-validator')
const { loginType, ArtType } = require('@lib/enum')
const { User } = require('@models/user')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要传正整数', { min: 1 })]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '不符合Email规范')]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 })]
  }

  validatePassword(vals) {
    const { password1, password2 } = vals.body
    if (password1 !== password2) throw new Error('两次输入的密码必须相同')
  }

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: { email }
    })
    if (user) throw new Error('email已存在')
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6字符', { min: 6, max: 128 })
    ]
  }

  validateLoginType(vals) {
    const type = vals.body.type
    if (!type) throw new Error('type是必须参数')
    if (!loginType.isThisType(type)) throw new Error('type参数不合法')
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [new Rule('isLength', '不允许为空', { min: 1 })]
  }
}

const checkArtType = (vals) => {
  const type = vals.body.type || vals.path.type
  if (!type) throw new Error("type是必须参数")
  if (!ArtType.isThisType(parseInt(type))) throw new Error("type参数不合法")
}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.validateType = checkArtType
  }
}

class ClassicValidator extends LikeValidator {}

class SearchValidator extends LinValidator{
  constructor() {
    super()
    this.q = [
      new Rule('isLength', '搜索关字不能为空', { min: 1, max: 16 })
    ]
    this.start = [
      new Rule('isInt', 'start不符合规范', { min: 0, max: 60000 }),
      new Rule('isOptional', '', 0)
    ]
    this.count = [
      new Rule('isInt', 'count不符合规范', { min: 1, max: 20 }),
      new Rule('isOptional', '', 20)
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator
}