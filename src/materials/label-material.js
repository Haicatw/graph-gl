import * as THREE from 'three'
import getLabelVertexShader from './shaders/label-vertex-shader'
import getLabelFragmentShader from './shaders/label-fragment-shader'

export default function createLabelMaterial ({ x, y, texture }) {
  const vertexShader = getLabelVertexShader()
  const fragmentShader = getLabelFragmentShader()
  return new THREE.ShaderMaterial({
    uniforms: {
      texture: { type: 't', value: texture },
      uvOffset: { type: 'v', value: new THREE.Vector2(0, 0) },
      label_position: { value: new THREE.Vector3(x, y, 0.2) }
    },
    vertexShader,
    fragmentShader
  })
}
