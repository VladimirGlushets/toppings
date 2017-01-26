'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urlService = require('./urlService');

var _urlService2 = _interopRequireDefault(_urlService);

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
            return axios.get(this.urlService.getThemesUrl()).then(function (response) {
                if (response.status != 200) {
                    console.log(response);
                } else {
                    return response.data.sources;
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'getArticlesForThema',
        value: function getArticlesForThema(thema) {
            return axios.get(this.urlService.getArticlesUrl(thema)).then(function (response) {
                if (response.status != 200) {
                    console.log(response);
                } else {
                    return response.data.articles;
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }]);

    return DataService;
}();

exports.default = DataService;
;