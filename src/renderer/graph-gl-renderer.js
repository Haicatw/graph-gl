import * as THREE from 'three'
import $ from 'cash-dom'

import { getDimensions } from '../utilities/graph-gl-utilities'

export default class renderer {
  constructor ({ fov, near, far, selector }) {
    this.selector = selector
    const dim = getDimensions(selector)
    this.camera = new THREE.PerspectiveCamera(fov, dim.width / dim.height, near, far)
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true })
    this.threeRenderer.setClearColor('#e5e5e5')
    this.scene = new THREE.Scene()
    $(selector).add(this.threeRenderer.domElement)
  }

  updateDimensions () {
    const dim = getDimensions(this.selector)
    this.camera.aspect = dim.width / dim.height
    this.camera.updateProjectionMatrix()
  }

  updateRendering () {
    this.threeRenderer.render(this.scene, this.camera)
  }
}
