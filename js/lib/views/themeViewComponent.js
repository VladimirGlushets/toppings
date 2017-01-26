'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = require('../common/const');

var _const2 = _interopRequireDefault(_const);

var _publisher = require('../common/publisher');

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

            var image = getImageElement(this.componentSourceObj.id, this.componentSourceObj.urlsToLogos.small, this.changeSelectedThemeId);

            var title = getTitleElement(this.componentSourceObj.id, this.componentSourceObj.name, this.changeSelectedThemeId);

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