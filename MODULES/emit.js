let cache = require('./cache.js');

module.exports = (event, data) => {

  // Überprüfe, ob das Ereignis existiert
  if (cache.sdk.mode.module || cache.sdk.mode.dev) {
    if (!cache.listener[event]) {
      return;
    }

    let key = false;

    // Check, ob die ToolID mit der hinterlegten ID übereinstimmt
    if (event == "toolData" && data.toolId && (data.toolId != cache.localConfig.id)) {
      return;
    } else if (event == "toolData" && data.toolId && (data.toolId == cache.localConfig.id)) {
      data = data.payload
    } else if (event == "eventData" && data.eventId && (data.eventId != cache.localConfig.id)) {
      return;
    } else if (event == "eventData" && data.eventId && (data.eventId == cache.localConfig.id)) {
      key = data.key
      data = data.payload     
    } else if (event == "ready") {
      cache.sliveConfig = data
    }

    // Rufe alle Listener des Ereignisses auf
    cache.listener[event].forEach((listener) => listener(data, key));
  } else if (cache.sdk.mode.server) {
    for (const client of document.body.children) {
      if (client.tagName == "IFRAME") {
        client.contentWindow.SLIVE.emit(event, data);
      }
    }

  }
}