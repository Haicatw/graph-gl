export default function getNodeFragmentShader () {
  return `
    uniform vec3 color;
    uniform vec3 borderColor;
    uniform float borderWidth;
    uniform float size;
    void main() {
      gl_FragColor = vec4(color, 1.0);
      // distance = len(x: [-1, 1], y: [-1, 1])
      float distance = length(2.0 * gl_PointCoord - 1.0);
      // pixels [0, ~15/20]
      float totalWidth = size + borderWidth;
      float edgeStart = size;
      float edgeEnd = size + 2.0;
      // [edgeStart, edgeEnd] -> [0, 1]
      float sEdge = smoothstep(edgeStart, edgeEnd, distance * totalWidth);
      // transition from borderColor to color along the edge
      gl_FragColor = ( vec4(borderColor, 1.0) * sEdge) + ((1.0 - sEdge) * gl_FragColor);

      if (distance > 1.0) {
        discard;
      }
    }
  `
}
