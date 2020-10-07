"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeFragmentShader;
function getNodeFragmentShader() {
  return "\n    uniform vec3 node_color;\n    uniform vec3 border_color;\n    uniform float border_width;\n    uniform float node_size;\n    uniform float node_opacity;\n    void main() {\n      gl_FragColor = vec4(node_color, node_opacity);\n      float distance = length(2.0 * gl_PointCoord - 1.0);\n      float overall_size = node_size + border_width;\n      float inner_edge = node_size;\n      float outer_edge = node_size + 2.0;\n      float smooth_edge = smoothstep(inner_edge, outer_edge, distance * overall_size);\n      gl_FragColor = ( vec4(border_color, 1.0) * smooth_edge) + ((1.0 - smooth_edge) * gl_FragColor);\n\n      if (distance > 1.0) {\n        discard;\n      }\n    }\n  ";
}