'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Q = require('Q');

var _Q2 = _interopRequireDefault(_Q);

var Contacts = (function () {
    function Contacts() {
        _classCallCheck(this, Contacts);
    }

    _createClass(Contacts, [{
        key: 'find',
        value: function find() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref$options = _ref.options;
            var options = _ref$options === undefined ? {} : _ref$options;

            var deferred = _Q2['default'].defer();
            try {
                navigator.contacts.find(options.fields, deferred.resolve, deferred.reject, options);
            } catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        }
    }]);

    return Contacts;
})();

exports['default'] = Contacts;
module.exports = exports['default'];