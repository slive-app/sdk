# sliveApp-SDK
The official SDK of slive.app! Develop your own overlays and share them with the rest of the world

You can find the newest Version of our Documentations at [https://docs.slive.app/](https://docs.slive.app/)

- [CDN](#cdn)
- [Config](#config)
- [Events](#events)
- [Database](#database)
- [Utils](#utils)

# CDN
### Stable
You can find the latest version of our SDK here:
```
https://cdn.jsdelivr.net/gh/slive-app/sdk@v1.1/_sliveBundle.js
```
The version number is composed of the SDK version and the gateway version. 

### Beta
These versions connect to the beta gateway. A different token is required to use this.  


# Config
```js
SLIVE.config.set({
    id: "xYzAbC",
    name: "Overlay Test",
    width: 1920,
    height: 1080
})
```

This config is used so that slive can use your overlay properly. If this function is not executed within 2 seconds after the `ready` event, the connection to the gateway will be closed.


# Events
```js
SLIVE.on("", async (data) => {})
```
sliveApp offers a variety of events that the overlay can use. Currently possible:
- ready
- chat
- event
- toolData

## on.ready 
Fired when a connection gateway is successfully established. From here you should start with your code. After you have prepared everything, call `SLIVE.ready()`. This signals that you have loaded everything. Your overlay will be displayed.

## on.chat
With each new chat message you will receive all relevant chat data:
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
This event is fired as soon as a Twitch event has taken place:
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
                "text": "Did you know that you can catch a Nether Star with a bucket of water? No? No wonder because this fact was presented to you by: Google Bard.",
                "emotes": null
            },
            "tier": "1000",
            "cumulative_months": 56,
            "streak_months": 32,
            "duration_months": 0
        }
    }
```

If you want to listen to a special fish event, you can simply specify the type as listener: `SLIVE.on("channel.subscription.message", async (data) => {})` More information can be found at https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/

## on.toolData
Currently only used internally

# Database
We allow you developers to store data in our database for a certain period of time. You do this with
```
// Set a value
SLIVE.db.set(key, value)

// Get a value
let value = await SLIVE.db.get(key)
```
This data is stored separately for User and OverlayID. If you want to access the variables of other tools/games, enter the ID of the respective overlay as key and behind it the name of the variable separated with a `:`.

### Example:
We are in the game with the ID `g1`
- `key1` - We change the value of the key `key1` for `g1`
- `g2:key1` - We change the value of the key `key1` for `g2`.


# Utils
We have several tools for you in the SDK, with which you can make your life a little easier. This list will be constantly filled with new functions. You can also fill this list with your own ideas. Just create a pull request.

- IsJsonString(json)
- rdmNum(min, max)
- rdmStr(length)
- rdmStrNum(length)
- generateToken()
- generateColor()
- getUrlVars()
- waitMs(ms)
