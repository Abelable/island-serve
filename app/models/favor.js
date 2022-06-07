const { Model, Sequelize, Op } = require("sequelize");
const { sequelize } = require("@core/db");
const { LikeError, DislikeError, NotFound } = require("@root/core/http-exception");

class Favor extends Model {
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({ where: { art_id, type, uid } })
    if (favor) throw new LikeError()
    // 事务
    return sequelize.transaction(async t => {
      await Favor.create({ art_id, type, uid }, { transaction: t })
      const { Art } = require("@models/art");
      const art = await Art.getData(art_id, type, false)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({ where: { art_id, type, uid } })
    if (!favor) throw new DislikeError()
    return sequelize.transaction(async t => {
      await favor.destroy({ force: true, transaction: t })
      const { Art } = require("@models/art");
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }
  
  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({ where: { art_id, type, uid } })
    return !!favor
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({ 
      where: { 
        uid, 
        type: { [Op.not]: 400 }
      }
    })
    if (!arts) throw new NotFound()
    return await Art.getList(arts)
  }

  static async getBookFavor(uid, bookId) {
    const favorNums = await Favor.count({
      where: { art_id: bookId, type: 400 }
    })
    const myFavor = await Favor.findOne({
      where: { art_id: bookId, uid, type: 400 }
    })
    return {
      fav_nums: favorNums,
      like_status: myFavor ? 1 : 0
    }
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}
