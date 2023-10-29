const BACKEND = require("../CONNECTOR/ws.js")
const utils = require('../utils.js')
const cache = require('../cache.js')


module.exports = (key) => {
    return new Promise(async (resolve, reject) => {
        console.log(cache.sliveConfig.api.token)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cache.sliveConfig.api.token
            }
        };

        fetch(`${cache.sliveConfig.api.host}/me/database?id=${cache.localConfig.id}&key=${key}`, options)
            .then(response => response.json())
            .then(response => {
                resolve(response.data.value)
            })
            .catch(err => reject(err));
    });
}