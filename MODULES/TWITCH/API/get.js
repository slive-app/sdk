const cache = require('../../cache');

module.exports = (path) => {
    return new Promise(async (resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cache.sliveConfig.api.token
            }
        };

        fetch(`${cache.sliveConfig.api.host}/me/twitch/api?path=${path}`, options)
            .then(response => response.json())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => reject(err));
    });
}