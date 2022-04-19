const Router = require("koa-router")
const requireDirectory = require("require-directory")

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouters()
  }

  static initLoadRouters() {
    const whenLoadModule = router => {
      if (router instanceof Router) InitManager.app.use(router.routes())
    }
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: whenLoadModule
    })
  }
}

module.exports = InitManager
