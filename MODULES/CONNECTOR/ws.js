// console.log = function () {}

const BACKEND = {
    start: async (url, version) => BACKEND.connect(url, version, true),
    url: "",
    version: null,
    O: null,
    firstConfig: true,
    BackendServerWasConnected: false,
}

module.exports = BACKEND

const utils = require('../utils.js')
const emit = require('../emit.js')
const cache = require('../cache.js')
const bodyInjector = require('../bodyInjector.js')

BACKEND.connect = async function (url, version, firstTry) {
    if (!firstTry && !BACKEND.BackendServerWasConnected) return

    if (!url) {
        url = "wss://ws.slive.app/slive_app_backend_overlay"
    }

    if (!version) {
        console.error("[Backend] No version specified")
        bodyInjector.error("No version specified. Exiting...")
        return
    }

    BACKEND.url = url
    BACKEND.version = version

    BACKEND.O = new WebSocket(`${url}?version=${version}&token=${utils.getUrlVars().token}`)

    // WS: Bei neuer Nachricht
    BACKEND.O.onmessage = async function (message) {
        // wandle Nachricht in JSON um
        message = JSON.parse(message.data)

        // Gebe Nachricht aus
        if (message.ID != "ERROR") console.log(message)

        // Sortiere Nachricht nach Typ
        switch (message.ID) {

            // Bei Error vom Backend
            case "ERROR":
                console.error("[Backend] " + message)
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

                if(BACKEND.firstConfig){
                    BACKEND.firstConfig = false
                    emit("ready", message.DATA)
                    console.info("[Backend] Connection established")

                    await utils.wait(2000)

                    if(!cache.localConfig) {
                        alert("[SDK] You have not specified a config for your project. The connection is now closed.")
                        bodyInjector.error("No config specified. Exiting...")
                        BACKEND.BackendServerWasConnected = false
                        BACKEND.O.close()
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
                if(cache.localConfig.id != message.DATA.toolId) return
                emit("toolData", message.DATA.payload)
                break;
        }
    }

    BACKEND.O.onerror = function (error) {
        console.error("[Backend] " + JSON.stringify(error))
        BACKEND.O.close()
    }

    BACKEND.O.onclose = async function () {
        console.error("[Backend] Connection closed")
        await utils.wait(5000)
        BACKEND.connect(BACKEND.url, BACKEND.version, false)
    }
}
