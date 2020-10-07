export default function getEdgeVertexShader () {
  return `
    // precision mediump float;
    uniform vec3 source_position;
    uniform vec3 target_position;
    uniform vec3 edge_color;
    uniform vec2 resolution;
    uniform float edge_width;
    void main() {
      // vec4 source_position_ = vec4(source_position, 1.0);
      vec4 clip_src = projectionMatrix * modelViewMatrix * vec4(source_position, 1.0);
      vec4 clip_tar = projectionMatrix * modelViewMatrix * vec4(target_position, 1.0);
      vec2 screen_source = resolution * (0.5 * clip_src.xy/clip_src.w + 0.5);
      vec2 screen_target = resolution * (0.5 * clip_tar.xy/clip_tar.w + 0.5);
      vec2 xBasis = normalize(screen_target - screen_source);
      vec2 yBasis = vec2(-xBasis.y, xBasis.x);
      vec2 source = screen_source + edge_width * (position.x * xBasis + position.y * yBasis);
      vec2 target = screen_target + edge_width * (position.x * xBasis + position.y * yBasis);
      vec2 pt = mix(source, target, position.z);
      vec4 clip = mix(clip_src, clip_tar, position.z);
      gl_Position = vec4(clip.w * ((2.0 * pt) / resolution - 1.0), clip.z, clip.w);
    }
    `
}
