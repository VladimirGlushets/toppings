webpackJsonp_name_([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(6);
	
	var _const = __webpack_require__(8);
	
	var _const2 = _interopRequireDefault(_const);
	
	var _dataServiceProxy = __webpack_require__(9);
	
	var _dataServiceProxy2 = _interopRequireDefault(_dataServiceProxy);
	
	var _viewService = __webpack_require__(13);
	
	var _viewService2 = _interopRequireDefault(_viewService);
	
	var _publisher = __webpack_require__(16);
	
	var _publisher2 = _interopRequireDefault(_publisher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// controller get requests, generate nesessary html and put it in DOM
	var ThemeController = function () {
	    function ThemeController() {
	        _classCallCheck(this, ThemeController);
	
	        this.dataServiceProxy = _dataServiceProxy2.default.getInstance();
	        this.viewService = _viewService2.default.getInstance();
	    }
	
	    _createClass(ThemeController, [{
	        key: 'fillThemes',
	        value: function fillThemes() {
	            var _this = this;
	
	            // get source data
	            this.dataServiceProxy.getAllThemes().then(function (data) {
	
	                // after getting data I converted it to DOM elements
	                var themesView = _this.viewService.getThemesView(data);
	
	                // render view
	                _this.renderView(themesView);
	            }).catch(function (err) {
	                console.log(err);
	            });
	        }
	    }, {
	        key: 'fillArticles',
	        value: function fillArticles(theme) {
	            var _this2 = this;
	
	            //get source data
	            this.dataServiceProxy.getArticlesForThema(theme).then(function (data) {
	
	                // after getting data I converted it to DOM elements
	                var articlesView = _this2.viewService.getArticlesView(data, _this2.fillThemes.bind(_this2));
	
	                // render view
	                _this2.renderView(articlesView);
	            }).catch(function (err) {
	                console.log(err);
	            });
	        }
	    }, {
	        key: 'renderView',
	        value: function renderView(view) {
	            var container = document.getElementById('content');
	            if (container) {
	                container.innerHTML = '';
	                container.appendChild(view);
	            }
	        }
	
	        // init start page
	
	    }, {
	        key: 'init',
	        value: function init() {
	            // subscribe 'fillArticles' controller's method for Publisher event 'changeTheme'
	            _publisher2.default.getInstance().subscribe(_const2.default.CHANGE_THEME, this.fillArticles.bind(this));
	            // subscribe 'fillThemes' controller's method for Publisher event 'back'
	            _publisher2.default.getInstance().subscribe(_const2.default.BACK, this.fillThemes.bind(this));
	            this.fillThemes();
	        }
	    }]);
	
	    return ThemeController;
	}();
	
	exports.default = ThemeController;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./article.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./article.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".content-container .back-btn {\r\n    cursor: pointer;\r\n    border: solid 1px orange;\r\n    font-weight: bold;\r\n    padding: 8px;\r\n    text-align: center;\r\n    margin: 15px;\r\n    width: 70px;\r\n}\r\n\r\n.content-container .back-btn:hover {\r\n    background-color: #ffc183;\r\n}\r\n\r\n.article-container {\r\n    margin-top: 5px;\r\n    background-color: white;\r\n    padding: 15px;\r\n}\r\n\r\n.article-container:hover {\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.article-container .body {\r\n    padding-right: 5px;\r\n    /*display: inline-block;*/\r\n    overflow: hidden;\r\n}\r\n\r\n.article-container .body .title {\r\n    margin-bottom: 15px;\r\n    font-size: 1.5em;\r\n    font-weight: bold;\r\n    text-align: left;\r\n}\r\n\r\n.article-container .body .title a {\r\n    color: red;\r\n    text-decoration: none;\r\n}\r\n\r\n.article-container .body .author {\r\n    color: green;\r\n    text-align: left;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.article-container .body .publish-at {\r\n    color: green;\r\n    text-align: left;\r\n    margin-top: 15px;\r\n}\r\n\r\n.article-container .image {\r\n    float: right;\r\n    margin-left: 15px;\r\n    display: table;\r\n}\r\n\r\n.article-container .image .floater {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n    width: 250px;\r\n    height: 150px;\r\n}\r\n\r\n.article-container .image img {\r\n    border: 0px;\r\n    float: right;\r\n    width: auto;\r\n    height: auto;\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}\r\n\r\n/* Portrait tablet to landscape and desktop */\r\n\r\n@media all and (min-width: 768px) and (max-width: 979px) {\r\n    .content-container {\r\n        width: 100%;\r\n    }\r\n    .article-container {\r\n        padding: 15px;\r\n        /*display: flex;*/\r\n        justify-content: center;\r\n        flex-direction: row;\r\n        align-items: center;\r\n    }\r\n}\r\n\r\n@media all and (min-width: 551px) and (max-width: 768px) {\r\n    .content-container {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n\r\n/* Landscape phone to portrait tablet */\r\n\r\n@media all and (max-width: 550px) {\r\n    .content-container {\r\n        width: 100%;\r\n    }\r\n    .article-container .body {\r\n        width: 100%;\r\n        margin-right: 5px;\r\n        margin-left: 5px;\r\n    }\r\n    .article-container .image {\r\n        display: none;\r\n    }\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var constants = {
	  THEME: 'theme',
	  ARTICLE: 'article',
	  CHANGE_THEME: 'changeTheme',
	  BACK: 'back'
	};
	
	exports.default = constants;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _dataService = __webpack_require__(10);
	
	var _dataService2 = _interopRequireDefault(_dataService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var instance = null;
	
	// use DataServiceProxy to cache list of themes
	
	var DataServiceProxy = function (_DataService) {
	    _inherits(DataServiceProxy, _DataService);
	
	    function DataServiceProxy() {
	        _classCallCheck(this, DataServiceProxy);
	
	        return _possibleConstructorReturn(this, (DataServiceProxy.__proto__ || Object.getPrototypeOf(DataServiceProxy)).apply(this, arguments));
	    }
	
	    _createClass(DataServiceProxy, [{
	        key: 'getAllThemes',
	        value: function getAllThemes() {
	            if (!this.themes) {
	                this.themes = _get(DataServiceProxy.prototype.__proto__ || Object.getPrototypeOf(DataServiceProxy.prototype), 'getAllThemes', this).call(this);
	            }
	            return this.themes;
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (!instance) {
	                instance = new DataServiceProxy();
	            }
	
	            // return singltone
	            return instance;
	        }
	    }]);
	
	    return DataServiceProxy;
	}(_dataService2.default);
	
	exports.default = DataServiceProxy;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import $ from "jquery";
	
	//var json = require('../data/groups.json'); //(with path)
	
	var _urlService = __webpack_require__(11);
	
	var _urlService2 = _interopRequireDefault(_urlService);
	
	var _groups = __webpack_require__(12);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// service for providing source data from API
	var DataService = function () {
	  function DataService() {
	    _classCallCheck(this, DataService);
	
	    this.urlService = _urlService2.default.getInstance();
	  }
	
	  _createClass(DataService, [{
	    key: 'getAllThemes',
	    value: function getAllThemes() {
	      return new Promise(function (resolve, reject) {
	        resolve(_groups2.default);
	      });
	    }
	  }, {
	    key: 'getArticlesForThema',
	    value: function getArticlesForThema(id) {
	      return new Promise(function (resolve, reject) {
	        var group = _groups2.default.filter(function (el) {
	          return el.id == id[0];
	        });
	        resolve(group[0].toppings);
	      });
	    }
	  }]);
	
	  return DataService;
	}();
	
	exports.default = DataService;
	;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// private variables
	var themesUrl = 'https://newsapi.org/v1/sources';
	var apiKey = '05d1310787a94c24a707f1c3c8d2584c';
	
	var instance = null;
	
	var UrlService = function () {
	    function UrlService() {
	        _classCallCheck(this, UrlService);
	    }
	
	    _createClass(UrlService, [{
	        key: 'getThemesUrl',
	        value: function getThemesUrl() {
	            return themesUrl;
	        }
	
	        // method generate and return url for current theme
	
	    }, {
	        key: 'getArticlesUrl',
	        value: function getArticlesUrl(theme) {
	            return 'https://newsapi.org/v1/articles?source=' + theme + '&apiKey=' + apiKey;
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (!instance) {
	                instance = new UrlService();
	            }
	
	            // return singltone
	            return instance;
	        }
	    }]);
	
	    return UrlService;
	}();
	
	exports.default = UrlService;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": 1,
			"groupName": "Кофейная группа",
			"description": "description",
			"groupImage": "",
			"toppings": [
				{
					"id": 1,
					"tpoppingName": "Кофейный tpoppingName",
					"shortDescription": "shortDescription",
					"description": "Description",
					"imageUrl": ""
				}
			]
		},
		{
			"id": 2,
			"groupName": "Коктейльная группа",
			"description": "description",
			"groupImage": "",
			"toppings": [
				{
					"id": 1,
					"tpoppingName": "Коктейльный tpoppingName",
					"shortDescription": "shortDescription",
					"description": "Description",
					"imageUrl": ""
				}
			]
		},
		{
			"id": 3,
			"groupName": "Фруктовая группа",
			"description": "description",
			"groupImage": "",
			"toppings": [
				{
					"id": 1,
					"tpoppingName": "Фруктовый tpoppingName",
					"shortDescription": "shortDescription",
					"description": "Description",
					"imageUrl": ""
				}
			]
		},
		{
			"id": 4,
			"groupName": "Ягодная группа",
			"description": "description",
			"groupImage": "",
			"toppings": [
				{
					"id": 1,
					"tpoppingName": "Ягодный tpoppingName",
					"shortDescription": "shortDescription",
					"description": "Description",
					"imageUrl": ""
				}
			]
		}
	];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _const = __webpack_require__(8);
	
	var _const2 = _interopRequireDefault(_const);
	
	var _componentFactory = __webpack_require__(14);
	
	var _componentFactory2 = _interopRequireDefault(_componentFactory);
	
	var _publisher = __webpack_require__(16);
	
	var _publisher2 = _interopRequireDefault(_publisher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var getBackEl = function getBackEl(callback) {
	    var back = document.createElement("div");
	    back.setAttribute("class", "back-btn");
	    back.innerHTML = "Back";
	    back.addEventListener("click", callback, false);
	    return back;
	};
	
	var instance = null;
	
	// service for converting JSON objects to HTML themes and articles objects
	
	var ViewService = function () {
	    function ViewService() {
	        _classCallCheck(this, ViewService);
	
	        this.componentFactory = new _componentFactory2.default();
	    }
	
	    _createClass(ViewService, [{
	        key: 'getThemesView',
	        value: function getThemesView(sourceObjs, callback) {
	            var _this = this;
	
	            // get themes view components
	            var viewElements = sourceObjs.map(function (el) {
	                return _this.componentFactory.createViewComponent(el, _const2.default.THEME, callback).getView();
	            });
	
	            var container = document.createElement("div");
	
	            viewElements.forEach(function (el) {
	                container.appendChild(el);
	            });
	
	            return container;
	        }
	    }, {
	        key: 'getArticlesView',
	        value: function getArticlesView(sourceObjs, callback) {
	            var _this2 = this;
	
	            // get articles view components
	            var viewElements = sourceObjs.map(function (el) {
	                return _this2.componentFactory.createViewComponent(el, _const2.default.ARTICLE).getView();
	            });
	
	            var container = document.createElement("div");
	
	            //create back-btn element
	            var back = getBackEl(this.goBack);
	            container.appendChild(back);
	
	            viewElements.forEach(function (el) {
	                container.appendChild(el);
	            });
	
	            return container;
	        }
	    }, {
	        key: 'goBack',
	        value: function goBack() {
	
	            // init notifying all callbacks, subscraibed on back event
	            _publisher2.default.getInstance().notify(_const2.default.BACK);
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (!instance) {
	                instance = new ViewService();
	            }
	            // return singltone
	            return instance;
	        }
	    }]);
	
	    return ViewService;
	}();
	
	exports.default = ViewService;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _const = __webpack_require__(8);
	
	var _const2 = _interopRequireDefault(_const);
	
	var _themeViewComponent = __webpack_require__(15);
	
	var _themeViewComponent2 = _interopRequireDefault(_themeViewComponent);
	
	var _articleViewComponent = __webpack_require__(17);
	
	var _articleViewComponent2 = _interopRequireDefault(_articleViewComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// factory fo creating view components
	var ComponentFactory = function () {
	    function ComponentFactory() {
	        _classCallCheck(this, ComponentFactory);
	    }
	
	    _createClass(ComponentFactory, [{
	        key: 'createViewComponent',
	        value: function createViewComponent(componentSourceObj, componentName, callback) {
	            switch (componentName) {
	                case _const2.default.THEME:
	                    return new _themeViewComponent2.default(componentSourceObj, callback);
	                    break;
	
	                case _const2.default.ARTICLE:
	                    return new _articleViewComponent2.default(componentSourceObj);
	                    break;
	
	                default:
	                    break;
	            }
	        }
	    }]);
	
	    return ComponentFactory;
	}();
	
	exports.default = ComponentFactory;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _const = __webpack_require__(8);
	
	var _const2 = _interopRequireDefault(_const);
	
	var _publisher = __webpack_require__(16);
	
	var _publisher2 = _interopRequireDefault(_publisher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// private method
	var getImageElement = function getImageElement(id, imageUrl, callback) {
	    var image = document.createElement("div");
	    image.setAttribute("class", "image");
	
	    var floater = document.createElement("div");
	    floater.setAttribute("class", "floater");
	
	    var a = document.createElement("a");
	    a.setAttribute("href", "#");
	    a.addEventListener("click", function () {
	        callback(id);
	    }, false);
	
	    var img = document.createElement("img");
	    img.setAttribute("src", imageUrl);
	
	    a.appendChild(img);
	    floater.appendChild(a);
	    image.appendChild(floater);
	    return image;
	};
	
	// private method
	var getTitleElement = function getTitleElement(id, title, callback) {
	    var titleEl = document.createElement("div");
	    titleEl.setAttribute("class", "title");
	
	    var a = document.createElement("a");
	    a.setAttribute("href", "#");
	    a.innerHTML = title;
	    a.addEventListener("click", function () {
	        callback(id);
	    }, false);
	
	    titleEl.appendChild(a);
	    return titleEl;
	};
	
	// private method
	var getDescriptionElement = function getDescriptionElement(description) {
	    var descriptionEl = document.createElement("div");
	    descriptionEl.setAttribute("class", "description");
	    descriptionEl.innerHTML = description;
	
	    return descriptionEl;
	};
	
	var ThemeViewComponent = function () {
	    function ThemeViewComponent(componentSourceObj) {
	        _classCallCheck(this, ThemeViewComponent);
	
	        this.componentSourceObj = componentSourceObj;
	    }
	
	    _createClass(ThemeViewComponent, [{
	        key: 'getView',
	        value: function getView() {
	            var root = document.createElement("div");
	            root.setAttribute("class", "article-container");
	
	            var body = document.createElement("div");
	            body.setAttribute("class", "body");
	
	            var image = getImageElement(this.componentSourceObj.id, this.groupImage, this.changeSelectedThemeId);
	
	            var title = getTitleElement(this.componentSourceObj.id, this.componentSourceObj.groupName, this.changeSelectedThemeId);
	
	            var description = getDescriptionElement(this.componentSourceObj.description);
	
	            body.appendChild(image);
	            body.appendChild(title);
	            body.appendChild(description);
	
	            root.appendChild(body);
	            return root;
	        }
	    }, {
	        key: 'changeSelectedThemeId',
	        value: function changeSelectedThemeId(id) {
	            //init notifying all callbacks, subscraibed on changeTheme event
	            _publisher2.default.getInstance().notify(_const2.default.CHANGE_THEME, id);
	        }
	    }]);
	
	    return ThemeViewComponent;
	}();
	
	exports.default = ThemeViewComponent;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var instance = null;
	
	// Publisher singleton object for implementing Observer pattern
	// https://habrahabr.ru/post/132472/
	
	var Publisher = function () {
	    function Publisher() {
	        _classCallCheck(this, Publisher);
	
	        // to store subscribers
	        this.observers = new Map();
	    }
	
	    // singltone
	
	
	    _createClass(Publisher, [{
	        key: "subscribe",
	
	
	        // label - event name ('back', 'changeTheme', and others)
	        value: function subscribe(label, callback) {
	            if (!this.observers.has(label)) {
	                this.observers.set(label, []);
	            }
	            this.observers.get(label).push(callback);
	        }
	    }, {
	        key: "unsubscribe",
	        value: function unsubscribe(label, callback) {
	            if (this.observers.has(label)) {
	                var callbacks = observers.get(label);
	                var newcallbacks = callbacks.filter(function (e) {
	                    return e != callback;
	                });
	                this.observers.set(label, newcallbacks);
	                return true;
	            }
	            return false;
	        }
	
	        // method for notifying all observers
	
	    }, {
	        key: "notify",
	        value: function notify(label) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            if (this.observers.has(label)) {
	                var callbacks = this.observers.get(label);
	                callbacks.forEach(function (callback) {
	                    callback(args);
	                });
	                return true;
	            }
	            return false;
	        }
	    }], [{
	        key: "getInstance",
	        value: function getInstance() {
	            if (!instance) {
	                instance = new Publisher();
	            }
	            return instance;
	        }
	    }]);
	
	    return Publisher;
	}();
	
	exports.default = Publisher;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// private method
	var getImageElement = function getImageElement(imageUrl, articleUrl) {
	    var image = document.createElement("div");
	    image.setAttribute("class", "image");
	
	    var floater = document.createElement("div");
	    floater.setAttribute("class", "floater");
	
	    var a = document.createElement("a");
	    a.setAttribute("href", articleUrl);
	    a.setAttribute("target", "_blank");
	
	    var img = document.createElement("img");
	    img.setAttribute("src", imageUrl);
	
	    a.appendChild(img);
	    floater.appendChild(a);
	    image.appendChild(floater);
	    return image;
	};
	
	// private method
	var getTitleElement = function getTitleElement(articleUrl, title) {
	    var titleEl = document.createElement("div");
	    titleEl.setAttribute("class", "title");
	
	    var a = document.createElement("a");
	    a.setAttribute("href", articleUrl);
	    a.setAttribute("target", "_blank");
	    a.innerHTML = title;
	
	    titleEl.appendChild(a);
	    return titleEl;
	};
	
	// private method
	var getAuthorElement = function getAuthorElement(author) {
	    var authorEl = document.createElement("div");
	    authorEl.setAttribute("class", "author");
	    authorEl.innerHTML = author ? 'by ' + author : '';
	
	    return authorEl;
	};
	
	// private method
	var getDescriptionElement = function getDescriptionElement(description) {
	    var descriptionEl = document.createElement("div");
	    descriptionEl.setAttribute("class", "description");
	    descriptionEl.innerHTML = description;
	
	    return descriptionEl;
	};
	
	// private method
	var getPublishAtElement = function getPublishAtElement(publishAt) {
	    var publishAtEl = document.createElement("div");
	    publishAtEl.setAttribute("class", "publish-at");
	    publishAtEl.innerHTML = publishAt ? publishAt : '';
	
	    return publishAtEl;
	};
	
	var ArticleViewComponent = function () {
	    function ArticleViewComponent(componentSourceObj) {
	        _classCallCheck(this, ArticleViewComponent);
	
	        this.componentSourceObj = componentSourceObj;
	    }
	
	    _createClass(ArticleViewComponent, [{
	        key: "getView",
	        value: function getView() {
	            var root = document.createElement("div");
	            root.setAttribute("class", "article-container");
	
	            var body = document.createElement("div");
	            body.setAttribute("class", "body");
	
	            var image = getImageElement(this.componentSourceObj.imageUrl, this.componentSourceObj.url);
	
	            var title = getTitleElement(this.componentSourceObj.url, this.componentSourceObj.tpoppingName);
	
	            var author = getAuthorElement(this.componentSourceObj.author);
	
	            var description = getDescriptionElement(this.componentSourceObj.shortDescription);
	
	            var publishAt = getPublishAtElement(this.componentSourceObj.publishedAt);
	
	            body.appendChild(image);
	            body.appendChild(title);
	            body.appendChild(author);
	            body.appendChild(description);
	            body.appendChild(publishAt);
	
	            root.appendChild(body);
	            return root;
	        }
	    }]);
	
	    return ArticleViewComponent;
	}();
	
	exports.default = ArticleViewComponent;

/***/ }
]);
//# sourceMappingURL=1.1.js.map