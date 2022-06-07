const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("@core/db")

class Favor extends Model {
  
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
