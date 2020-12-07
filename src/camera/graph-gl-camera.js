import * as THREE from 'three'

export default class GLCamera {
  constructor ({ fov, near, far, width, height, cameraPosition }) {
    this.cameraFactor = 2
    this.cameraPosition = cameraPosition
    // this.threeCamera = new THREE.OrthographicCamera(fov, width / height, near, far)
    this.threeCamera = new THREE.OrthographicCamera(width / -this.cameraFactor, width / this.cameraFactor, height / this.cameraFactor, height / -this.cameraFactor, near, far)
    this.threeCamera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    this.threeCamera.lookAt(0, 0, 0)
    this.updateCameraDim()
  }

  get camera () {
    return this.threeCamera
  }

  updateCameraDim (width, height) {
    // this.threeCamera.aspect = width / height
    this.threeCamera.left = width / -this.cameraFactor
    this.threeCamera.right = width / this.cameraFactor
    this.threeCamera.top = height / this.cameraFactor
    this.threeCamera.bottom = height / -this.cameraFactor
    this.threeCamera.updateProjectionMatrix()
  }

  clear () {
    this.threeCamera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z)
    this.threeCamera.lookAt(0, 0, 0)
    this.updateCameraDim()
  }
}
