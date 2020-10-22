// import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class GLControl {
  constructor (camera, domElementTag) {
    this.threeControl = new OrbitControls(camera, domElementTag)
    this.threeControl.enableRotate = false
  }

  get control () { return this.threeControl }

  enableNavigation () {
    this.threeControl.enableZoom = true
    // this.threeControl.enableRotate = true
    this.threeControl.enablePan = true
  }

  disableNavigation () {
    this.threeControl.enableZoom = false
    // this.threeControl.enableRotate = false
    this.threeControl.enablePan = false
  }

  update () {
    this.threeControl.update()
  }
}
