const BACKEND = require("../CONNECTOR/ws.js")
const utils = require('../utils.js')
const cache = require('../cache.js')


module.exports = (key, value) => {
    return new Promise(async (resolve, reject) => {

        console.log(cache.sliveConfig.api.token)
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cache.sliveConfig.api.token
            },
            body: JSON.stringify({
                id: cache.localConfig.id,
                key: key,
                value: value
            }),
        };

        fetch(`${cache.sliveConfig.api.host}/me/database`, options)
            .then(response => response.json())
            .then(response => {
                resolve(response.data.value)
            })
            .catch(err => reject(err));
    });
}