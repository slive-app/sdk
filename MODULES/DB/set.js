const BACKEND = require("../CONNECTOR/ws.js")
const utils = require('../utils.js')

module.exports = (key, value) => {
    BACKEND.O.send(JSON.stringify({
        ID: "OF2OB_DB_SET",
        DATA: {
            key: key,
            value: value,
            nonce: utils.rdmStrNum(16)
        }
    }))
}