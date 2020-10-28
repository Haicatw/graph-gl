'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PolygonModels = function () {
  function PolygonModels() {
    _classCallCheck(this, PolygonModels);

    this.models = {};
  }

  _createClass(PolygonModels, [{
    key: 'read',
    value: function read(polygonObjects) {
      if (typeof polygonObjects === 'undefined') {
        throw new Error('Invalid polygon objects');
      }
      this.models = _lodash2.default.cloneDeep(polygonObjects);
      // TODO: Validation
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.models = {};
    }
  }, {
    key: 'polygons',
    get: function get() {
      return this.models;
    }
  }]);

  return PolygonModels;
}();

exports.default = PolygonModels;