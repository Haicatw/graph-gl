import * as THREE from 'three'
import createNodeMaterial from '../../materials/node-material'
// import createPickerMaterial from '../../materials/picker-material'

export default class Node {
  constructor (node) {
    // console.log(node)
    const { x, y, size, color, opacity, borderWidth, borderColor } = node
    this.preserved = { ...node }
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, 0]), 3))
    // this.geometry.attributes.position.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('node_size', new THREE.BufferAttribute(new Float32Array([size / 2]), 1))
    // this.geometry.attributes.node_size.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('node_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(color).toArray()), 3))
    // this.geometry.attributes.node_color.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('node_opacity', new THREE.BufferAttribute(new Float32Array([opacity]), 1))
    // this.geometry.attributes.node_opacity.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('border_width', new THREE.BufferAttribute(new Float32Array([borderWidth]), 1))
    // this.geometry.attributes.border_width.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('border_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(borderColor).toArray()), 3))
    // this.geometry.attributes.border_color.setUage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('pointSize', new THREE.BufferAttribute(new Float32Array([size / 2 + borderWidth]), 1))
    this.geometry.setAttribute('idcolor', new THREE.BufferAttribute(new Float32Array(new THREE.Color('#f05454').toArray()), 3))
    this.material = createNodeMaterial(node)
    this.material.transparent = true
    // this.material = createPickerMaterial()
    this.material.depthTest = false
    this.pointInstance = new THREE.Points(this.geometry, this.material)
    this.pointInstance.renderOrder = 1
  }

  get instance () { return this.pointInstance }

  update (nodeObject) {
    // console.log(nodeObject)
    for (const property in nodeObject) {
      if (this.preserved[property] !== nodeObject[property]) {
        if (property === 'color') {
          const newColor = new THREE.Color(nodeObject.color)
          this.material.uniforms.node_color.value = newColor
          this.geometry.attributes.node_color.array[0] = newColor.toArray()[0]
          this.geometry.attributes.node_color.array[1] = newColor.toArray()[1]
          this.geometry.attributes.node_color.array[2] = newColor.toArray()[2]
          this.geometry.attributes.node_color.needsUpdate = true
        } else if (property === 'borderColor') {
          const newColor = new THREE.Color(nodeObject.borderColor)
          this.material.uniforms.border_color.value = newColor
          this.geometry.attributes.border_color.array[0] = newColor.toArray()[0]
          this.geometry.attributes.border_color.array[1] = newColor.toArray()[1]
          this.geometry.attributes.border_color.array[2] = newColor.toArray()[2]
          this.geometry.attributes.border_color.needsUpdate = true
        } else if (property === 'x' || property === 'y') {
          this.material.uniforms.position.value = new THREE.Vector3(nodeObject.x, nodeObject.y, 0)
          this.geometry.attributes.position.array[0] = nodeObject.x
          this.geometry.attributes.position.array[1] = nodeObject.y
          this.geometry.attributes.position.needsUpdate = true
        } else if (property === 'size') {
          this.material.uniforms.node_size.value = nodeObject.size / 2
          this.geometry.attributes.node_size.array[0] = nodeObject.size / 2
          this.geometry.attributes.node_size.needsUpdate = true
        } else if (property === 'borderWidth') {
          this.material.uniforms.border_width.value = nodeObject.borderWidth
          this.geometry.attributes.border_width.array[0] = nodeObject.borderWidth
          this.geometry.attributes.border_width.needsUpdate = true
        } else if (property === 'opacity') {
          this.material.uniforms.node_opacity.value = nodeObject.opacity
          this.geometry.attributes.node_opacity.array[0] = nodeObject.opacity
          this.geometry.attributes.node_opacity.needsUpdate = true
        }
        this.preserved[property] = nodeObject[property]
      }
    }
  }
}
