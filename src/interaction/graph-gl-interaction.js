import $ from 'cash-dom'
import * as THREE from 'three'

export default class GLInteraction {
  constructor (selector, camera, scene) {
    this.selector = selector
    this.camera = camera
    this.scene = scene
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }

  pick (normalizedPosition) {
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, this.camera)
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(this.scene.children)
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      return intersectedObjects[0].object
    }
  }

  getCanvasRelativePosition (event) {
    const rect = $(this.selector).getBoundingClientRect()
    return {
      x: (event.clientX - rect.left) * $(this.selector).width / rect.width,
      y: (event.clientY - rect.top) * $(this.selector).height / rect.height
    }
  }

  getNormalizedPosition (event) {
    const pos = this.getCanvasRelativePosition(event)
    return {
      x: (pos.x / $(this.selector).width) * 2 - 1,
      y: (pos.y / $(this.selector).height) * -2 + 1
    }
  }

  bind (eventName, eventHandler) {
    $(this.selector).on(eventName, eventHandler)
  }

  unbind (eventName, eventHandler) {
    $(this.selector).off(eventName, eventHandler)
  }
}
