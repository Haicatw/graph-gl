import $ from 'cash-dom'
import GPUPickHelper from './graph-gl-picker'

export default class GLEventHandeler {
  constructor (renderer, camera) {
    this.renderer = renderer
    this.picker = new GPUPickHelper(renderer)
    this.camera = camera
    this.eventLists = {
      clickNode: ['click', 'Nodes']
    }
    this.boundEvents = []
  }

  addScene (scene) {
    this.scene = scene
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
    // console.log('Build event')
    const tempRenderer = this.renderer
    const tempCamera = this.camera
    const tempScene = this.scene
    const eventHandler = function (event) {
      // console.log('Event called')
      const id = picker.pick(layerName, camera, picker.getCursorPosition(event))
      tempRenderer.render(tempScene, tempCamera)
      console.log(id, mapper, mapper[id])
      if (id === 16777215) {
        return undefined
      }
      event.pickedObject = mapper[id]
      // console.log(id)
      callback(event)
    }

    return eventHandler
  }

  bindListener (eventName, callback) {
    if (!this.eventLists[eventName]) {
      throw new Error(`${eventName} event not supported.`)
    }
    const internalEventname = this.eventLists[eventName][0]
    const layerName = this.eventLists[eventName][1]
    const eventHandler = this.buildEvent(callback, layerName)
    this.boundEvents.push(internalEventname)
    $(this.picker.renderer.domElement).on(internalEventname, eventHandler)
  }

  unbindListener (eventName) {
    const internalEventname = this.eventLists[eventName][0]
    $(this.picker.renderer.domElement).off(internalEventname)
  }

  // update dataset, use department, cobook, sematic label, overview (check box to show network wise department/ size stats data of network)
  clearLayer (layerName) {
    this.picker.clearLayer(layerName)
  }

  clear () {
    this.boundEvents.forEach(element => {
      this.unbindListener(element)
    })
    this.picker.clear()
  }
}
