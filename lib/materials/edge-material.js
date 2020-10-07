'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEdgeMaterial;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _edgeVertexShader = require('./shaders/edge-vertex-shader');

var _edgeVertexShader2 = _interopRequireDefault(_edgeVertexShader);

var _edgeFragmentShader = require('./shaders/edge-fragment-shader');

var _edgeFragmentShader2 = _interopRequireDefault(_edgeFragmentShader);

var _runtimeSettings = require('../runtimeSettings/runtime-settings');

var _runtimeSettings2 = _interopRequireDefault(_runtimeSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createEdgeMaterial(_ref) {
  var positions = _ref.positions,
      color = _ref.color,
      opacity = _ref.opacity,
      width = _ref.width;

  var vertexShader = (0, _edgeVertexShader2.default)();
  var fragmentShader = (0, _edgeFragmentShader2.default)();
  return new THREE.ShaderMaterial({
    uniforms: {
      edge_color: { value: new THREE.Color(color) },
      edge_opacity: { value: opacity },
      source_position: { value: new THREE.Vector3(positions.source.x, positions.source.y, positions.source.z) },
      target_position: { value: new THREE.Vector3(positions.target.x, positions.target.y, positions.target.z) },
      edge_width: { value: width },
      resolution: { value: new THREE.Vector2(_runtimeSettings2.default.settings.width, _runtimeSettings2.default.settings.height) }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
}