const cache = require('../cache.js')

module.exports = {
    get: () => {
        return cache.config
    }
}