/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/App.tsx":
/*!****************************!*\
  !*** ./src/client/App.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\nvar Home = function () { return react_1.default.createElement(\"h1\", null, \"Home\"); };\nvar About = function () { return react_1.default.createElement(\"h1\", null, \"About\"); };\nvar App = function () { return (react_1.default.createElement(react_router_dom_1.Routes, null,\n    react_1.default.createElement(react_router_dom_1.Route, { path: \"/\", element: react_1.default.createElement(Home, null) }),\n    react_1.default.createElement(react_router_dom_1.Route, { path: \"/about\", element: react_1.default.createElement(About, null) }))); };\nexports[\"default\"] = App;\n\n\n//# sourceURL=webpack://my-ssr-p/./src/client/App.tsx?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar server_1 = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\nvar App_1 = __webpack_require__(/*! ../client/App */ \"./src/client/App.tsx\");\nvar PORT = process.env.PORT || 3000;\nvar app = (0, express_1.default)();\napp.use(express_1.default.static('public'));\napp.get('*', function (req, res) {\n    var location = req.url;\n    var html = server_1.default.renderToString(react_1.default.createElement(react_router_dom_1.BrowserRouter, null, react_1.default.createElement(App_1.default)));\n    res.send(\"\\n    <!DOCTYPE html>\\n    <html>\\n      <head>\\n        <meta charset=\\\"utf-8\\\">\\n        <title>React SSR with Typescript</title>\\n      </head>\\n      <body>\\n        <div id=\\\"root\\\">\".concat(html, \"</div>\\n        <script src=\\\"/bundle.js\\\"></script>\\n      </body>\\n    </html>\\n  \"));\n});\napp.listen(PORT, function () {\n    console.log(\"Server is listening on port \".concat(PORT));\n});\n\n\n//# sourceURL=webpack://my-ssr-p/./src/server/index.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.ts");
/******/ 	
/******/ })()
;