// ==UserScript==
// @name       Diep.io CofFee
// @author     ClintFlames
// @version    1.0.0-alpha
// @namespace  https://violentmonkey.github.io

// @description Adds features to work with diep.io builds.
// @icon 
// @supportURL  https://discord.gg/d4rKqZs
// @homepageURL https://discord.gg/d4rKqZs

// @match  https://diep.io/
// @run-at document-end
// @inject-into page
// @noframes

// @require https://greasyfork.org/scripts/456843-diep-shortcut/code/diep_Shortcut.js?version=1144520
// @require https://greasyfork.org/scripts/433681-diepapi/code/diepAPI.js?version=1129359

// @grant GM.getValue
// @grant GM.setValue
// @grant GM.deleteValue
// @grant GM.registerMenuCommand
// @grant GM.addValueChangeListener
// @grant GM.removeValueChangeListener

// @grant GM.addStyle
// @grant GM.addElement
// @grant GM.notification
// @grant GM.setClipboard
// ==/UserScript==

// buildnum (base 36) 2v

(()=>{var __webpack_modules__={"./src/allyRadar.js":()=>{eval('const wwindow = window.unsafeWindow;\n\nconst { Canvas } = wwindow.diep_Shortcut.core;\nconst { Vector, CanvasKit } = wwindow.diepAPI.core;\nconst { scaling, player, game, minimap, arena } = wwindow.diepAPI.apis;\nconst { backgroundOverlay } = wwindow.diepAPI.tools;\nconst canvas = document.getElementById(\'canvas\');\nconst ctx2 = canvas.getContext("2d");\nconst ctx = backgroundOverlay.ctx;\n\n// Every client has different arena.size so scaling is required\nconst gw = 1000;\n\nconst ws = new WebSocket("wss://chlorinated-bumpy-bobcat.glitch.me");\n\nws.onopen = () => ws.send(localStorage.name);\n\nconst posList = new Map();\n\nws.onmessage = (m) => {\n\tif (m.data == "p") {\n\t\tif (wwindow.diepAPI.apis.player.isDead) return ws.send("p0#0");\n\t\tconst k = gw / arena.size;\n\t\treturn ws.send("p" + Math.floor(player.position.x * k).toString(36) + "#" + Math.floor(player.position.y * k).toString(36));\n\t}\n\tposList.clear();\n\tlet d = m.data.slice(2).split(" ");\n\tfor (const c of d) {\n\t\tif (c == "") continue;\n\t\tconst [x, y] = c.slice(6).split("#").map(v => parseInt(v, 36));\n\t\tposList.set(c.slice(0, 6), { x, y });\n\t}\n}\n\nconst toMinimapPosition = (vector) => Vector.add(minimap.minimapPos, Vector.multiply(minimap.minimapDim, arena.unscale(vector)));\n\ngame.once("ready", () => {\n\tgame.on("frame", () => {\n\t\tconst k = arena.size / gw;\n\t\tfor (const [color, pos] of posList) {\n\t\t\tconst npos = {\n\t\t\t\tx: Math.floor(pos.x * k),\n\t\t\t\ty: Math.floor(pos.y * k)\n\t\t\t}\n\t\t\tconst cpos = toMinimapPosition(npos);\n\t\t\tif (pos.x == 0 && pos.y == 0) continue;\n\t\t\tctx2.globalAlpha = 1;\n\t\t\tctx2.fillStyle = "#" + color;\n\t\t\tctx2.beginPath();\n\t\t\tctx2.arc(cpos.x, cpos.y, 3 * wwindow.devicePixelRatio, 0, 2 * Math.PI);\n\t\t\tctx2.fill();\n\t\t}\n\t});\n});\n\n//# sourceURL=webpack://dcfee/./src/allyRadar.js?')},"./src/buildList.js":module=>{eval('module.exports = [\n\t{\n\t\truname: "Фабрика",\n\t\tname: "Factory",\n\t\tbuild: "656565784484865654488846584657777",\n\t\tbuildname: "00077757"\n\t},\n\t{\n\t\truname: "Предатор",\n\t\tname: "Predator",\n\t\tbuild: "656565658777444656588848484777765",\n\t\tbuildname: "00067776"\n\t},\n\t{\n\t\truname: "Сталкер",\n\t\tname: "Stalker",\n\t\tbuild: "656565657771848484656584848477657",\n\t\tbuildname: "10067766"\n\t},\n\t{\n\t\truname: "Некромансер",\n\t\tname: "Necromancer",\n\t\tbuild: "656565657778484846565848484846577",\n\t\tbuildname: "00077766"\n\t},\n\t{\n\t\truname: "Файтер",\n\t\tname: "Fighter",\n\t\tbuild: "656565657781233656577723657723233",\n\t\tbuildname: "14607771"\n\t}\n]\n\n//# sourceURL=webpack://dcfee/./src/buildList.js?')},"./src/index.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{eval('const buildList = __webpack_require__(/*! ./buildList.js */ "./src/buildList.js");\n\nfor (let i = 0; i < buildList.length; i++) {\n\tconst cb = buildList[i];\n\tGM.registerMenuCommand(cb.runame + " | " + cb.name, () => input.execute("game_stats_build " + cb.build));\n}\n\nGM.registerMenuCommand("Рандомный билд", () => {\n\tlet b = "";\n\twhile (b.length != 33) {\n\t\tconst r = (Math.floor(Math.random() * 8) + 1).toString();\n\t\tif (b.match(new RegExp(r, "g"))?.length == 7) continue;\n\t\tb += r;\n\t}\n\tinput.execute("game_stats_build " + b);\n});\n\nGM.registerMenuCommand("Застакать пули", () => {\n\tconst fire = (t, w) => {\n\t\tsetTimeout(input.keyDown, t * 1000    , 32);\n\t\tsetTimeout(input.keyUp  , t * 1000 + w, 32);\n\t}\n\tfire(0, 100);\n\tfire(0.75, 200);\n\tfire(1.5, 750);\n\tsetTimeout(input.keyDown, 2000, 69);\n});\n__webpack_require__(/*! ./allyRadar.js */ "./src/allyRadar.js");\n\n\n\n\n//# sourceURL=webpack://dcfee/./src/index.js?')}},__webpack_module_cache__={};function __webpack_require__(t){var n=__webpack_module_cache__[t];if(void 0!==n)return n.exports;var e=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](e,e.exports,__webpack_require__),e.exports}var __webpack_exports__=__webpack_require__("./src/index.js")})();
