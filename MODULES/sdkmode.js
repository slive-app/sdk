const bodyInjector = require('./bodyInjector.js')
const cache = require('./cache.js')
const wsOverlay = require('./CONNECTOR/overlay.js')


module.exports = {
    dev: () => {
        console.warn(`[sliveApp] SDK v${cache.sdk.version} - Local Dev Mode`)
        cache.sdk.mode.dev = true
        wsOverlay.start()
    },
    server: () => {
        console.warn(`[sliveApp] SDK v${cache.sdk.version} - Server Mode`)
        cache.sdk.mode.server = true
        document.SLIVESERVER = true
        bodyInjector.show()
        wsOverlay.start()
    },
    module: () => {
        if(window == window.top) {
            document.location.href = `https://${cache.sdk.beta ? "beta." : ""}slive.app`
            return
        }

        console.warn(`[sliveApp] SDK v${cache.sdk.version} - Module Mode`)
        cache.sdk.mode.module = true
    }
}