const utils = require('./MODULES/utils.js')

module.exports = {
    on: require('./MODULES/on.js'),
    db: {
        set: require('./MODULES/DB/set.js'),
        get: require('./MODULES/DB/get.js'),
    },
    config: {
        get: require('./MODULES/config/get.js'),
        // set: require('./MODULES/config/set.js'),
    },
    utils: require('./MODULES/utils.js'),
}

console.info("[sliveApp] SDK v1")

if (utils.getUrlVars().token == undefined) {
    const x = prompt("[SDK] Bitte gib deinen Token ein")
    window.location.href = window.location.href + "?token=" + x
}

if (
    !window.location.hostname.includes("slive.app") &&
    !window.location.hostname.includes("slive.games") &&
    utils.getUrlVars().token.toLowerCase().startsWith("t") &&
    utils.getUrlVars().toolId == undefined
) {
    console.info("[SDK] Local testing mode")
}

const ws = require('./MODULES/CONNECTOR/ws.js')

ws.start("wss://ws.slive.app/slive_app_backend_overlay_beta", 1)