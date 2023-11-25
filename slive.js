const utils = require('./MODULES/utils.js')
const cache = require('./MODULES/cache.js')
const bodyInjector = require('./MODULES/bodyInjector.js')
const sdkmode = require('./MODULES/sdkmode.js')


cache.sdk.beta = true
cache.sdk.version = 1
cache.gateway.version = 1
cache.gateway.url = "wss://ws.slive.app/slive_app_backend_overlay" + (cache.sdk.beta ? "_beta" : "")
// cache.sdk.local = true



// Injecting body
bodyInjector.set()
bodyInjector.update()

// const { WebSocketServer } = require('ws');

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });


if (
    !window.location.hostname.includes(cache.sdk.beta ? "beta.slive.app" : "slive.app") && !cache.sdk.local
) {
    sdkmode.dev()
} else if (
    !window.parent.document.SLIVESERVER &&
    window.location.pathname.includes("/overlay")
) {
    sdkmode.server()
} else if (
    window.parent.document.SLIVESERVER ||
    window.location.pathname.includes("/module")
) {
    sdkmode.module()
}





// Check if token is provided
if (
    utils.getUrlVars().token == undefined &&
    cache.sdk.mode.dev
) {
    const x = prompt("[SDK] Bitte gib deinen Token ein")
    window.location.href = window.location.href + "?token=" + x
    if (x == null) {
        bodyInjector.error("No Token provided. Exiting...")
    }
}

const exportSlive = {
    on: require('./MODULES/on.js'),
    emit: (cache.sdk.mode.module ? require('./MODULES/emit.js') : null),
    db: {
        set: require('./MODULES/DB/set.js'),
        get: require('./MODULES/DB/get.js'),
    },
    config: {
        get: require('./MODULES/CONFIG/get.js'),
        set: require('./MODULES/CONFIG/set.js'),
    },
    utils: require('./MODULES/utils.js'),
    ready: require('./MODULES/ready.js'),
}

module.exports = exportSlive