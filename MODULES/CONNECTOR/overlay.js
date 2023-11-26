const utils = require('../utils.js')
const emit = require('../emit.js')
const cache = require('../cache.js')
const bodyInjector = require('../bodyInjector.js')


const BACKEND = {
    start: async () => BACKEND.connect(true),
    O: null,
    firstConfig: true,
    BackendServerWasConnected: false
}






BACKEND.connect = async function (firstTry) {
    if (!firstTry && !BACKEND.BackendServerWasConnected) return

    if (!cache.gateway.overlay.version) {
        console.error("[sliveApp] No Gateway Version specified")
        bodyInjector.error("No version specified. Exiting...")
        return
    }

    BACKEND.O = new WebSocket(`${cache.gateway.overlay.url}?version=${cache.gateway.overlay.version}&token=${utils.getUrlVars().token}`)

    // WS: Bei neuer Nachricht
    BACKEND.O.onmessage = async function (message) {
        // wandle Nachricht in JSON um
        message = JSON.parse(message.data)

        // Gebe Nachricht aus
        if (message.ID != "ERROR" && cache.sdk.local) console.log(message)

        // Sortiere Nachricht nach Typ
        switch (message.ID) {

            // Bei Error vom Backend
            case "ERROR":
                console.error("[sliveApp] " + message)
                break

                // Backend fragt freundlich nach, ob wir noch leben
            case "OB2OF_PING":
                BACKEND.O.send(JSON.stringify({
                    ID: "OF2OB_PONG",
                    DATA: {}
                }))
                break;

                // Wird getriggert wenn der OverlayToken gültig ist
            case "OB2OF_AUTHORIZE_SUCCESS":

                BACKEND.BackendServerWasConnected = true

                break;

            case "OB2OF_CONFIG":

                // Setze die Config
                cache.sliveConfig = message.DATA

                if (BACKEND.firstConfig) {
                    BACKEND.firstConfig = false
                    emit("ready", cache.sliveConfig)

                    if (cache.sdk.mode.server) {
                        if (cache.sliveConfig.overlay.selectedId) {
                            bodyInjector.loadModule(cache.sliveConfig.overlay.selectedId)
                        } else {
                            for (const id of cache.sliveConfig.overlay.selectedIds) {
                                bodyInjector.loadModule(id)
                            }
                        }
                    }

                    console.info(`[sliveApp] [OB] Connection to Gateway v${cache.gateway.overlay.version} established`)

                    await utils.waitMs(2000)

                    if (!cache.localConfig && cache.sdk.mode.dev) {
                        alert("[SDK] You have not specified a config for your project. The connection is now closed.")
                        BACKEND.BackendServerWasConnected = false
                        BACKEND.O.close()
                        bodyInjector.error("No config specified. Exiting...")
                    }
                }
                break;


            case "OB2OF_EVENTSUB":
                emit("event", message.DATA)
                emit(message.DATA.subscription.type, message.DATA)
                break;

            case "OB2OF_CHAT":
                emit("chat", message.DATA)
                break;

            case "OB2OF_TOOL_DATA":
                emit("toolData", message.DATA)
                break;

            case "OB2OF_DB_GET_RESPONSE": {
                cache.db[message.DATA.nonce] = message.DATA
                break;
            }

            case "OB2OF_DB_SET_RESPONSE": {
                cache.db[message.DATA.nonce] = message.DATA
                break;
            }
        }
    }

    BACKEND.O.onerror = function (error) {
        console.error("[sliveApp] " + JSON.stringify(error))
        BACKEND.O.close()
    }

    BACKEND.O.onclose = async function () {
        console.error("[sliveApp] Gateway Connection closed")
        await utils.waitMs(5000)
        BACKEND.connect(false)
    }
}


module.exports = BACKEND