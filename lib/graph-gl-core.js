'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSettings = require('./default-settings');

var _defaultSettings2 = _interopRequireDefault(_defaultSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphGL = function GraphGL(settings) {
  _classCallCheck(this, GraphGL);

  if (!settings) {
    throw new Error('GraphGL constructor requires a settings object.');
  }
  if (!settings.selector) {
    throw new Error('selector field must be specified.');
  }
  this.settings = (0, _defaultSettings2.default)();
  for (var property in settings) {
    //   console.log(`${property}: ${settings[property]}`)
    this.settings[property] = settings[property];
  }
};

exports.default = GraphGL;