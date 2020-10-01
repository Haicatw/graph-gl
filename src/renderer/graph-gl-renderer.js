import * as THREE from 'three'

import { getDimensions } from '../utilities/graph-gl-utilities'

export default class Renderer {
  constructor ({ fov, near, far, selector, width, height }) {
    this.selector = selector
    // const dim = getDimensions(selector)
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true })
    this.threeRenderer.setClearColor('#e5e5e5')
    this.threeRenderer.setSize(width, height)
    this.scene = new THREE.Scene()
    console.log(document.querySelector(selector))
    document.querySelector(selector).appendChild(this.threeRenderer.domElement)
  }

  updateDimensions () {
    const dim = getDimensions(this.selector)
    this.camera.aspect = dim.width / dim.height
    this.threeRenderer.setSize(dim.width, dim.height)
    this.camera.updateProjectionMatrix()
  }

  updateRendering () {
    this.threeRenderer.render(this.scene, this.camera)
  }
}
