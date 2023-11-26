const utils = require('../utils.js')
const emit = require('../emit.js')
const cache = require('../cache.js')
const triggerCallback = require('../CONTROLLER/triggerCallback.js')

const BACKEND_DASHBOARD = {
    start: async () => BACKEND_DASHBOARD.connect(true),
    O: null,
    firstConfig: true,
    BackendServerWasConnected: false
}






BACKEND_DASHBOARD.connect = async function (firstTry) {
    if (!firstTry && !BACKEND_DASHBOARD.BackendServerWasConnected) return

    if (!cache.gateway.dashboard.version) {
        console.error("[sliveApp] No Gateway Version specified")
        bodyInjector.error("No version specified. Exiting...")
        return
    }

    BACKEND_DASHBOARD.O = new WebSocket(`${cache.gateway.dashboard.url}?version=${cache.gateway.dashboard.version}&token=${cache.sliveConfig.api.token}&origin=overlay`)

    // WS: Bei neuer Nachricht
    BACKEND_DASHBOARD.O.onmessage = async function (message) {
        // wandle Nachricht in JSON um
        message = JSON.parse(message.data)

        // Gebe Nachricht aus
        if (message.ID != "ERROR" && cache.sdk.local) console.log(message)

        // Sortiere Nachricht nach Typ
        switch (message.ID) {

            // Bei Error vom Backend
            case "ERROR":
                console.error("[sliveApp] " + JSON.stringify(message))
                break

                // Backend fragt freundlich nach, ob wir noch leben
            case "PB2AF_PING":
                BACKEND_DASHBOARD.O.send(JSON.stringify({
                    ID: "AF2PB_PONG",
                    DATA: {}
                }))
                break;

                // Wird getriggert wenn der OverlayToken gültig ist
            case "PB2AF_AUTHORIZE_SUCCESS":

                BACKEND_DASHBOARD.BackendServerWasConnected = true

                break;

            case "PB2AF_CONFIG":

                console.info(`[sliveApp] [PB] Connection to Gateway v${cache.gateway.dashboard.version} established`)

                BACKEND_DASHBOARD.O.send(JSON.stringify({
                    ID: "OF2PB_CONTROLLER_UPDATE",
                    DATA: cache.controller
                }))
                break;

            case "PB2OF_CONTROLLER_EVENT":
                triggerCallback(message.DATA)
                break;
        }
    }

    BACKEND_DASHBOARD.O.onerror = function (error) {
        console.error("[sliveApp] " + JSON.stringify(error))
        BACKEND_DASHBOARD.O.close()
    }

    BACKEND_DASHBOARD.O.onclose = async function () {
        console.error("[sliveApp] Gateway Connection closed")
        await utils.waitMs(5000)
        BACKEND_DASHBOARD.connect(false)
    }
}


module.exports = BACKEND_DASHBOARD