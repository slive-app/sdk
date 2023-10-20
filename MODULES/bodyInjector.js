const cache = require('./cache.js')

module.exports = {
    set: () => {
        document.body.style.width = "1920px";
        document.body.style.height = "1080px";
        document.body.style.transform = "scale(1)";
        document.body.style.transformOrigin = "0 0";
        document.body.style.overflow = "hidden";
        document.body.style.position = "absolute";
        document.body.style.top = "0";
        document.body.style.left = "0";
        document.body.style.transition = "transform 0.49s cubic-bezier(.72,.01,.23,.99)";
        document.body.style.margin = "0";
    },
    update: () => {
        // Automatische Skalierung auf die Bildschirmgröße
        setInterval(() => {

            if(!cache.localConfig) return;

            let zoom = null;
            if(cache.localConfig.width >= cache.localConfig.height) {
                zoom = window.innerWidth / cache.localConfig.width
            } else if(cache.localConfig.height > cache.localConfig.width) {
                zoom = window.innerHeight / cache.localConfig.height
            } else {
                return;
            }
            
            document.body.style.transition = "transform 0.49s cubic-bezier(.72,.01,.23,.99)"
            document.body.style.transform = `scale(${zoom.toString()})`
        }, 500)
    },
    error: (msg) => {
        document.body.innerHTML = `<div style="position: absolute; top: 5%; left: 3%; width: 90%; color: #759aff; font-family: Arial; font-size: 30px; text-align: left;">${msg}</div>`
    }
}
