export default function getNodeVertexShader () {
  return `
  uniform float border_width;
  uniform float node_size;
  // uniform vec3 node_position;

  varying float visBorder;
  varying float highlightBorder;
  float visBorder_ = 8.0;
  float highlightBorder_ = 0.0;
  void main() {
    visBorder = visBorder_;
    highlightBorder = highlightBorder_;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = (node_size + border_width + visBorder_ + highlightBorder_);
    gl_Position = projectionMatrix * mvPosition;
  }
`
}
