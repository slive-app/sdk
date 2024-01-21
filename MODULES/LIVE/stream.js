const cache = require('../cache.js')

module.exports = (stats, user) => {
    return new Promise(async (resolve, reject) => {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cache.sliveConfig.api.token
            }
        };

        let query = "";
        if(stats) {
            query += `stats=true&`;
        }
        if(user) {
            query += `user=${user}&`;
        }
        
        fetch(`${cache.sliveConfig.api.host}/me/live/stream?${query}`, options)
            .then(response => response.json())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => reject(err));
    });
}