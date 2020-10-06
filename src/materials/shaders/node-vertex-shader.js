export default function getNodeVertexShader () {
  return `
  uniform float border_width;
  uniform float node_size;
  // uniform vec3 position;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = (node_size + border_width);
    gl_Position = projectionMatrix * mvPosition;
  }
`
}
