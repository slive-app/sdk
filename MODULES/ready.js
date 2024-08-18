const bodyInjector = require("./bodyInjector")
const cache = require("./cache")
const BACKEND_DASHBOARD = require("./CONNECTOR/dashboard")

module.exports = () => {
    bodyInjector.show()

    if(cache.controller) {
        BACKEND_DASHBOARD.start()
    }
}