const BACKEND = require("../CONNECTOR/ws.js")

module.exports = (key, value) => {
    BACKEND.O.send(JSON.stringify({
        ID: "OF2OB_DB_GET",
        DATA: {
            key: key
        }
    }))
}