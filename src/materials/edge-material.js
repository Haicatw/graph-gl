import * as THREE from 'three'
import getEdgeVertexShader from './shaders/edge-vertex-shader'
import getEdgeFragmentShader from './shaders/edge-fragment-shader'
import runtimeSettings from '../runtimeSettings/runtime-settings'

export default function createEdgeMaterial ({ positions, color, opacity, width }) {
  const vertexShader = getEdgeVertexShader()
  const fragmentShader = getEdgeFragmentShader()
  return new THREE.ShaderMaterial({
    uniforms: {
      edge_color: { value: new THREE.Color(color) },
      edge_opacity: { value: opacity },
      source_position: { value: new THREE.Vector3(positions.source.x, positions.source.y, positions.source.z) },
      target_position: { value: new THREE.Vector3(positions.target.x, positions.target.y, positions.target.z) },
      edge_width: { value: width },
      resolution: { value: new THREE.Vector2(runtimeSettings.settings.width, runtimeSettings.settings.height) }
    },
    vertexShader,
    fragmentShader
  })
}
