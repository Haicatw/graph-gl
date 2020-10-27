import * as THREE from 'three'
// import createLabelMaterial from '../../materials/label-material'
import { getTextTexture } from '../../utilities/graph-gl-utilities'
export default class Label {
  constructor ({ label, x, y, labelColor, offset }) {
    // console.log(label)
    this.text = label
    this.texture = getTextTexture(label, 'black' || labelColor)
    this.texture.generateMipmaps = false
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping
    this.texture.minFilter = THREE.LinearFilter
    this.texture.needsUpdate = true
    this.ratio = this.texture.image.width / this.texture.image.height
    this.geometry = new THREE.PlaneBufferGeometry(this.ratio * 1, 1)
    // this.material = createLabelMaterial({ x: x, y: y, texture: this.texture })
    this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true })
    this.labelInstance = new THREE.Mesh(this.geometry, this.material)
    // this.labelInstance.needsUpdate = true
    this.labelInstance.position.set(x, y + (offset / 40), 0.2)
  }

  get instance () { return this.labelInstance }

  resize (factor) {
    this.labelInstance.scale.set(factor)
  }
}
