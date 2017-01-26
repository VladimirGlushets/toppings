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