import _ from 'lodash'
import * as THREE from 'three'
import GraphModel from './models/graph-model'
import PolygonModels from './models/polygon-model'
import Node from './factory/node-factory'
import Edge from './factory/edge-factory'

// TODO: Transparency bug
export default class GLScene {
  constructor () {
    this.threeScene = new THREE.Scene()
    this.graph = new GraphModel()
    this.polygons = new PolygonModels()
    this.sceneObjects = {
      nodes: {},
      edges: {}
    }
  }

  get scene () {
    return this.threeScene
  }

  readGraph (graphObject) {
    this.graph.read(graphObject)
    this.addGraphToScene()
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
      this.sceneObjects.nodes[node.id] = node.internalObject.instance
      this.threeScene.add(node.internalObject.instance)
    }.bind(this))
    _.each(this.graph.edges, function (edge) {
      edge.internalObject = new Edge(edge)
      this.sceneObjects.edges[edge.id] = edge.internalObject.instance
      this.threeScene.add(edge.internalObject.instance)
      console.log(edge)
    }.bind(this))
  }
}
