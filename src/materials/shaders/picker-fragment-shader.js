export default function getPickerVertexShader () {
  return `
  uniform vec3 uIdColor;
  varying vec3 vidcolor;
  varying float pointSize_;
  void main() {
    gl_FragColor = vec4(uIdColor, 1.0);
    // float distance = length(2.0 * gl_PointCoord - 1.0);
    // float inner_edge = pointSize_;
    // float outer_edge = pointSize_ + 2.0;
    // float smooth_edge = smoothstep(inner_edge, outer_edge, distance * pointSize_);
    // gl_FragColor = ( vec4(vidcolor, 1.0) * smooth_edge) + ((1.0 - smooth_edge) * gl_FragColor);
    // if (distance > 1.0) {
    //   discard;
    // }
  }`
}
