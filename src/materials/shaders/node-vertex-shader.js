export default function getNodeVertexShader () {
  return `
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = (size + borderWidth);
    gl_Position = projectionMatrix * mvPosition;
  }
`
}

// uniform float borderWidth;
// uniform float size;
// uniform vec3 position;
