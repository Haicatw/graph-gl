import _ from 'lodash'
import * as THREE from 'three'
import GraphModel from './models/graph-model'
import PolygonModels from './models/polygon-model'
import Node from './factory/node-factory'
import Edge from './factory/edge-factory'
import Label from './factory/label-factory'

export default class GLScene {
  constructor () {
    this.threeScene = new THREE.Scene()
    this.graph = new GraphModel()
    this.polygons = new PolygonModels()
    this.sceneObjects = {
      nodes: {},
      edges: {}
    }
    this.hasData = false
  }

  get scene () {
    return this.threeScene
  }

  get boundingBox () {
    return this.graph.boundingBox
  }

  graphNodes () {
    return this.graph.nodes
  }

  graphEdges () {
    return this.graph.edges
  }

  clear () {
    if (!this.hasData) {
      throw new Error('No data to clear')
    }
    clearScene(this.threeScene)
    this.sceneObjects = {
      nodes: {},
      edges: {}
    }
    this.graph.clear()
    this.polygons.clear()
    this.hasData = false
  }

  readGraph (graphObject) {
    if (this.hasData) {
      throw new Error('Please clear current graph before read new graph.')
    }
    this.graph.read(graphObject)
    this.addGraphToScene()
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
      this.threeScene.add(node.internalObject.instance)
      this.threeScene.add(node.internalObject.labelInstance.instance)
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
      edge.internalObject.update(edge)
      // TODO: edge label
      // console.log(edge)
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
    // in case of map, bumpMap, normalMap, envMap ...
    Object.keys(scene.material).forEach(prop => {
      if (!scene.material[prop]) { return }
      if (scene.material[prop] !== null && typeof scene.material[prop].dispose === 'function') { scene.material[prop].dispose() }
    })
    scene.material.dispose()
  }
}
