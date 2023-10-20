const BACKEND = require("../CONNECTOR/ws.js")
const utils = require('../utils.js')
const cache = require('../cache.js')

module.exports = (key, value) => {
    return new Promise(async (resolve, reject) => {

        const nonce = utils.rdmStrNum(16)

        BACKEND.O.send(JSON.stringify({
            ID: "OF2OB_DB_GET",
            DATA: {
                key: key,
                nonce: nonce
            }
        }))



        while(cache.db[nonce] == undefined) {
            await utils.waitMs(1)
        }
        let data = await cache.db[nonce]
        delete cache.db[nonce]
        if(data.success) {
            resolve(data.value)
        } else {
            reject("Error while getting value")
        }
    })
}