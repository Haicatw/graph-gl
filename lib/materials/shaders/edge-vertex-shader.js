"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getEdgeVertexShader;
function getEdgeVertexShader() {
  return "\n    // precision mediump float;\n    uniform vec3 source_position;\n    uniform vec3 target_position;\n    uniform vec3 edge_color;\n    uniform vec2 resolution;\n    uniform float edge_width;\n    void main() {\n      // vec4 source_position_ = vec4(source_position, 1.0);\n      vec4 clip_src = projectionMatrix * modelViewMatrix * vec4(source_position, 1.0);\n      vec4 clip_tar = projectionMatrix * modelViewMatrix * vec4(target_position, 1.0);\n      vec2 screen_source = resolution * (0.5 * clip_src.xy/clip_src.w + 0.5);\n      vec2 screen_target = resolution * (0.5 * clip_tar.xy/clip_tar.w + 0.5);\n      vec2 xBasis = normalize(screen_target - screen_source);\n      vec2 yBasis = vec2(-xBasis.y, xBasis.x);\n      vec2 source = screen_source + edge_width * (position.x * xBasis + position.y * yBasis);\n      vec2 target = screen_target + edge_width * (position.x * xBasis + position.y * yBasis);\n      vec2 pt = mix(source, target, position.z);\n      vec4 clip = mix(clip_src, clip_tar, position.z);\n      gl_Position = vec4(clip.w * ((2.0 * pt) / resolution - 1.0), clip.z, clip.w);\n    }\n    ";
}