'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPickerMaterial;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _pickerVertexShader = require('./shaders/picker-vertex-shader');

var _pickerVertexShader2 = _interopRequireDefault(_pickerVertexShader);

var _pickerFragmentShader = require('./shaders/picker-fragment-shader');

var _pickerFragmentShader2 = _interopRequireDefault(_pickerFragmentShader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createPickerMaterial() {
  var vertexShader = (0, _pickerVertexShader2.default)();
  var fragmentShader = (0, _pickerFragmentShader2.default)();
  // console.log(color, new THREE.Color(color))
  // console.log(borderColor, new THREE.Color(borderColor))
  return new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: false,
    side: THREE.DoubleSide
  });
}