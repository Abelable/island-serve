const { Op } = require("sequelize");
const { flatten } = require("lodash");
const { NotFound } = require("@root/core/http-exception");
const { Movie, Music, Sentence } = require("./classic");
const { Book } = require("./book");
const { Favor } = require("./favor");

class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail(uid) {
    const art = await Art.getData(this.art_id, this.type)
    if (!art) throw new NotFound()
    const favor = await Favor.userLikeIt(this.art_id, this.type, uid)
    return {
      art, 
      like_status: favor
    }
  }

  static async getData(art_id, type, useScope = true) {
    const finder = {
      where: { id: art_id }
    }
    let art = null
    const scope = useScope ? 'bh' : null
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break;
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break;
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
        break;
      case 400:
        art = await Book.scope(scope).findOne(finder)
        if (!art) {
          art = await Book.create({ id: art_id })
        }
        break;
    }
    return art
  }

  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (!ids.length) continue
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }
    return flatten(arts)
  }

  static async _getListByType(ids, type) {
    const finder = {
      where: {
        id: { [Op.in]: ids }
      }
    }
    let arts = []
    const scope = "bh"
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(finder)
        break;
      case 200:
        arts = await Music.scope(scope).findAll(finder)
        break;
      case 300:
        arts = await Sentence.scope(scope).findAll(finder)
        break;
    }
    return arts
  }
}

module.exports = {
  Art
}
