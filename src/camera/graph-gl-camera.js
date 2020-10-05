import * as THREE from 'three'

export default class GLCamera {
  constructor ({ fov, near, far, width, height, cameraPosition }) {
    this.threeCamera = new THREE.PerspectiveCamera(fov, width / height, near, far)
    this.threeCamera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  }

  get camera () {
    return this.threeCamera
  }

  updateCameraDim (width, height) {
    this.threeCamera.aspect = width / height
    this.threeCamera.updateProjectionMatrix()
  }
}
