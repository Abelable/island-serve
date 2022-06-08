const { Model, Sequelize, Op } = require("sequelize");
const { sequelize } = require("@core/db");
const { Favor } = require("./favor");

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({ order: ["index"] })
    const ids = books.map(book => book.id)
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids,
          type: 400
        }
      },
      group: ["art_id"],
      attributes: ["art_id", [Sequelize.fn("COUNT", "*"), "count"]] // ?: 笛卡尔积
    })
    books.forEach(book => HotBook._getEachBookStatus(book, favors))
    return books
  }

  static _getEachBookStatus(book, favors) {
    const favor = favors.find(favor => favor.art_id === book.id)
    const count = favor ? favor.get("count") : 0
    book.setDataValue("fav_nums", count)
    return book
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING,
}, {
  sequelize,
  tableName: "hot_book"
})

module.exports = {
  HotBook
}
