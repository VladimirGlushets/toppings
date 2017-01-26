'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../../../css/article.css');

var _const = require('../common/const');

var _const2 = _interopRequireDefault(_const);

var _dataServiceProxy = require('../services/dataServiceProxy');

var _dataServiceProxy2 = _interopRequireDefault(_dataServiceProxy);

var _viewService = require('../services/viewService');

var _viewService2 = _interopRequireDefault(_viewService);

var _publisher = require('../common/publisher');

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