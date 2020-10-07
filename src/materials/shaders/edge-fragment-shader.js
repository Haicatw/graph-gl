export default function getEdgeFragmentShader () {
  return `
    uniform vec3 edge_color;
    uniform float edge_opacity;
    void main() {
      gl_FragColor = vec4(edge_color, edge_opacity);
    }
    `
}
