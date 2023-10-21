const BACKEND = require("../CONNECTOR/ws.js")
const utils = require('../utils.js')
const cache = require('../cache.js')


module.exports = (key, value) => {
    return new Promise(async (resolve, reject) => {

        const nonce = utils.rdmStrNum(16)

        BACKEND.O.send(JSON.stringify({
            ID: "OF2OB_DB_SET",
            DATA: {
                key: key,
                value: value,
                nonce: nonce
            }
        }))

        while(cache.db[nonce] == undefined) {
            await utils.waitMs(1)
        }
        let data = await cache.db[nonce]
        delete cache.db[nonce]
        delete data.nonce
        if(data.success) {
            resolve()
        } else {
            reject("Error while setting value")
        }
        
    })
}