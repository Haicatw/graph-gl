'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDimensions = getDimensions;

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDimensions(selector) {
  var height = (0, _cashDom2.default)(selector).innerHeight();
  var width = (0, _cashDom2.default)(selector).innerWidth();
  return { width: width, height: height };
}