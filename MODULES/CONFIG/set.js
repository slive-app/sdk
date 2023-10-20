module.exports = (json) => {
    const cache = require('../cache.js')
    if(cache.localConfig) return
    cache.localConfig = json
    document.body.style.width = cache.localConfig.width + "px";
    document.body.style.height = cache.localConfig.height + "px";
    
    return json
}
