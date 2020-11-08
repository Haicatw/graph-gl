import _ from 'lodash'
import { defaultNodeAttrs, defaultEdgeAttrs } from '../../default-settings'

export default class GraphModel {
  constructor () {
    this.model = {}
    this.boundingBox = { xMin: 0, yMin: 0, xMax: 0, yMax: 0 }
  }

  get graph () {
    return this.model
  }

  // TODO: return nodeMap and edgeMap for performance optimization
  get nodes () {
    return this.model.nodes
  }

  get edges () {
    return this.model.edges
  }

  get nodeMapper () {
    return this.model.nodeMap
  }

  clear () {
    this.model = {}
  }

  read (graphObject) {
    // Validate graph object
    if (typeof graphObject === 'undefined') {
      throw new Error('Invalid graph object.')
    }
    if (typeof graphObject.nodes === 'undefined') {
      throw new Error('Graph object must have valid nodes.')
    }
    // if (typeof graphObject.edges === 'undefined') {
    //   throw new Error('Graph object must have valid edges.')
    // }
    this.model = _.cloneDeep(graphObject)
    this.model.nodeMap = {}
    this.model.edgeMap = {}
    // Nodes
    const nodeIdSet = []
    _.each(this.model.nodes, function (node) {
      if (node.id === undefined) {
        throw new Error('Node must have a id field.')
      }
      nodeIdSet.push(node.id)
      if (nodeIdSet.length !== _.uniq(nodeIdSet).length) {
        throw new Error('Node must have a unique id.')
      }
      const defaultNode = defaultNodeAttrs()
      _.each(defaultNode, function (value, key) {
        if (typeof node[key] === 'undefined') {
          // console.log(key, value)
          node[key] = value
        }
      })
      this.boundingBox.xMin = node.x < this.boundingBox.xMin ? node.x : this.boundingBox.xMin
      this.boundingBox.yMin = node.y < this.boundingBox.yMin ? node.y : this.boundingBox.yMin
      this.boundingBox.xMax = node.x > this.boundingBox.xMax ? node.x : this.boundingBox.xMax
      this.boundingBox.yMax = node.y > this.boundingBox.yMax ? node.y : this.boundingBox.yMax
      this.model.nodeMap[node.id] = node
    }.bind(this))
    // Edges
    const edgeIdSet = []
    _.each(this.model.edges, function (edge) {
      if (edge.id === undefined) {
        throw new Error('Edge must have a id field.')
      }
      if (edge.source === undefined) {
        throw new Error('Edge must have a source field.')
      }
      if (edge.target === undefined) {
        throw new Error('Edge must have a target field.')
      }
      edgeIdSet.push(edge.id)
      if (edgeIdSet.length !== _.uniq(edgeIdSet).length) {
        throw new Error('Edge must have a unique id.')
      }
      const defaultEdge = defaultEdgeAttrs()
      _.each(defaultEdge, function (value, key) {
        if (typeof edge[key] === 'undefined') {
          edge[key] = value
        }
      })
      // console.log('Edge', edge)
      if (!edge.curve) {
        edge.positions = {
          source: { x: this.model.nodeMap[edge.source].x, y: this.model.nodeMap[edge.source].y, z: 0 },
          target: { x: this.model.nodeMap[edge.target].x, y: this.model.nodeMap[edge.target].y, z: 0 }
        }
      } else {
        for (const point of edge.positions) {
          point.z = 0
        }
      }
      this.model.edgeMap[edge.id] = edge
    }.bind(this))
  }
}
