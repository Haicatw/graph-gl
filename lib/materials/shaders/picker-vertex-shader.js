"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPickerVertexShader;
function getPickerVertexShader() {
  return "\n    attribute vec3 idcolor;\n    attribute float pointSize;\n    varying vec3 vidcolor;\n    varying float pointSize_;\n    void main() {\n      vidcolor = idcolor;\n      pointSize_ = pointSize;\n      gl_PointSize = pointSize;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);\n    }";
}