let cache = require('./cache.js');

// create an on listener for the module
module.exports = (event, listener) => {
    if (!cache.listener[event]) {
        cache.listener[event] = [];
      }
    
      // Füge den Listener hinzu
      cache.listener[event].push(listener);
}