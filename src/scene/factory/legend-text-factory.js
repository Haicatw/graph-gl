import * as THREE from 'three'
// import createLabelMaterial from '../../materials/label-material'
import { getTextTexture } from '../../utilities/graph-gl-utilities'
export default class Label {
  constructor ({ label, labelColor, x, y }) {
    // console.log(label)
    this.preserved = { label, labelColor, x, y }
    this.texture = getTextTexture(label, 'black' || labelColor)
    this.texture.generateMipmaps = false
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping
    this.texture.minFilter = THREE.LinearFilter
    this.texture.needsUpdate = true
    this.ratio = this.texture.image.width / this.texture.image.height
    this.geometry = new THREE.PlaneBufferGeometry(1, 1)
    // this.material = createLabelMaterial({ x: x, y: y, texture: this.texture })
    this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true })
    this.labelInstance = new THREE.Mesh(this.geometry, this.material)
    this.labelInstance.scale.set(this.ratio, 1, 1)
    const offset = this.labelInstance.scale.x
    this.labelInstance.position.set(x + offset / 2, y, 0)
  }

  get instance () { return this.labelInstance }

  update (labelObject) {
    for (const property in this.preserved) {
      if (this.preserved[property] !== labelObject[property]) {
        if (property === 'label' || property === 'labelColor') {
          this.texture.dispose()
          this.texture = getTextTexture(labelObject.label, 'black' || labelObject.labelColor)
          this.texture.generateMipmaps = false
          this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping
          this.texture.minFilter = THREE.LinearFilter
          this.texture.needsUpdate = true
          this.ratio = this.texture.image.width / this.texture.image.height
          this.material.map = this.texture
          this.labelInstance.scale.set(this.ratio, 1, 1)
        } else if (property === 'x' || property === 'y') {
          this.labelInstance.position.set(labelObject.x, labelObject.y + (labelObject.offset / 40), 0)
        }
        this.preserved[property] = labelObject[property]
      }
    }
  }

  resize (factor) {
    this.labelInstance.scale.set(this.labelInstance.x * factor, this.labelInstance.y * factor, 1)
  }
}
