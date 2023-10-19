let cache = require('./cache.js');

module.exports = (event, data) => {
    // Überprüfe, ob das Ereignis existiert
  if (!cache.listener[event]) {
    return;
  }

  // Rufe alle Listener des Ereignisses auf
  cache.listener[event].forEach((listener) => listener(data));
}