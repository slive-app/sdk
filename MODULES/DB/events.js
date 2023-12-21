const cache = require('../cache.js')

module.exports = () => {
    return new Promise(async (resolve, reject) => {

        console.log("Getting Events")
        console.log(cache.sliveConfig)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cache.sliveConfig.api.token
            }
        };

        console.log(`${cache.sliveConfig.api.host}/channel/${cache.sliveConfig.twitch.user.id}/live/events?start=${cache.sliveConfig.twitch.stream.uptime.startedAtUnix || (Date.now() - 60*60*24*1000).toString()}`)

        fetch(`${cache.sliveConfig.api.host}/channel/${cache.sliveConfig.twitch.user.id}/live/events?start=${cache.sliveConfig.twitch.stream.uptime.startedAtUnix || (Date.now() - 60*60*24*1000).toString()}`, options)
            .then(response => response.json())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => reject(err));
    });
}