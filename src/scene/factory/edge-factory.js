import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import runtimeSettings from '../../runtimeSettings/runtime-settings'
// import createEdgeMaterial from '../../materials/edge-material'
export default class Edge {
  constructor (edge) {
    console.log(edge)
    const points = []
    points.push(new THREE.Vector3(edge.positions.source.x, edge.positions.source.y, edge.positions.source.z))
    points.push(new THREE.Vector3(edge.positions.target.x, edge.positions.target.y, edge.positions.target.z))
    // console.log(points)
    // this.geometry = new THREE.BufferGeometry().setFromPoints(points)
    // this.geometry.setAttribute('source_position', new THREE.BufferAttribute(new Float32Array([edge.positions.source.x, edge.positions.source.y, edge.positions.source.z]), 3))
    // this.geometry.setAttribute('target_position', new THREE.BufferAttribute(new Float32Array([edge.positions.target.x, edge.positions.target.y, edge.positions.target.z]), 3))
    // this.geometry.setAttribute('edge_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(edge.color).toArray()), 3))
    // this.geometry.setAttribute('edge_opacity', new THREE.BufferAttribute(new Float32Array([edge.opacity]), 1))
    // this.geometry.setAttribute('edge_width', new THREE.BufferAttribute(new Float32Array([edge.width]), 1))
    // this.material = createEdgeMaterial(edge)
    // this.testMat = new THREE.LineBasicMaterial({
    //   color: 0xffffff,
    //   linewidth: 20
    // })
    // this.lineInstance = new THREE.Line(this.geometry, this.material)
    this.geometry = new MeshLine()
    this.geometry.setPoints(points)
    const resolution = new THREE.Vector2(runtimeSettings.settings.width, runtimeSettings.settings.height)
    this.material = new MeshLineMaterial({ color: edge.color, opacity: edge.opacity, sizeAttenuation: false, lineWidth: edge.width, resolution })
    this.lineInstance = new THREE.Mesh(this.geometry, this.material)
  }

  get instance () { return this.lineInstance }
}
