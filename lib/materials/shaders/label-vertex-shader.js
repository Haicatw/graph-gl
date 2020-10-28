"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLabelVertexShader;
function getLabelVertexShader() {
  return "\n  uniform vec2 uvOffset;\n  uniform sampler2D texture;\n  uniform vec3 label_position\n  varying vec2 vUv;\n  void main() {\n    vec4 mvPosition = modelViewMatrix * vec4( label_position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n  }\n";
}