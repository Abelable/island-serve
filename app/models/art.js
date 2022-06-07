const { Book } = require("./book");
const { Movie, Music, Sentence } = require("./classic");

class Art {
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

  }
}

module.exports = {
  Art
}
