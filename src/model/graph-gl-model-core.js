import THREE from 'three'
import GraphModel from 'graph-model'
import PolygonModels from 'polygon-model'

export default class GLModel {
  constructor () {
    this.scene = new THREE.Scene()
    this.graph = new GraphModel()
    this.polygons = new PolygonModels()
  }

  get scene () {
    return this.scene
  }
}
