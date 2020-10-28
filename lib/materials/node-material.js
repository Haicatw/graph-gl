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
      size = _ref.size,
      borderColor = _ref.borderColor,
      borderWidth = _ref.borderWidth;

  var vertexShader = (0, _nodeVertexShader2.default)();
  var fragmentShader = (0, _nodeFragmentShader2.default)();
  // console.log(color, new THREE.Color(color))
  // console.log(borderColor, new THREE.Color(borderColor))
  return new THREE.ShaderMaterial({
    uniforms: {
      node_color: { value: new THREE.Color(color) },
      border_color: { value: new THREE.Color(borderColor) },
      node_opacity: { value: opacity },
      position: { value: new THREE.Vector3(x, y, 0) },
      node_size: { value: size / 2 },
      border_width: { value: borderWidth }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
}