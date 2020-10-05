import _ from 'lodash'
import { defaultNodeAttrs, defaultEdgeAttrs } from '../../default-settings'

export default class GraphModel {
  constructor () {
    this.model = {}
  }

  get graph () {
    return this.model
  }

  get nodes () {
    return this.model.nodes
  }

  get edges () {
    return this.model.edges
  }

  clear () {
    this.model = {}
  }

  read (graphObject) {
    // Validate graph object
    if (typeof graphObject !== 'undefined') {
      throw new Error('Invalid graph object.')
    }
    if (typeof graphObject.nodes !== 'undefined') {
      throw new Error('Graph object must have valid nodes.')
    }
    // if (typeof graphObject.edges !== 'undefined') {
    //   throw new Error('Graph object must have valid edges.')
    // }
    this.model = _.cloneDeep(graphObject)
    // Nodes
    const nodeIdSet = []
    _.each(this.model.nodes, function (node) {
      if (node.id === undefined) {
        throw new Error('Node must have a id field.')
      }
      nodeIdSet.push(node.id)
      if (nodeIdSet.length() !== _.uniq(nodeIdSet).length()) {
        throw new Error('Node must have a unique id.')
      }
      const defaultNode = defaultNodeAttrs()
      _.each(defaultNode, function (key, value) {
        if (typeof node[key] === 'undefined') {
          node[key] = value
        }
      })
    })
    // Edges
    const edgeIdSet = []
    _.each(this.model.edges, function (edge) {
      if (edge.id === undefined) {
        throw new Error('Edge must have a id field.')
      }
      if (edge.source === undefined) {
        throw new Error('Edge must have a source field.')
      }
      if (edge.destination === undefined) {
        throw new Error('Edge must have a destination field.')
      }
      edgeIdSet.push(edge.id)
      if (edgeIdSet.length() !== _.uniq(edgeIdSet).length()) {
        throw new Error('Edge must have a unique id.')
      }
      const defaultEdge = defaultEdgeAttrs()
      _.each(defaultEdge, function (key, value) {
        if (typeof edge[key] === 'undefined') {
          edge[key] = value
        }
      })
    })
  }
}
