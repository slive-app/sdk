module.exports = (json) => {
    const cache = require('../cache.js')
    cache.localConfig = json
    document.body.style.width = json.width + "px";
    document.body.style.height = json.height + "px";
    
    return json
}
