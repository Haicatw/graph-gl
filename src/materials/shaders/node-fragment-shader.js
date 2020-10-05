export default function getNodeFragmentShader () {
  return `
    uniform vec3 color;
    uniform float opacity;
    uniform float size;
    
    void main() {
      vec4 bkg_color = vec4(1.0, 1.0, 1.0, 0.0);
      vec4 border_color = vec4(0,
                               0,
                               0,
                               color.a);
      vec4 center_color = vec4(color.x*1.15,
                               color.y*1.15,
                               color.z*1.15,
                               color.a);
  
      vec2 c = 2.0 * gl_PointCoord - 1.0;
      float r = dot(c, c);
      float delta = fwidth(r);
  
      float dist_light = length(c - vec2(-0.5,-0.5));
      vec4 sphere = mix(center_color, color, dist_light);
  
  
      float borderSize = 0.6 + 0.35*sqrt((size - 5.0)/(100.0-5.0));
      float alpha = 1.0 - smoothstep(borderSize - delta,
                                     borderSize, r);
      vec4 border = mix(border_color, sphere, alpha);
  
      alpha = 1.0 - smoothstep(1.0 - delta,
                                     1.0, r);
  
      frag_color = mix(bkg_color, border, alpha);
    }
  `
}
