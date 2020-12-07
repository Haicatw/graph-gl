"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPickerVertexShader;
function getPickerVertexShader() {
  return "\n  uniform vec3 uIdColor;\n  varying vec3 vidcolor;\n  varying float pointSize_;\n  void main() {\n    gl_FragColor = vec4(uIdColor, 1.0);\n    // float distance = length(2.0 * gl_PointCoord - 1.0);\n    // float inner_edge = pointSize_;\n    // float outer_edge = pointSize_ + 2.0;\n    // float smooth_edge = smoothstep(inner_edge, outer_edge, distance * pointSize_);\n    // gl_FragColor = ( vec4(vidcolor, 1.0) * smooth_edge) + ((1.0 - smooth_edge) * gl_FragColor);\n    // if (distance > 1.0) {\n    //   discard;\n    // }\n  }";
}