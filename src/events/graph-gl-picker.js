import * as THREE from 'three'
// import $ from 'cash-dom'
// import runtimeSettings from '../runtimeSettings/runtime-settings'
import createPickerMaterial from '../materials/picker-material'

// Reference: https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// Reference: https://riptutorial.com/three-js/example/17089/object-picking---gpu
export default class GPUPickHelper {
  constructor (renderer) {
    // create a 1x1 pixel render target
    this.renderer = renderer
    this.pickingTexture = new THREE.WebGLRenderTarget(1, 1)
    this.pixelBuffer = new Uint8Array(4)
    this.pickedObject = null
    this.pickedObjectSavedColor = 0
    this.pickingLayers = {}
  }

  createLayer (layerName) {
    if (this.pickingLayers[layerName]) {
      throw new Error(`${layerName} layer already exists`)
    }
    this.pickingLayers[layerName] = {
      selectionObjects: {},
      layer: new THREE.Scene()
    }
    this.pickingLayers[layerName].layer.background = new THREE.Color(0)
    this.pickingTexture = new THREE.WebGLRenderTarget(
      this.renderer.domElement.clientWidth,
      this.renderer.domElement.clientHeight
    )
    this.pickingTexture.texture.minFilter = THREE.LinearFilter
  }

  checkLayerNameAvailability (layerName) {
    if (!this.pickingLayers[layerName]) {
      return true
    }
  }

  addObjectToLayer (layerName, sceneObject) {
    if (!this.pickingLayers[layerName]) {
      throw new Error(`${layerName} layer does not exist`)
    }
    if (!sceneObject) {
      throw new Error('Object invalid')
    }
    // const positions = sceneObject.internalObject.geometry.attributes.position.array
    // const idColor = new Float32Array(3)

    const color = new THREE.Color()
    color.setHex(sceneObject.internalObject.instance.id)
    // console.log(sceneObject.internalObject.instance.id)

    // for (let j = 0; j < 3; j += 3) {
    //   idColor[j] = color.r
    //   idColor[j + 1] = color.g
    //   idColor[j + 2] = color.b
    // }
    // console.log(color)
    sceneObject.internalObject.geometry.setAttribute('idcolor', new THREE.BufferAttribute(new Float32Array(color.toArray()), 3))
    console.log(sceneObject.internalObject.geometry)
    const pickingObject = new THREE.Points(sceneObject.internalObject.geometry, createPickerMaterial())

    this.pickingLayers[layerName].layer.add(pickingObject)
    this.pickingLayers[layerName].selectionObjects[sceneObject.internalObject.instance.id] = sceneObject
  }

  clearLayer (layerName) {
    clearScene(this.pickingLayers[layerName].layer)
    this.pickingLayers[layerName].selectionObjects = {}
  }

  deleteLayer (layerName) {
    this.clearLayer(layerName)
    this.pickingLayers[layerName].layer.dispose()
    delete this.pickingLayers[layerName]
  }

  getCursorPosition (event) {
    const canvas = this.renderer.domElement
    // console.log(canvas)
    const rect = canvas.getBoundingClientRect()
    // const rect = this.renderer.domElement.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height
    }
  }

  pick (layerName, camera, position) {
    // console.log('pick')
    if (!this.pickingLayers[layerName]) {
      throw new Error(`${layerName} does not exist`)
    }

    const pixelRatio = this.renderer.getPixelRatio()
    camera.setViewOffset(
      this.renderer.getContext().drawingBufferWidth, // full width
      this.renderer.getContext().drawingBufferHeight, // full top
      position.x * pixelRatio | 0, // rect x
      position.y * pixelRatio | 0, // rect y
      1, // rect width
      1 // rect height
    )

    this.renderer.setRenderTarget(this.pickingTexture)
    this.renderer.render(
      this.pickingLayers[layerName].layer,
      camera
    )
    this.renderer.setRenderTarget(null)
    camera.clearViewOffset()
    // const pixelBuffer = new Uint8Array(4)
    this.renderer.readRenderTargetPixels(this.pickingTexture, 0, 0, 1, 1, this.pixelBuffer)
    // this.renderer.setRenderTarget(null)
    const id = (this.pixelBuffer[0] << 16) | (this.pixelBuffer[1] << 8) | this.pixelBuffer[2]
    console.log(id)
    console.log(this.pickingTexture.texture)

    return id
  }
}

// Reference: https://stackoverflow.com/questions/30359830/how-do-i-clear-three-js-scene/48722282
function clearScene (scene) {
  while (scene.children.length > 0) {
    clearScene(scene.children[0])
    scene.remove(scene.children[0])
  }
  if (scene.geometry) scene.geometry.dispose()
  if (scene.material) {
    Object.keys(scene.material).forEach((prop) => {
      if (!scene.material[prop]) {
        return
      }
      if (
        scene.material[prop] !== null &&
        typeof scene.material[prop].dispose === 'function'
      ) {
        scene.material[prop].dispose()
      }
    })
    scene.material.dispose()
  }
}
