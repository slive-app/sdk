const cache = require("../cache");

module.exports = (data) => {

    if(!cache.controller || data.module.id != cache.localConfig.id) return;
    
    let interaction;

    // find the interaction
    for (let category of cache.controller) {
        for (let i of category.items) {
            if(i.id == data.interaction.id) {
                interaction = i;
                break;
            }
        }
    }

    if(!interaction) return;
    interaction.action(data.interaction)
}