"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getNodeFragmentShader;
function getNodeFragmentShader() {
    return "\n    uniform vec3 color;\n    uniform float opacity;\n    uniform float size;\n    \n    void main() {\n      vec4 bkg_color = vec4(1.0, 1.0, 1.0, 0.0);\n      vec4 border_color = vec4(0,\n                               0,\n                               0,\n                               color.a);\n      vec4 center_color = vec4(color.x*1.15,\n                               color.y*1.15,\n                               color.z*1.15,\n                               color.a);\n  \n      vec2 c = 2.0 * gl_PointCoord - 1.0;\n      float r = dot(c, c);\n      float delta = fwidth(r);\n  \n      float dist_light = length(c - vec2(-0.5,-0.5));\n      vec4 sphere = mix(center_color, color, dist_light);\n  \n  \n      float borderSize = 0.6 + 0.35*sqrt((size - 5.0)/(100.0-5.0));\n      float alpha = 1.0 - smoothstep(borderSize - delta,\n                                     borderSize, r);\n      vec4 border = mix(border_color, sphere, alpha);\n  \n      alpha = 1.0 - smoothstep(1.0 - delta,\n                                     1.0, r);\n  \n      frag_color = mix(bkg_color, border, alpha);\n    }\n  ";
}