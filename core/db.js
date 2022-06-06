const { Sequelize } = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true, // 生成 deletedAt 字段
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 全部字段修改成下划线形式
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
