export default function getLabelFragmentShader () {
  return `
    uniform vec2 uvOffset;
    uniform sampler2D texture;

    varying vec2 vUv;
    void main()
    {
      gl_FragColor = texture2D(texture, vUv + uvOffset); 
    }
  `
}
