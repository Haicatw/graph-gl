import * as THREE from 'three'
import createNodeMaterial from '../../materials/node-material'
export default class Node {
  constructor (node) {
    console.log(node)
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([node.x, node.y, 0]), 3))
    this.geometry.setAttribute('node_size', new THREE.BufferAttribute(new Float32Array([node.size / 2]), 1))
    this.geometry.setAttribute('node_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(node.color).toArray()), 3))
    this.geometry.setAttribute('node_opacity', new THREE.BufferAttribute(new Float32Array([node.opacity]), 1))
    this.geometry.setAttribute('border_width', new THREE.BufferAttribute(new Float32Array([node.borderWidth]), 1))
    this.geometry.setAttribute('border_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(node.borderColor).toArray()), 3))
    this.material = createNodeMaterial(node)
    this.pointInstance = new THREE.Points(this.geometry, this.material)
  }

  get instance () { return this.pointInstance }
}
