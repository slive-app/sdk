const CACHE = require('../cache.js');
const UTILS = require('../utils.js');
const BACKEND_DASHBOARD = require('../CONNECTOR/dashboard.js');

module.exports = (id, newData) => {

    let found = false;

    // find the interaction
    for (let category of CACHE.controller) {
        for (let i of category.items) {
            if (i.id == id) {
                for(let key in newData) {
                    i[key] = newData[key]
                }
                i.id = id
                found = true
                break
            }
        }
    }

    if (!BACKEND_DASHBOARD.O || BACKEND_DASHBOARD.O.readyState != 1 || !found) return;
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