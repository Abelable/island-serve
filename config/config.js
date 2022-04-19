module.exports = {
  env: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fk910914'
  },
  security: {
    secretKey: '@2Wd%e9Cd3s.P,&1!',
    expiresIn: 60 * 60 * 24 * 7
  },
  wx: {
    appId: 'wx4b321ab1269e5a6e',
    appSecret: 'a3c0e18d9d0714e883810d0f33fba1ec',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}