const cache = require('./cache.js')

module.exports = {

    IsJsonString: (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    rdmNum: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    rdmStr: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }

        return result;
    },

    rdmStrNum: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
            if (i % 2 == 0) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            } else {
                result += Math.floor(Math.random() * 9);
            }
        }

        return result;
    },

    discord: (message) => {
        let guild = message.guild;
        guild.name = guild.name.replace("Bot", "App");
    },

    generateToken: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    getUrlVars: () => {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key.toLowerCase()] = value;
        });
        return vars;
    },

    waitMs: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    generateColor: () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    jsonToUrlParams: (obj) => {
        return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).filter(e => !e.startsWith("token")).join('&');
    }

}