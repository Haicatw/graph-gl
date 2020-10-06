import * as THREE from 'three'
import getNodeVertexShader from './shaders/node-vertex-shader'
import getNodeFragmentShader from './shaders/node-fragment-shader'

export default function createNodeMaterial ({ x, y, color, opacity, size, borderColor, borderWidth }) {
  const vertexShader = getNodeVertexShader()
  const fragmentShader = getNodeFragmentShader()
  return new THREE.ShaderMaterial({
    uniforms: {
      node_color: { value: new THREE.Color(color) },
      border_color: { value: new THREE.Color(borderColor) },
      node_opacity: { value: opacity },
      node_position: { value: new THREE.Vector3(x, y, 0) },
      node_size: { value: size / 2 },
      border_width: { value: borderWidth }
    },
    vertexShader,
    fragmentShader
  })
}
