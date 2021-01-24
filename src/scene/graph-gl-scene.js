import _ from 'lodash'
import * as THREE from 'three'
import GraphModel from './models/graph-model'
import PolygonModels from './models/polygon-model'
import Node from './factory/node-factory'
import Edge from './factory/edge-factory'
import Label from './factory/label-factory'
import GLLegend from '../legend/graph-gl-legend'

export default class GLScene {
  constructor (eventhandlerProxy, cameraProxy, renderDom) {
    this.eventhandlerProxy = eventhandlerProxy
    this.cameraProxy = cameraProxy
    this.renderDom = renderDom
    this.threeScene = new THREE.Scene()
    this.graph = new GraphModel()
    this.polygons = new PolygonModels()
    // this.legend = new GLLegend(this.cameraProxy.camera, this.renderDom)
    this.legend = new GLLegend()
    this.legend.createLinearScaleLegend('circle')
    this.sceneObjects = {
      nodes: {},
      edges: {}
    }
    this.hasData = false
    this.eventhandlerProxy.addLayer('Nodes')
    // const scope = this
    // this.eventhandlerProxy.bindListener('click', function (e) {
    //   scope.setUpDebugObject()
    // }, 'Nodes')
  }

  get scene () {
    return this.threeScene
  }

  get boundingBox () {
    return this.graph.boundingBox
  }

  setUpDebugObject () {
    console.log('setUpDebugObject')
    const geom = new THREE.BoxGeometry(100, 100, 100)
    const mat = new THREE.MeshBasicMaterial({ map: this.eventhandlerProxy.picker.pickingTexture.texture })
    const ma = new THREE.Mesh(geom, mat)
    ma.position.set(0, 0, 0)
    this.threeScene.add(ma)
  }

  graph () {
    return this.graph
  }

  graphNodes () {
    return this.graph.nodes
  }

  graphEdges () {
    return this.graph.edges
  }

  clear () {
    // if (!this.hasData) {
    //   throw new Error('No data to clear')
    // }
    clearScene(this.threeScene)
    this.sceneObjects = {
      nodes: {},
      edges: {}
    }
    this.graph.clear()
    this.polygons.clear()
    this.eventhandlerProxy.clearLayer('Nodes')
    this.hasData = false
    // this.legend.clear()
  }

  readGraph (graphObject) {
    if (this.hasData) {
      throw new Error('Please clear current graph before read new graph.')
    }
    this.graph.read(graphObject)
    // this.legend.createLayout(graphObject.legend)
    this.addGraphToScene()
    this.eventhandlerProxy.addObjectMapper(this.graph.nodeMapper)
    this.hasData = true
  }

  readPolygons (polygonObjects) {
    this.polygons.read(polygonObjects)
  }

  addGraphToScene () {
    if (typeof this.graph.graph === 'undefined') {
      throw new Error('Graph object uninitialized.')
    }
    if (typeof this.graph.nodes === 'undefined') {
      throw new Error('Invalid nodes.')
    }
    _.each(this.graph.nodes, function (node) {
      node.internalObject = new Node(node)
      node.internalObject.labelInstance = new Label({ ...node, offset: node.size + node.borderWidth })
      this.sceneObjects.nodes[node.id] = node.internalObject.instance
      // node.internalObject.instance.id.set(node.id)
      this.threeScene.add(node.internalObject.instance)
      this.threeScene.add(node.internalObject.labelInstance.instance)
      this.eventhandlerProxy.addObjectToLayer('Nodes', node)
    }.bind(this))
    _.each(this.graph.edges, function (edge) {
      if (!edge.positions) {
        throw new Error('Edge must provide points positions')
      }
      edge.internalObject = new Edge(edge)
      // TODO: edge label
      this.sceneObjects.edges[edge.id] = edge.internalObject.instance
      this.threeScene.add(edge.internalObject.instance)
      // console.log(edge)
    }.bind(this))
    // this.threeScene.add(this.legend.legend)
  }

  updateGraph () {
    _.each(this.graph.nodes, function (node) {
      // console.log(node)
      node.internalObject.update(node)
      node.internalObject.labelInstance.update({ ...node, offset: node.size + node.borderWidth })
    })
    _.each(this.graph.edges, function (edge) {
      if (!edge.positions) {
        throw new Error('Edge must provide points positions')
      }
      this.graph.updateEdgePos(edge)
      edge.internalObject.update(edge)
      // TODO: edge label
      // console.log(edge)
    })
  }

  sceneUpdate () {
    const scaleFactor = 20
    const camZoom = this.cameraProxy.camera.zoom
    const scale = scaleFactor / camZoom
    // console.log(camZoom)
    _.each(this.graph.nodes, function (node) {
      // console.log(node.internalObject.instance)
      const ratio = node.internalObject.labelInstance.ratio
      node.internalObject.labelInstance.instance.scale.set(ratio * scale, scale, 1)
    })

    // if (this.legend.hasData) {
    //   const legendPos = this.legend.getWorldPositionTopLeft()
    //   console.log(legendPos)
    // this.legend.updateLabels(scale)
    // this.legend.legendContainer.position.set(legendPos.x, legendPos.y, 0)
    // this.legend.legendContainer.scale.set(scale, scale, scale)
    //   this.legend.legend.position.set(legendPos.x, legendPos.y, 0)
    //   this.legend.legend.scale.set(scale, scale, 1)
    // }
    // console.log(this.legend.legend)
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
    // in case of map, bumpMap, normalMap, envMap ...
    Object.keys(scene.material).forEach(prop => {
      if (!scene.material[prop]) { return }
      if (scene.material[prop] !== null && typeof scene.material[prop].dispose === 'function') { scene.material[prop].dispose() }
    })
    scene.material.dispose()
  }
}
