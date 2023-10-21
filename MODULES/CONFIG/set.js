
module.exports = (json) => {

    const cache = require('../cache.js')
    if(!cache.localConfig) {
        cache.localConfig = json
    }
    else {
        cache.localConfig.width = json.width
        cache.localConfig.height = json.height
    }

    if(json.width) document.body.style.width = cache.localConfig.width + "px";
    if(json.height) document.body.style.height = cache.localConfig.height + "px";
    
    return json
}
