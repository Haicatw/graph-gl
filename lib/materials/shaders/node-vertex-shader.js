"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeVertexShader;
function getNodeVertexShader() {
  return "\n    attribute vec3 position;\n    \n    void main() {\n      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);\n      gl_Position = projectionMatrix * modelViewPosition;\n    }\n  ";
}