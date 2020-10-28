'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLabelMaterial;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _labelVertexShader = require('./shaders/label-vertex-shader');

var _labelVertexShader2 = _interopRequireDefault(_labelVertexShader);

var _labelFragmentShader = require('./shaders/label-fragment-shader');

var _labelFragmentShader2 = _interopRequireDefault(_labelFragmentShader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createLabelMaterial(_ref) {
  var x = _ref.x,
      y = _ref.y,
      texture = _ref.texture;

  var vertexShader = (0, _labelVertexShader2.default)();
  var fragmentShader = (0, _labelFragmentShader2.default)();
  return new THREE.ShaderMaterial({
    uniforms: {
      texture: { type: 't', value: texture },
      uvOffset: { type: 'v', value: new THREE.Vector2(0, 0) },
      label_position: { value: new THREE.Vector3(x, y, 0.2) }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
}