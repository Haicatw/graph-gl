export default function getPickerVertexShader () {
  return `
    attribute vec3 idcolor;
    attribute float pointSize;
    varying vec3 vidcolor;
    varying float pointSize_;
    void main() {
      vidcolor = idcolor;
      pointSize_ = pointSize;
      gl_PointSize = pointSize;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
    }`
}
