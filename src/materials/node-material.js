import * as THREE from 'three'
import getNodeVertexShader from './shaders/node-vertex-shader'
import getNodeFragmentShader from './shaders/node-fragment-shader'

export default function createNodeMaterial ({ x, y, color, opacity, size, borderColor, borderWidth }) {
  const vertexShader = getNodeVertexShader()
  const fragmentShader = getNodeFragmentShader()
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { type: 'vec3', value: new THREE.Color(color) },
      borderColor: { type: 'vec3', value: new THREE.Color(borderColor) }
      // opacity: { type: 'f', value: opacity },
      // position: { type: 'vec3', value: new THREE.Vector3(x, y, 0) },
      // size: { type: 'f', value: size }
    },
    vertexShader,
    fragmentShader
  })
}
