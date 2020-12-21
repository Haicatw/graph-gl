import * as THREE from 'three'

export default class GLRenderer {
  constructor ({ selector, width, height, clearColor }) {
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.threeRenderer.setClearColor(clearColor)
    this.threeRenderer.setSize(width, height)
    this.threeRenderer.setPixelRatio(window.devicePixelRatio)
    // this.threeRenderer.sortObjects = false
    // this.scene = new THREE.Scene()
    // console.log(document.querySelector(selector))
    document.querySelector(selector).appendChild(this.threeRenderer.domElement)
    // if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
    //   __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.scene }))
    //   __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.threeRenderer }))
    // }
    // this.initAnimaLoop()
  }

  get renderer () {
    return this.threeRenderer
  }

  get rendererDOM () {
    return this.threeRenderer.domElement
  }

  // initAnimaLoop () {
  //   const geometry = new THREE.BoxGeometry(1, 1, 1)
  //   const material = new THREE.MeshNormalMaterial()

  //   const cube = new THREE.Mesh(geometry, material)
  //   this.scene.add(cube)
  //   // this.camera.position.z = 5
  //   const renderer = this.renderer
  //   const scene = this.scene
  //   const camera = this.camera

  //   function animate () {
  //     requestAnimationFrame(animate)
  //     cube.rotation.x += 0.01
  //     cube.rotation.y += 0.01
  //     renderer.render(scene, camera)
  //   }
  //   animate()
  // }

  addObjectToScene () {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    this.camera.position.z = 5
  }

  updateRenderDim (width, height) {
    // this.camera.aspect = dim.width / dim.height
    this.threeRenderer.setSize(width, height)
    // this.camera.updateProjectionMatrix()
  }

  render (scene, camera) {
    this.threeRenderer.render(scene, camera)
  }
}
