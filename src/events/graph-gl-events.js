import $ from 'cash-dom'
import GPUPickHelper from './graph-gl-picker'

export default class GLEventHandeler {
  constructor (renderer, camera) {
    this.picker = new GPUPickHelper(renderer)
    this.camera = camera
    this.eventNameMap = {}
  }

  addObjectMapper (objectMapper) {
    this.mapper = objectMapper
  }

  addLayer (layerName) {
    this.picker.createLayer(layerName)
  }

  addObjectToLayer (layerName, pickableObject) {
    this.picker.addObjectToLayer(layerName, pickableObject)
  }

  buildEvent (callback, layerName) {
    const picker = this.picker
    const camera = this.camera
    const mapper = this.mapper
    console.log('Build event')
    const eventHandler = function (event) {
      console.log('Event called')
      const id = picker.pick(layerName, camera, picker.getCursorPosition(event))
      if (id === 0) {
        return
      }
      event.pickedObject = mapper[id]
      console.log(id)
      callback(event)
    }

    return eventHandler
  }

  bindListener (eventName, callback, layerName) {
    const eventHandler = this.buildEvent(callback, layerName)
    $(this.picker.renderer.domElement).on(eventName, eventHandler)
  }

  unbindListener (eventName) {
    $(this.picker.renderer.domElement).off(eventName)
  }
}
