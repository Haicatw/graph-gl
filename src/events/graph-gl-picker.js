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
    this.pickingTexture = new THREE.WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false
    })
    this.pixelBuffer = new Uint8Array(4) // Float32Array(4)
    this.pixelBufferFloat = new Float32Array(4)
    this.pickedObject = null
    this.pickedObjectSavedColor = 0
    this.pickingLayers = {}

    this.pickingTexture.texture.minFilter = THREE.LinearFilter
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

    const color = new THREE.Color()
    color.setHex(sceneObject.internalObject.instance.id)

    console.log(color)
    sceneObject.internalObject.geometry.setAttribute('idcolor', new THREE.BufferAttribute(new Float32Array(color.toArray()), 3))
    console.log(sceneObject.internalObject.geometry)
    const pickingObject = new THREE.Points(sceneObject.internalObject.geometry, createPickerMaterial(color))

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
    const rect = canvas.getBoundingClientRect()
    return {
      x: (event.clientX - rect.left),
      y: (event.clientY - rect.top)
    }
  }

  pick (layerName, camera, position) {
    console.log(position)
    if (!this.pickingLayers[layerName]) {
      throw new Error(`${layerName} does not exist`)
    }

    this.renderer.render(
      this.pickingLayers[layerName].layer,
      camera
    )
    const gl = this.renderer.getContext()

    this.renderer.getContext().readPixels(position.x, this.renderer.getContext().drawingBufferHeight - position.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.pixelBuffer)

    const id = (this.pixelBuffer[0] << 16) | (this.pixelBuffer[1] << 8) | this.pixelBuffer[2]
    console.log(this.pixelBuffer)
    console.log(id)

    return id
  }

  clear () {
    this.pickingLayers.forEach(element => {
      this.clearLayer(element)
    })
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
