const util = require('util')
const axios = require('axios')
const { User } = require('@models/user')
const { Auth } = require('@middlewares/auth')
const { generateToken } = require('@core/util')
const { AuthFailed } = require('@root/core/http-exception')

class WXManager {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
    const res = await axios.get(url)
    if (res.status !== 200) throw new AuthFailed("openid获取失败")
    const { errcode, errmsg } = res
    if (errcode) throw new AuthFailed(`openid获取失败, errmsg: ${errmsg}`)

    const { openid } = res.data
    let user = await User.getUserByOpenid(openid)
    if (!user) user = await User.registerByOpenid(openid)
    
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}