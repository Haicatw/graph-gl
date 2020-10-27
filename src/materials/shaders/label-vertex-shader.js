export default function getLabelVertexShader () {
  return `
  uniform vec2 uvOffset;
  uniform sampler2D texture;
  uniform vec3 label_position
  varying vec2 vUv;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( label_position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
`
}
