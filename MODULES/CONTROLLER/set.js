const CACHE = require('../cache');
const UTILS = require('../utils');
const BACKEND_DASHBOARD = require('../CONNECTOR/dashboard.js');

module.exports = (json) => {

    // loop through all categories and interactions and add a id
    for (let categoryId in json) {
        let category = json[categoryId];
        category.id = UTILS.rdmStrNum(10);

        for (let interaction of category.interactions) {
            interaction.id = UTILS.rdmStrNum(15);
        }
    }



    if(!CACHE.controller) {
        CACHE.controller = json;
        BACKEND_DASHBOARD.start();
    } else {
        CACHE.controller = json;
        BACKEND_DASHBOARD.O.send(JSON.stringify({
            ID: "OF2PB_CONTROLLER_UPDATE",
            DATA: CACHE.controller
        }))
    }
}