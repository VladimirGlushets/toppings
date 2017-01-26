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