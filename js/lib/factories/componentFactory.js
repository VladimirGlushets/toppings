'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = require('../common/const');

var _const2 = _interopRequireDefault(_const);

var _themeViewComponent = require('../views/themeViewComponent');

var _themeViewComponent2 = _interopRequireDefault(_themeViewComponent);

var _articleViewComponent = require('../views/articleViewComponent');

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