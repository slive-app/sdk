const cache = require('./cache.js')
const utils = require('./utils.js');
const configSet = require('./CONFIG/set.js');

module.exports = {
    set: () => {
        document.body.style.width = "500px";
        document.body.style.height = "200px";
        document.body.style.transform = "scale(1)";
        document.body.style.transformOrigin = "0 0";
        document.body.style.overflow = "hidden";
        document.body.style.position = "absolute";
        document.body.style.top = "0";
        document.body.style.left = "0";
        document.body.style.opacity = "0";
        document.body.style.transition = "transform 0.49s cubic-bezier(.72,.01,.23,.99), opacity 0.49s cubic-bezier(.72,.01,.23,.99)";
        document.body.style.margin = "0";
        
    },
    update: () => {
        // Automatische Skalierung auf die Bildschirmgröße
        setInterval(() => {

            if (cache.sdk.mode.server) {
                if (!cache.localConfig) {
                    configSet({
                        width: 1920,
                        height: 1080
                    })
                } else {
                    for (let child of document.body.children) {
                        if (child.tagName != "IFRAME") continue
                        let x = {}

                        if (child.contentWindow.document.body.offsetWidth > cache.localConfig.width) {
                            x.width = child.contentWindow.document.body.offsetWidth
                        } 
                        
                        if (child.contentWindow.document.body.offsetHeight > cache.localConfig.height) {
                            x.height = child.contentWindow.document.body.offsetHeight
                        }

                        if (x.width || x.height) {
                            configSet(x)
                        }
                    }
                }
            }

            if (!cache.localConfig) {
                return
            }

            let zoom = null;
            if (cache.localConfig.width >= cache.localConfig.height) {
                zoom = window.innerWidth / cache.localConfig.width
            } else if (cache.localConfig.height > cache.localConfig.width) {
                zoom = window.innerHeight / cache.localConfig.height
            } else {
                return;
            }

            document.body.style.transform = `scale(${zoom.toString()})`
        }, 500)
    },
    error: (msg) => {
        document.body.innerHTML = `<div style="position: absolute; top: 5%; left: 3%; width: 90%; color: #759aff; font-family: Arial; font-size: 30px; text-align: left;">${msg}</div>`
    },
    show: () => {
        document.body.style.opacity = "1";
    },
    hide: () => {
        document.body.style.opacity = "0";
    },
    loadModule: async (id) => {
        // generate iframe
        let iframe = document.createElement("iframe")
        iframe.src = `https://${cache.sdk.beta ? "beta." : ""}slive.app/modules/${id}?${Date.now()}`
        if(cache.sdk.local) iframe.src = `http://localhost/SDK/overlay/module/index.html?${Date.now()}`
        iframe.style.width = "100%"
        iframe.style.height = "100%"
        iframe.style.border = "none"
        iframe.style.position = "absolute"
        iframe.style.top = "0"
        iframe.style.left = "0"
        iframe.style.overflow = "hidden"
        iframe.style.opacity = "1"
        iframe.style.transition = "opacity 0.49s cubic-bezier(.72,.01,.23,.99)"
        iframe.style.pointerEvents = "none"

        document.body.appendChild(iframe)

        await utils.waitMs(500)

        iframe.contentWindow.SLIVE.emit("ready", cache.sliveConfig)

    }
}