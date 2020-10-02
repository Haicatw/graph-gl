import * as THREE from 'three'

import { getDimensions } from '../utilities/graph-gl-utilities'

export default class Renderer {
  constructor ({ fov, near, far, selector, width, height }) {
    this.selector = selector
    // const dim = getDimensions(selector)
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
    this.camera.position.set(0, 0, 50)
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true })
    this.threeRenderer.setClearColor('#e5e5e5')
    this.threeRenderer.setSize(width, height)
    this.scene = new THREE.Scene()
    console.log(document.querySelector(selector))
    document.querySelector(selector).appendChild(this.threeRenderer.domElement)
    // this.addObjectToScene()
    // window.THREE = THREE
    // window.scene = this.scene
    // if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
    //   __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.scene }))
    //   __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.threeRenderer }))
    // }
    this.initAnimaLoop()
  }

  initAnimaLoop () {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()

    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    // this.camera.position.z = 5
    const renderer = this.threeRenderer
    const scene = this.scene
    const camera = this.camera

    function animate () {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()
  }

  addObjectToScene () {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    this.camera.position.z = 5
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
