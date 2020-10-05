'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNodeMaterial;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _nodeVertexShader = require('./shaders/node-vertex-shader');

var _nodeVertexShader2 = _interopRequireDefault(_nodeVertexShader);

var _nodeFragmentShader = require('./shaders/node-fragment-shader');

var _nodeFragmentShader2 = _interopRequireDefault(_nodeFragmentShader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createNodeMaterial(_ref) {
  var x = _ref.x,
      y = _ref.y,
      color = _ref.color,
      opacity = _ref.opacity,
      size = _ref.size;

  var vertexShader = (0, _nodeVertexShader2.default)();
  var fragmentShader = (0, _nodeFragmentShader2.default)();
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { type: 'vec3', value: new THREE.Color(color) },
      opacity: { type: 'f', value: opacity },
      position: { type: 'vec3', value: new THREE.Vector3(x, y, 0) },
      size: { type: 'f', value: size }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
}