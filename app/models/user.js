const bcrypt = require('bcrypt')
const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("@core/db");
const { AuthFailed } = require('@root/core/http-exception');

class User extends Model {
  static async verifyEmailAndPassword(email, plainPassword) {
    const user = await User.findOne({
      where: { email }
    })
    if (!user) throw new AuthFailed("用户不存在")
    const isPasswordCorrect = bcrypt.compareSync(plainPassword, user.password)
    if (!isPasswordCorrect) throw new AuthFailed('密码不正确')
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: { openid }
    })
    return user
  }

  static async registerByOpenid(openid) {
    const user = await User.create({ openid })
    return user
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const pwd = bcrypt.hashSync(val, salt)
        this.setDataValue('password', pwd)
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = {
  User
}
