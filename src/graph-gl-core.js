import { defaultSettings } from './default-settings'
import { getDimensions } from './utilities/graph-gl-utilities'
import runtimeSettings from './runtimeSettings/runtime-settings'
import GLRenderer from './renderer/graph-gl-renderer'
import GLScene from './scene/graph-gl-scene'
import GLCamera from './camera/graph-gl-camera'
import GLControl from './control/graph-gl-control'
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
      //   console.log(`${property}: ${settings[property]}`)
      this.settings[property] = settings[property]
    }
    console.log(this.settings)
    runtimeSettings.resetSettings(this.settings)
    // Initialize renderer
    this.renderer = new GLRenderer(this.settings)
    // Initialize Scene
    this.scene = new GLScene()
    // Initialize camera
    this.camera = new GLCamera(this.settings)
    this.control = new GLControl(this.camera.camera, this.renderer.rendererDOM)
    this.control.update()
    this.control.control.target.set(0, 0, 0)
    this.control.control.addEventListener('change', this.render.bind(this))
    // if (this.settings.debug) {
    //   this.addDebugCameraControl()
    // }
    this.refresh()
  }

  readGraph (graphObject) {
    this.scene.readGraph(graphObject)
  }

  refresh () {
    // Update container dimensions
    const dim = getDimensions(this.settings.selector)
    runtimeSettings.setOneSetting({ key: 'width', value: dim.width })
    runtimeSettings.setOneSetting({ key: 'height', value: dim.height })
    this.renderer.updateRenderDim(dim.width, dim.height)
    this.camera.updateCameraDim(dim.width, dim.height)
    this.renderer.render(this.scene.scene, this.camera.camera)
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
    this.renderer.render(this.scene.scene, this.camera.camera)
  }
}
