import * as THREE from 'three'
import createNodeMaterial from '../../materials/node-material'
export default class Node {
  constructor (node) {
    console.log(node)
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([node.x, node.y, 0]), 3))
    this.geometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array([node.size]), 1))
    this.geometry.setAttribute('opacity', new THREE.BufferAttribute(new Float32Array([node.opacity]), 1))
    this.geometry.setAttribute('borderWidth', new THREE.BufferAttribute(new Float32Array([node.borderWidth]), 1))
    this.material = createNodeMaterial(node)
    this.pointInstance = new THREE.Points(this.geometry, this.material)
  }

  get instance () { return this.pointInstance }
}
