"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeVertexShader;
function getNodeVertexShader() {
  return "\n  uniform float border_width;\n  uniform float node_size;\n  // uniform vec3 node_position;\n\n  varying float visBorder;\n  varying float highlightBorder;\n  float visBorder_ = 8.0;\n  float highlightBorder_ = 0.0;\n  void main() {\n    visBorder = visBorder_;\n    highlightBorder = highlightBorder_;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_PointSize = (node_size + border_width + visBorder_ + highlightBorder_);\n    gl_Position = projectionMatrix * mvPosition;\n  }\n";
}