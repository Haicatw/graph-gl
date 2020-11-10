export default function getNodeFragmentShader () {
  return `
    uniform vec3 node_color;
    uniform vec3 border_color;
    uniform float border_width;
    uniform float node_size;
    uniform float node_opacity;
    varying float visBorder;
    varying float highlightBorder;

    void main() {
      float distance = length(2.0 * gl_PointCoord - 1.0);
      // float pct = distance(vec2(0.0),vec2(0.5));
      float ss = smoothstep(0.5, node_size*0.5, distance * (node_size*1.5));
      gl_FragColor = ss * vec4(node_color, node_opacity);
      float overall_size = node_size + border_width + visBorder + highlightBorder;
      float normNodeSize = node_size / overall_size;
      float normBorderWidth = border_width / overall_size;
      float normVisBorder = visBorder / overall_size;
      float normHighlightBorder = highlightBorder / overall_size;
      float inner_edge = node_size;
      float outer_edge = node_size + 8.0;
      float smooth_edge = smoothstep(inner_edge, outer_edge, distance * (node_size + border_width));
      gl_FragColor = ( vec4(border_color, 1.0) * smooth_edge) + (((1.0 - normVisBorder - normHighlightBorder) - smooth_edge) * gl_FragColor);
      smooth_edge = smoothstep(node_size + border_width, node_size + border_width + 8.0, distance * (node_size + border_width + visBorder));
      gl_FragColor = ( vec4(vec3(0.5), 1.0) * smooth_edge) + (((1.0 - normHighlightBorder) - smooth_edge) * gl_FragColor);
      smooth_edge = smoothstep(node_size + border_width + visBorder, node_size + border_width + visBorder, distance * (overall_size));
      gl_FragColor = ( vec4(vec3(0.5), 1.0) * smooth_edge) + (((1.0)- smooth_edge) * gl_FragColor);
      if (distance > 1.0) {
        discard;
      }
    }
  `
}

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
