'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = require('../common/const');

var _const2 = _interopRequireDefault(_const);

var _componentFactory = require('../factories/componentFactory');

var _componentFactory2 = _interopRequireDefault(_componentFactory);

var _publisher = require('../common/publisher');

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