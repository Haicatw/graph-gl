import _ from 'lodash'
import * as THREE from 'three'
import LegendText from '../scene/factory/legend-text-factory'
import Node from '../scene/factory/node-factory'
import Edge from '../scene/factory/edge-factory'
import { defaultLegendAttrs } from '../default-settings'
// import { getTextTexture } from '../utilities/graph-gl-utilities'

export default class GLLegend {
  constructor (camera, domElement) {
    this.camera = camera
    this.domElement = domElement
    this.legendContainer = new THREE.Group()
    this.internalContainer = []
    this.imgDim = 3
    this.edgePadding = 2
    this.hasData = false
  }

  get legend () { return this.legendContainer }

  // node legend: max min size, max min border, color category, color continuous
  // edge legend: max min width, color category, color continuous

  createLayout (legendData) {
    // const tempStorage = []
    // const tempStorageNode = []
    let count = 0
    _.each(legendData, function (legend) {
      legend = this.processRawLegend(legend)
      // console.log(legend.type)
      if (legend.instance.type === 'node') {
        // const legendLabel
        console.log('node: ', legend)
        legend.label.x = this.imgDim
        legend.label.y = -(count * this.imgDim / 2 + (this.imgDim / 2))
        // tempStorage.push(new LegendText(legend.label))
        legend.instance.x = this.imgDim / 2
        legend.instance.y = -(count * this.imgDim / 2 + (this.imgDim / 2))
        // tempStorageNode.push(new Node(legend.node))
        const internalLabel = new LegendText(legend.label)
        const internalInstance = new Node(legend.instance)
        this.legendContainer.add(internalInstance.instance)
        this.legendContainer.add(internalLabel.instance)
        this.internalContainer.push({ label: internalLabel, instance: internalInstance })
      } else {
        legend.label.x = this.imgDim
        legend.label.y = -(count * this.imgDim / 2 + (this.imgDim / 2))
        // tempStorage.push(new LegendText(legend.label))
        legend.instance.positions.source.x = this.edgePadding
        legend.instance.positions.target.x = this.imgDim - this.edgePadding
        legend.instance.positions.source.y = -(count * this.imgDim / 2 + (this.imgDim / 2))
        legend.instance.positions.target.y = -(count * this.imgDim / 2 + (this.imgDim / 2))
        // tempStorageNode.push(new Node(legend.node))
        const internalLabel = new LegendText(legend.label)
        const internalInstance = new Edge(legend.instance)
        this.legendContainer.add(internalInstance.instance)
        this.legendContainer.add(internalLabel.instance)
        this.internalContainer.push({ label: internalLabel, instance: internalInstance })
      }
      count += 1
    }.bind(this))
    this.hasData = true
    const newPos = this.getWorldPositionTopLeft()
    this.legendContainer.position.set(newPos.x, newPos.y, 0)
  }

  // convertToWorldSpace (x, y, cam) {
  //   const screenPos = new THREE.Vector3(x, y, -1)
  //   const pos = new THREE.Vector3()
  //   screenPos.unproject(cam)
  //   // screenPos.z = 0
  //   // console.log(screenPos)

  //   screenPos.sub(cam.position).normalize()

  //   const distance = -cam.position.z / screenPos.z

  //   pos.copy(cam.position).add(screenPos.multiplyScalar(distance))
  //   return pos
  // }

  getWorldPositionTopLeft () {
    const x = 0// -this.domElement.width / 2 + 10
    const y = 0.5// this.domElement.height / 2 - 10
    const screenPos = new THREE.Vector3(x, y, 1)
    console.log(screenPos)
    const pos = new THREE.Vector3()
    screenPos.unproject(this.camera)
    // screenPos.z = 0
    // console.log(screenPos)

    screenPos.sub(this.camera.position).normalize()

    const distance = -this.camera.position.z / screenPos.z

    pos.copy(this.camera.position).add(screenPos.multiplyScalar(distance))
    return pos
  }

  processRawLegend (rawLegend) {
    const legend = defaultLegendAttrs()
    legend.label = { label: rawLegend.label }
    for (const property in rawLegend.instance) {
      legend.instance[property] = rawLegend.instance[property]
    }
    return legend
  }

  updateLabels (scale) {
    _.each(this.internalContainer, function (legend) {
      console.log(legend)
      legend.label.instance.scale.set(scale * legend.label.ratio, scale, 1)
    })
  }

  clear () {
    this.legendContainer = new THREE.Group()
    this.hasData = false
  }
}
