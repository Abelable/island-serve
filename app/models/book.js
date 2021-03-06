const util = require('util')
const axios = require('axios');
const { Model, Sequelize } = require("sequelize");
const { sequelize } = require('@core/db');
const { Favor } = require('./favor');

class Book extends Model {
  async detail(id) {
    const url = util.format(global.config.yushu.detailUrl, id)
    const res = await axios.get(url)
    return res.data
  }

  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({ where: { type: 400, uid } })
    return count
  }

  static async searchFromYuShu(q, start, count, summary = 1) {
    const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
    const res = await axios.get(url)
    return res.data
  }
}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'book'
})

module.exports = {
  Book
}
