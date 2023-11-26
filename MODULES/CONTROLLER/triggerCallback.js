const cache = require("../cache");

module.exports = (data) => {
    
    let interaction;

    // find the interaction
    for (let categoryId in cache.controller) {
        let category = cache.controller[categoryId];

        for (let i of category.interactions) {
            if(i.id == data.id) {
                interaction = i;
                break;
            }
        }
    }

    interaction.callback(data.value)
}