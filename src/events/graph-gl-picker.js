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
    // this.pickingTexture = new THREE.WebGLRenderTarget(
    //   1, 1
    // )
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
    // color.r = 1.0
    // color.g = 1.0
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
    // console.log(canvas)
    const rect = canvas.getBoundingClientRect()
    // const rect = this.renderer.domElement.getBoundingClientRect()
    // console.log(event.clientX)
    // console.log(event.clientY)
    // console.log(rect.left)
    // console.log(rect.top)
    // console.log(rect.width)
    // console.log(rect.height)
    // console.log(canvas.width)
    // console.log(canvas.height)
    return {
      // x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      // y: ((event.clientY - rect.top) * canvas.height) / rect.height
      x: (event.clientX - rect.left),
      y: (event.clientY - rect.top)
    }
  }

  pick (layerName, camera, position) {
    console.log(position)
    if (!this.pickingLayers[layerName]) {
      throw new Error(`${layerName} does not exist`)
    }
    // console.log(this.renderer.getContext().drawingBufferWidth)
    // console.log(this.renderer.getContext().drawingBufferHeight)
    // const pixelRatio = this.renderer.getPixelRatio()
    // console.log(pixelRatio)
    // console.log(camera)
    // camera.setViewOffset(
    //   this.renderer.getContext().drawingBufferWidth, // full width
    //   this.renderer.getContext().drawingBufferHeight, // full top
    //   // 0, // rect x
    //   // 0, // rect y
    //   (position.x * pixelRatio) | 0,
    //   (position.y * pixelRatio) | 0,
    //   10, // rect width
    //   10 // rect height
    // )
    // const posVec = new THREE.Vector3(position.x, position.y, camera.position.z).unproject(camera)
    // const originalPosVec = new THREE.Vector3(camera.position)
    // camera.position.set(posVec.x, posVec.y, originalPosVec.z)
    // console.log(camera.position)
    // const pixelBuffer = new Uint8Array(4 * this.renderer.getContext().drawingBufferWidth * this.renderer.getContext().drawingBufferHeight)
    // const renderTexture = new THREE.WebGLRenderTarget(this.renderer.getContext().drawingBufferWidth, this.renderer.getContext().drawingBufferHeight)
    // console.log(this.renderer)
    // this.renderer.setRenderTarget(this.pickingTexture)
    // this.renderer.clear()
    this.renderer.render(
      this.pickingLayers[layerName].layer,
      camera
    )
    const gl = this.renderer.getContext()

    // // create to render to
    // const targetTextureWidth = this.renderer.getContext().drawingBufferWidth
    // const targetTextureHeight = this.renderer.getContext().drawingBufferHeight
    // const targetTexture = gl.createTexture()
    // gl.bindTexture(gl.TEXTURE_2D, targetTexture)

    // {
    //   // define size and format of level 0
    //   const level = 0
    //   const internalFormat = gl.RGBA
    //   const border = 0
    //   const format = gl.RGBA
    //   const type = gl.UNSIGNED_BYTE
    //   const data = null
    //   gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    //     targetTextureWidth, targetTextureHeight, border,
    //     format, type, data)
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    // }
    // // Create and bind the framebuffer
    // const fb = gl.createFramebuffer()
    // gl.bindFramebuffer(gl.FRAMEBUFFER, fb)

    // // attach the texture as the first color attachment
    // const attachmentPoint = gl.COLOR_ATTACHMENT0
    // const level = 0
    // gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level)

    // // render to our targetTexture by binding the framebuffer
    // gl.bindFramebuffer(gl.FRAMEBUFFER, fb)

    // // Tell WebGL how to convert from clip space to pixels
    // gl.viewport(0, 0, targetTextureWidth, targetTextureHeight)

    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    this.renderer.getContext().readPixels(position.x, this.renderer.getContext().drawingBufferHeight - position.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.pixelBuffer)
    // gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    // this.renderer.setRenderTarget(null)
    // this.renderer.readRenderTargetPixels(this.pickingTexture, position.x, position.y, 1, 1, this.pixelBuffer)

    // alert()
    // camera.clearViewOffset()
    // camera.position.set(originalPosVec.x, originalPosVec.y, originalPosVec.z)

    // this.renderer.setRenderTarget(null)
    const id = (this.pixelBuffer[0] << 16) | (this.pixelBuffer[1] << 8) | this.pixelBuffer[2]
    console.log(this.pixelBuffer)
    console.log(id)

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
