const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('@core/db')

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEAONLY,
  fav_num: { type: Sequelize.INTEGER, defaultValue: 0 },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {}
Model.init(classicFields, { sequelize, tableName: 'movie' })

class Sentence extends Model {}
Sentence.init(classicFields, { sequelize, tableName: 'sentence' })

class Music extends Model {}
Music.init({ ...classicFields, url: Sequelize.STRING }, { sequelize, tableName: 'music' })

module.exports = {
  Movie,
  Music,
  Sentence
}
