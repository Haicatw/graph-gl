"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getNodeFragmentShader;
function getNodeFragmentShader() {
    return "\n    uniform vec3 node_color;\n    uniform vec3 border_color;\n    uniform float border_width;\n    uniform float node_size;\n    uniform float node_opacity;\n    varying float visBorder;\n    varying float highlightBorder;\n\n    void main() {\n    vec4 bkg_color = vec4(0.916, 0.916, 0.916, 0.0);\n    vec4 border_color = vec4(border_color, node_opacity);\n    vec4 node_colorv4 = vec4(node_color, node_opacity);                             \n    vec4 center_color = vec4(node_color.x*1.15,\n                             node_color.y*1.15,\n                             node_color.z*1.15,\n                             node_opacity);\n\n    vec2 c = 2.0 * gl_PointCoord - 1.0;\n    float r = dot(c, c);\n    float delta = fwidth(r);\n\n    float dist_light = length(c - vec2(-0.5,-0.5));\n    vec4 sphere = mix(center_color, node_colorv4, dist_light);\n\n\n    float borderSize = 0.6 + 0.35*sqrt((node_size - 5.0)/(100.0-5.0));\n    float alpha = 1.0 - smoothstep(borderSize - delta,\n                                   borderSize, r);\n    vec4 border = mix(border_color, sphere, alpha);\n\n    alpha = 1.0 - smoothstep(1.0 - delta, 1.0, r);\n\n    gl_FragColor = mix(bkg_color, border, alpha);\n    }\n  ";
}

// float distance = length(2.0 * gl_PointCoord - 1.0);
// // float pct = distance(vec2(0.0),vec2(0.5));
// float ss = smoothstep(0.5, node_size*0.5, distance * (node_size*1.5));
// gl_FragColor = ss * vec4(node_color, node_opacity);
// float overall_size = node_size + border_width + visBorder + highlightBorder;
// float normNodeSize = node_size / overall_size;
// float normBorderWidth = border_width / overall_size;
// float normVisBorder = visBorder / overall_size;
// float normHighlightBorder = highlightBorder / overall_size;
// float inner_edge = node_size;
// float outer_edge = node_size + 8.0;
// float smooth_edge = smoothstep(inner_edge, outer_edge, distance * (node_size + border_width));
// gl_FragColor = ( vec4(border_color, 1.0) * smooth_edge) + (((1.0 - normVisBorder - normHighlightBorder) - smooth_edge) * gl_FragColor);
// smooth_edge = smoothstep(node_size + border_width, node_size + border_width + 8.0, distance * (node_size + border_width + visBorder));
// gl_FragColor = ( vec4(vec3(0.5), 1.0) * smooth_edge) + (((1.0 - normHighlightBorder) - smooth_edge) * gl_FragColor);
// smooth_edge = smoothstep(node_size + border_width + visBorder, node_size + border_width + visBorder, distance * (overall_size));
// gl_FragColor = ( vec4(vec3(0.5), 1.0) * smooth_edge) + (((1.0)- smooth_edge) * gl_FragColor);
// if (distance > 1.0) {
//   discard;
// }

// float d = length(gl_PointCoord) - (node_size + border_width) + 1.0;
//       d = abs(d);
//       float a = 1.0;
//       if(d > 0.0) {a = exp(-d*d) * node_opacity;}
//       gl_FragColor = vec4(0.5*border_color, a);

// d = length(gl_PointCoord) - node_size + border_width;
// d = abs(d);
// a = 1.0;
// if(d > 0.0) {a = exp(-d*d) * node_opacity;}
// gl_FragColor = vec4(border_color, a);

// vec2 p = (gl_PointCoord)/(node_size);
// float z = 1.0 - length(p);
// if (z < 0.0) {discard;}
// gl_FragDepth = 0.5*(1.0 - z);
// vec3 color = vec3(1.0, 0.0, 0.0);
// vec3 normal = normalize(vec3(gl_PointCoord.xy, z));
// vec3 direction = normalize(vec3(1.0, 1.0, 1.0));
// float diffuse = max(0.0, dot(direction, normal));
// float specular = pow(diffuse, 10.0);
// gl_FragColor = vec4(max(diffuse*color, specular*vec3(1.0)), 1.0);