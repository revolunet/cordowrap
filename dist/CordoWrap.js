'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Q = require('Q');

var _Q2 = _interopRequireDefault(_Q);

var IS_BROWSER = typeof window !== 'undefined';
var IS_CORDOVA = IS_BROWSER && window.cordova;

var defaultPlugins = {
    Contacts: require('./plugins/Contacts'),
    Battery: require('./plugins/Battery')
};

var defaultMocks = {
    Contacts: require('./plugins/Contacts/mocks')
};

/*
 handle plugins load
 */

var CordoWrap = (function () {
    // on startup, register available plugins

    function CordoWrap() {
        var _this = this;

        _classCallCheck(this, CordoWrap);

        this.plugins = {};
        this.mocks = {};
        // load default plugins
        Object.keys(defaultPlugins).map(function (name) {
            return _this.addPlugin({
                Plugin: defaultPlugins[name]
            });
        });
    }

    _createClass(CordoWrap, [{
        key: 'useDefaultMocks',
        value: function useDefaultMocks() {
            this.setMocks(defaultMocks);
        }
    }, {
        key: 'mockPlugin',

        /**
         * mock some plugin methods, return a promise
         */
        value: function mockPlugin(plugin, mocks) {
            if (mocks) {
                Object.keys(mocks).forEach(function (methodName) {
                    plugin[methodName] = function () {
                        return _Q2['default'].when(mocks[methodName]());
                    };
                });
            }
        }
    }, {
        key: 'setMocks',

        /**
         * add/update mocks
         */
        value: function setMocks(mocksData) {
            var _this2 = this;

            this.mocks = mocksData;
            Object.keys(this.plugins).forEach(function (pluginName) {
                _this2.mockPlugin(_this2.plugins[pluginName], mocksData[pluginName]);
            });
        }
    }, {
        key: 'addPlugin',
        value: function addPlugin(_ref) {
            var Plugin = _ref.Plugin;
            var _ref$options = _ref.options;
            var options = _ref$options === undefined ? {} : _ref$options;

            if (this.plugins[Plugin.name]) {
                return _Q2['default'].when(this.plugins[Plugin.name]);
            }

            // instanciate Plugin and resolve when ready
            var plugin = new Plugin(this, options);

            // register the plugin internally
            this.plugins[Plugin.name] = plugin;

            // add mocks
            if (this.mocks[Plugin.name]) {
                this.mockPlugin(plugin, this.mocks[Plugin.name]);
            }

            return _Q2['default'].when(plugin);
        }
    }, {
        key: 'isCordova',
        get: function get() {
            return IS_BROWSER && IS_CORDOVA;
        }
    }]);

    return CordoWrap;
})();

exports['default'] = CordoWrap;
module.exports = exports['default'];