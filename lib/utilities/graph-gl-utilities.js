'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDimensions = getDimensions;
exports.getTextTexture = getTextTexture;

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDimensions(selector) {
  var height = (0, _cashDom2.default)(selector).innerHeight();
  var width = (0, _cashDom2.default)(selector).innerWidth();
  return { width: width, height: height };
}

// Modified from https://css-tricks.com/techniques-for-rendering-text-with-webgl/#article-header-id-2
function createTextCanvas(text) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // Prepare the font to be able to measure
  var fontSize = parameters.fontSize || 56;
  ctx.font = fontSize + 'px monospace';

  var textMetrics = ctx.measureText(text);

  var width = textMetrics.width;
  var height = fontSize;

  // const dimensions = width > height ? width : height

  // Resize canvas to match text size
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  // canvas.width = dimensions
  // canvas.height = dimensions
  // canvas.style.width = dimensions + 'px'
  // canvas.style.height = dimensions + 'px'

  // Re-apply font since canvas is resized.
  ctx.font = fontSize + 'px monospace';
  ctx.textAlign = parameters.align || 'center';
  ctx.textBaseline = parameters.baseline || 'middle';

  // Make the canvas transparent for simplicity
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = parameters.color || 'white';
  ctx.fillText(text, width / 2, height / 2);

  return canvas;
}

function getTextTexture(text, color) {
  var texture = new THREE.Texture(createTextCanvas(text, { color: color }));
  // console.log(texture)
  return texture;
}