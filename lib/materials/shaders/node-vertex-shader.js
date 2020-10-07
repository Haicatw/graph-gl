"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeVertexShader;
function getNodeVertexShader() {
  return "\n  uniform float border_width;\n  uniform float node_size;\n  // uniform vec3 position;\n  void main() {\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_PointSize = (node_size + border_width);\n    gl_Position = projectionMatrix * mvPosition;\n  }\n";
}