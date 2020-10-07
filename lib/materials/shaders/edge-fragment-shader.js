"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getEdgeFragmentShader;
function getEdgeFragmentShader() {
  return "\n    uniform vec3 edge_color;\n    uniform float edge_opacity;\n    void main() {\n      gl_FragColor = vec4(edge_color, edge_opacity);\n    }\n    ";
}