var SLIVE;(()=>{var e={479:(e,o,n)=>{const r={start:async(e,o)=>r.connect(e,o,!0),url:"",version:null,O:null,firstConfig:!0,BackendServerWasConnected:!1};e.exports=r;const t=n(339),s=n(150),a=n(915);r.connect=async function(e,o,n){(n||r.BackendServerWasConnected)&&(e||(e="wss://ws.slive.app/slive_app_backend_overlay"),o?(r.url=e,r.version=o,r.O=new WebSocket(`${e}?version=${o}&token=${t.getUrlVars().token}`),r.O.onmessage=async function(e){switch("ERROR"!=(e=JSON.parse(e.data)).ID&&console.log(e),e.ID){case"ERROR":console.error("[Backend] "+e);break;case"OB2OF_PING":r.O.send(JSON.stringify({ID:"OF2OB_PONG",DATA:{}}));break;case"OB2OF_AUTHORIZE_SUCCESS":r.BackendServerWasConnected=!0;break;case"OB2OF_CONFIG":a.sliveConfig=e.DATA,r.firstConfig&&(r.firstConfig=!1,s("ready",e.DATA),console.info("[Backend] Connection established"),await t.wait(2e3),a.localConfig||(alert("[SDK] You have not specified a config for your project. The connection is now closed."),r.BackendServerWasConnected=!1,r.O.close()));break;case"OB2OF_EVENTSUB":s("event",e.DATA),s(e.DATA.subscription.type,e.DATA);break;case"OB2OF_CHAT":s("chat",e.DATA);break;case"OB2OF_TOOL_DATA":s("toolData",e.DATA.payload)}},r.O.onerror=function(e){console.error("[Backend] "+JSON.stringify(e)),r.O.close()},r.O.onclose=async function(){console.error("[Backend] Connection closed"),await t.wait(5e3),r.connect(r.url,r.version,!1)}):console.error("[Backend] No version specified"))}},365:(e,o,n)=>{const r=n(479);e.exports=(e,o)=>{r.O.send(JSON.stringify({ID:"OF2OB_DB_GET",DATA:{key:e}}))}},499:(e,o,n)=>{const r=n(479);e.exports=(e,o)=>{r.O.send(JSON.stringify({ID:"OF2OB_DB_SET",DATA:{key:e,value:o}}))}},915:e=>{e.exports={listener:[],sliveConfig:{},localConfig:!1}},30:(e,o,n)=>{const r=n(915);e.exports={get:()=>r.config}},150:(e,o,n)=>{let r=n(915);e.exports=(e,o)=>{r.listener[e]&&r.listener[e].forEach((e=>e(o)))}},886:(e,o,n)=>{let r=n(915);e.exports=(e,o)=>{r.listener[e]||(r.listener[e]=[]),r.listener[e].push(o)}},339:e=>{e.exports={IsJsonString:e=>{try{JSON.parse(e)}catch(e){return!1}return!0},rdmNum:(e,o)=>Math.floor(Math.random()*(o-e+1)+e),rdmStr:e=>{for(var o="",n=0;n<e;n++)o+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return o},rdmStrNum:e=>{for(var o="",n=0;n<e;n++)o+=n%2==0?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random())):Math.floor(9*Math.random());return o},generateToken:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var o=16*Math.random()|0;return("x"==e?o:3&o|8).toString(16)})),getUrlVars:()=>{var e={};return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,(function(o,n,r){e[n.toLowerCase()]=r})),e},wait:e=>new Promise((o=>setTimeout(o,e))),generateColor:()=>{for(var e="#",o=0;o<6;o++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}}},989:(e,o,n)=>{const r=n(339);if(e.exports={on:n(886),db:{set:n(499),get:n(365)},config:{get:n(30)},utils:n(339)},console.info("[sliveApp] SDK v1"),null==r.getUrlVars().token){const e=prompt("[SDK] Bitte gib deinen Token ein");window.location.href=window.location.href+"?token="+e}window.location.hostname.includes("slive.app")||window.location.hostname.includes("slive.games")||!r.getUrlVars().token.toLowerCase().startsWith("t")||null!=r.getUrlVars().toolId||console.info("[SDK] Local testing mode"),n(479).start("wss://ws.slive.app/slive_app_backend_overlay_beta",1)}},o={},n=function n(r){var t=o[r];if(void 0!==t)return t.exports;var s=o[r]={exports:{}};return e[r](s,s.exports,n),s.exports}(989);SLIVE=n})();