export default function getNodeFragmentShader () {
  return `
    uniform vec3 node_color;
    uniform vec3 border_color;
    uniform float border_width;
    uniform float node_size;
    uniform float node_opacity;
    void main() {
      gl_FragColor = vec4(node_color, node_opacity);
      float distance = length(2.0 * gl_PointCoord - 1.0);
      float overall_size = node_size + border_width;
      float inner_edge = node_size;
      float outer_edge = node_size + 2.0;
      float smooth_edge = smoothstep(inner_edge, outer_edge, distance * overall_size);
      gl_FragColor = ( vec4(border_color, 1.0) * smooth_edge) + ((1.0 - smooth_edge) * gl_FragColor);

      if (distance > 1.0) {
        discard;
      }
    }
  `
}
