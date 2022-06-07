const isThisType = (val) => {
  const arrType = Object.values(this)
  return arrType.includes(val)
}

const loginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}

const ArtType = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType
}

module.exports = {
  loginType,
  ArtType
}
