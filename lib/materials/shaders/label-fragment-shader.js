"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLabelFragmentShader;
function getLabelFragmentShader() {
  return "\n    uniform vec2 uvOffset;\n    uniform sampler2D texture;\n\n    varying vec2 vUv;\n    void main()\n    {\n      gl_FragColor = texture2D(texture, vUv + uvOffset); \n    }\n  ";
}