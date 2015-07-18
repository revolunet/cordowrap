"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Q = require("Q");

var isCordova = window && window.cordova;

var CordoWrap = function CordoWrap() {
    _classCallCheck(this, CordoWrap);
};

exports["default"] = CordoWrap;

var Battery = (function () {
    function Battery() {
        _classCallCheck(this, Battery);

        this.level = null;
        if (window) {
            window.addEventListener("batterystatus", this.onBatteryStatus, false);
            window.addEventListener("batterycritical", this.onBatteryCritical, false);
            window.addEventListener("batterylow", this.onBatteryLow, false);
        }
    }

    _createClass(Battery, [{
        key: "onBatteryStatus",
        value: function onBatteryStatus(info) {
            this.level = info.level;
            console.Log("Battery.status", arguments);
        }
    }, {
        key: "onBatteryCritical",
        value: function onBatteryCritical(info) {
            console.Log("Battery.CRITICAL", arguments);
        }
    }, {
        key: "onBatteryLow",
        value: function onBatteryLow(info) {
            console.Log("Battery.LOW", arguments);
        }
    }]);

    return Battery;
})();

var Contacts = (function () {
    function Contacts() {
        _classCallCheck(this, Contacts);
    }

    _createClass(Contacts, [{
        key: "find",
        value: function find() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref$fields = _ref.fields;
            var fields = _ref$fields === undefined ? ["*"] : _ref$fields;
            var _ref$options = _ref.options;
            var options = _ref$options === undefined ? {} : _ref$options;

            var deferred = Q.defer();
            function onSuccess() {
                console.log("onSuccess", arguments);
                deferred.resolve(arguments);
            }
            navigator.contacts.find(fields, onSuccess, deferred.reject, options);
            return deferred.promise;
        }
    }]);

    return Contacts;
})();

c = Contacts();
c.find();
module.exports = exports["default"];