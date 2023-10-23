# sliveApp-SDK
The official SDK of slive.app! Develop your own overlays and share them with the rest of the world
- [CDN](#cdn)
- [Config](#config)
- [Events](#events)
- [Database](#database)
- [Utils](#utils)

# CDN
### Stable
Du findest die neuste Version unserer SDK hier:
```
https://cdn.jsdelivr.net/gh/slive-app/sdk@v1.1/_sliveBundle.js
```
Die Versionsnummer setzt sich zusammen aus der SDK-Version und der Gateway-Version. 

### Beta
Diese Versionen verbinden sich mit dem Beta-Gateway. Um dieses nutzen zu können, wird ein anderer Token benötigt.  


# Config
```js
SLIVE.config.set({
    id: "xYzAbC",
    name: "Overlay Test",
    width: 1920,
    height: 1080
})
```

Diese Config wird genutzt, damit slive dein Overlay richtig nutzen kann. 
Wenn diese Funktion nicht innerhalb von 2 Sekunden nach dem `ready`-Event ausgeführt wird, wird die Verbindung zum Gateway geschlossen.


# Events
```js
SLIVE.on("", async (data) => {})
```
sliveApp bietet eine Vielzahl an Events, welche das Overlay nutzen kann.
Aktuell möglich:
- ready
- chat
- event
- toolData

## on.ready 
Wird abgefeuert, sobald erfolgreich eine Verbindung Gateway hergestellt wurde.
Ab hier solltest du mit deinem Code anfangen. Nachdem du alles vorbereitet hast, rufe `SLIVE.ready()` auf. Damit signalisierst du, dass du alles geladen hast. Dein Overlay wird daraufhin angezeigt.

## on.chat
Bei jeder neuen Chatnachricht erhältst du alle relevanten Chat-Daten:
```json
{
        "badge-info": "subscriber/57",
        "badges": "moderator/1,subscriber/2036,artist-badge/1",
        "client-nonce": "4d34a46672bd46fb50a4a4bb62e65096",
        "color": "#9ACD32",
        "display-name": "KaiSchallenberg",
        "emotes": "",
        "first-msg": false,
        "flags": "",
        "id": "f8a89df1-33c3-46a5-8992-ab1b032913db",
        "mod": true,
        "returning-chatter": false,
        "room-id": "31021656",
        "subscriber": true,
        "tmi-sent-ts": "1696797755574",
        "turbo": false,
        "user-id": "196019423",
        "user-type": "mod",
        "message": "test",
        "channel": "thejocraft_live",
        "broadcaster": false,
        "control": "none"
    }
```

## on.event
Dieses Event wird abgefeuert, sobald ein Twitch-Event stattgefunden hat:
```json
{
        "subscription": {
            "id": "valWdj9a2YJPLR2tACatmsd9Hy3FwKMnuDz7xmG9wRA=",
            "type": "channel.subscription.message",
            "version": "1",
            "created_at": "2023-10-08T18:48:44.422343786Z"
        },
        "event": {
            "user_id": "131501829",
            "user_login": "tjc_bot",
            "user_name": "TJC_Bot",
            "broadcaster_user_id": "31021656",
            "broadcaster_user_login": "thejocraft_live",
            "broadcaster_user_name": "thejocraft_live",
            "message": {
                "text": "Wusstest du, dass man einen Netherstern mit einem Eimer Wasser fangen kann? Nein? Kein Wunder denn dieser Fakt wurde Ihnen präsentiert von: Google Bard.",
                "emotes": null
            },
            "tier": "1000",
            "cumulative_months": 56,
            "streak_months": 32,
            "duration_months": 0
        }
    }
```

Wenn du auf ein speziefischesch Event hören möchtest, kannst du einfach den Type als Listener angeben: `SLIVE.on("channel.subscription.message", async (data) => {})`
Mehr Informationen findest du auf https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/

## on.toolData
Wird momentan nur Intern genutzt

# Database
Wir erlauben euch Entwicklern, Daten für einen bestimmten Zeitraum in unserer Datenbank abzuspeichern. 
Dies erledigt ihr mit
```
// Einen Wert setzen
SLIVE.db.set(key, value)

// Einen Wert erhalten
let value = await SLIVE.db.get(key)
```
Diese Daten werden getrennt nach User und OverlayID abgespeichert.
Wenn ihr auf die Variabeln anderer Tools/Games zugreifen wollt, gebt als Key die ID des jeweiligen Overlays an und dahinter den Namen der Variabel getrennt mit einem `:`

### Beispiel:
Wir befinden uns im Spiel mit der ID `g1`
- `key1` - Wir ändern den Value des Keys `key1` für `g1`
- `g2:key1` - Wir ändern den Value des Keys `key1` für `g2` 


# Utils
Wir haben mehrere Tools für euch in der SDK, mit der ihr euch das Leben etwas leichter macht. Diese Liste wird stetig mit neuen Functions gefüllt. Ebenfalls könnt ihr diese Liste mit euren eigenen Ideen füllen. Erstellt dafür einfach einen Pull Request.

- IsJsonString(json)
- rdmNum(min, max)
- rdmStr(length)
- rdmStrNum(length)
- generateToken()
- generateColor()
- getUrlVars()
- waitMs(ms)
