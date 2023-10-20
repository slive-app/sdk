module.exports = {
    on: require('./MODULES/on.js'),
    db: {
        set: require('./MODULES/DB/set.js'),
        get: require('./MODULES/DB/get.js'),
    },
    config: {
        get: require('./MODULES/CONFIG/get.js'),
        set: require('./MODULES/CONFIG/set.js'),
    },
    utils: require('./MODULES/utils.js'),
}





const ws = require('./MODULES/CONNECTOR/ws.js')
const utils = require('./MODULES/utils.js')
const cache = require('./MODULES/cache.js')
const bodyInjector = require('./MODULES/bodyInjector.js')

// Injecting body
bodyInjector.set()
bodyInjector.update()

// Console Info
console.info("[sliveApp] SDK v1")

// Check if token is provided
if (
    utils.getUrlVars().token == undefined
    ) {
    const x = prompt("[SDK] Bitte gib deinen Token ein") || "TvP7VBbDEPP2m_rtl_su1"
    window.location.href = window.location.href + "?token=" + x
    if(x == null) {
        bodyInjector.error("No Token provided. Exiting...")
    }
}

if (
    !window.location.hostname.includes("slive.app") &&
    !window.location.hostname.includes("slive.games")
) {
    console.info("[SDK] Local testing mode")
}


ws.start(1, "wss://ws.slive.app/slive_app_backend_overlay_beta")
