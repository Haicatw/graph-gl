import * as THREE from 'three'
import getPickerVertexShader from './shaders/picker-vertex-shader'
import getPickerFragmentShader from './shaders/picker-fragment-shader'

export default function createPickerMaterial (color) {
  const vertexShader = getPickerVertexShader()
  const fragmentShader = getPickerFragmentShader()
  // console.log(color, new THREE.Color(color))
  // console.log(borderColor, new THREE.Color(borderColor))
  return new THREE.ShaderMaterial({
    uniforms: {
      uIdColor: { value: color }
    },
    vertexShader,
    fragmentShader,
    transparent: false,
    side: THREE.DoubleSide
    // blending: THREE.NormalBlending
  })
}
