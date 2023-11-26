const cache = require('../cache.js')


module.exports = (key, value) => {
    return new Promise(async (resolve, reject) => {
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