const CACHE = require('../cache');
const UTILS = require('../utils');
const BACKEND_DASHBOARD = require('../CONNECTOR/dashboard.js');

module.exports = (array) => {
    CACHE.controller = array;
    if (!BACKEND_DASHBOARD.O || BACKEND_DASHBOARD.O.readyState != 1) return;
    BACKEND_DASHBOARD.O.send(JSON.stringify({
        ID: "OF2PB_CONTROLLER_UPDATE",
        DATA: {
            module: {
                id: CACHE.localConfig.id,
                name: CACHE.localConfig.name,
            },
            controller: CACHE.controller
        }
    }))
}