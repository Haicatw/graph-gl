import { defaultSettings } from './default-settings'
import { getDimensions } from './utilities/graph-gl-utilities'
import runtimeSettings from './runtimeSettings/runtime-settings'
import GLRenderer from './renderer/graph-gl-renderer'
import GLScene from './scene/graph-gl-scene'
import GLCamera from './camera/graph-gl-camera'
import GLControl from './control/graph-gl-control'
import GLEventHandeler from './events/graph-gl-events'
// import * as THREE from 'three'

export default class GraphGL {
  constructor (settings) {
    // Initialize settings
    if (!settings) {
      throw new Error('GraphGL constructor requires a settings object.')
    }
    if (!settings.selector) {
      throw new Error('selector field must be specified.')
    }
    this.settings = defaultSettings()
    for (const property in settings) {
      this.settings[property] = settings[property]
    }
    // console.log(this.settings)
    runtimeSettings.resetSettings(this.settings)
    // Initialize renderer
    this.renderer = new GLRenderer(this.settings)
    // Initialize camera
    this.camera = new GLCamera(this.settings)
    this.eventHandler = new GLEventHandeler(this.renderer.renderer, this.camera.camera)
    this.control = new GLControl(this.camera.camera, this.renderer.rendererDOM)
    // Initialize Scene
    this.scene = new GLScene(this.eventHandler, this.camera, this.renderer.rendererDOM)
    this.control.update()
    this.control.control.target.set(0, 0, 0)
    this.control.control.addEventListener('change', this.render.bind(this))
    // if (this.settings.debug) {
    //   this.addDebugCameraControl()
    // }
    this.refresh()
  }

  nodes () {
    // console.log('nodes core', this.scene.graphNodes())
    return this.scene.graphNodes()
  }

  edges () {
    return this.scene.graphEdges()
  }

  readGraph (graphObject) {
    this.scene.readGraph(graphObject)
    this.fitToGraph()
    this.control.update()
    this.refresh()
  }

  bindListener (eventName, callback) {
    this.eventHandler.bindListener(eventName, callback, 'Nodes')
  }

  unbindListener (eventName) {
    this.eventHandler.unbindListener(eventName)
  }

  clear () {
    this.scene.clear()
    this.control.control.target.set(0, 0, 0)
    this.control.update()
  }

  refresh () {
    // Update container dimensions
    const dim = getDimensions(this.settings.selector)
    runtimeSettings.setOneSetting({ key: 'width', value: dim.width })
    runtimeSettings.setOneSetting({ key: 'height', value: dim.height })
    this.renderer.updateRenderDim(dim.width, dim.height)
    this.camera.updateCameraDim(dim.width, dim.height)
    this.scene.updateGraph()
    this.renderer.render(this.scene.scene, this.camera.camera)
  }

  fitToGraph () {
    const centerX = (this.scene.boundingBox.xMax + this.scene.boundingBox.xMin) / 2
    const centerY = (this.scene.boundingBox.yMax + this.scene.boundingBox.yMin) / 2
    const bondX = Math.abs(this.scene.boundingBox.xMax - this.scene.boundingBox.xMin) + runtimeSettings.settings.viewportPadding * 2
    const bondY = Math.abs(this.scene.boundingBox.yMax - this.scene.boundingBox.yMin) + runtimeSettings.settings.viewportPadding * 2
    // console.log(this.camera.camera.zoom)
    const bond = bondX > bondY ? bondX : bondY
    if (runtimeSettings.settings.width / runtimeSettings.settings.height > 1.0) {
      // console.log(runtimeSettings.settings.height / (bond))
      this.camera.camera.zoom = runtimeSettings.settings.height / (bond)
    } else {
      // console.log(runtimeSettings.settings.width / (bond))
      this.camera.camera.zoom = runtimeSettings.settings.width / (bond)
    }
    // console.log(this.camera.camera.zoom)
    this.camera.camera.position.set(centerX, centerY, this.camera.camera.position.z)
    this.camera.camera.updateProjectionMatrix()
  }

  // addDebugCameraControl () {
  //   this.controls = new CameraControls(this.camera.camera, this.renderer.domElement)
  //   this.controls.addEventListener('change', () => {
  //     this.controls.update()
  //     this.renderer.render(this.scene.scene, this.camera.camera)
  //   })
  // }
  render () {
    // this.control.update()
    this.scene.sceneUpdate()
    this.renderer.render(this.scene.scene, this.camera.camera)
  }
}
