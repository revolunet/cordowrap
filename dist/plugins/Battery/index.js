"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Battery = (function () {
    function Battery(cordoWrap) {
        _classCallCheck(this, Battery);

        this.level = null;
        if (cordoWrap.isCordova) {
            window.addEventListener("batterystatus", this.onBatteryStatus, false);
            window.addEventListener("batterycritical", this.onBatteryCritical, false);
            window.addEventListener("batterylow", this.onBatteryLow, false);
        }
    }

    _createClass(Battery, [{
        key: "onBatteryStatus",
        value: function onBatteryStatus(info) {
            this.level = info.level;
            console.Log("Battery.STATUS", arguments);
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

exports["default"] = Battery;
module.exports = exports["default"];