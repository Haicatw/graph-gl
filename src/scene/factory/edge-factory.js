import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import runtimeSettings from '../../runtimeSettings/runtime-settings'
// import createEdgeMaterial from '../../materials/edge-material'
export default class Edge {
  constructor (edge) {
    console.log(edge)
    const points = []
    if (!edge.curve) {
      points.push(new THREE.Vector3(edge.positions.source.x, edge.positions.source.y, edge.positions.source.z))
      points.push(new THREE.Vector3(edge.positions.target.x, edge.positions.target.y, edge.positions.target.z))
    } else {
      const rawPoints = []
      for (const point of edge.positions) {
        rawPoints.push(new THREE.Vector3(point.x, point.y, point.z))
      }
      const curve = new THREE.CatmullRomCurve3(rawPoints, false)
      for (const point of curve.getPoints(50)) {
        points.push(point)
      }
      // points = THREE.CatmullRomCurve3(rawPoints, false)
    }
    this.geometry = new MeshLine()
    this.geometry.setPoints(points)
    const resolution = new THREE.Vector2(runtimeSettings.settings.width, runtimeSettings.settings.height)
    this.material = new MeshLineMaterial({ color: edge.color, opacity: edge.opacity, sizeAttenuation: false, lineWidth: edge.width, resolution })
    this.lineInstance = new THREE.Mesh(this.geometry, this.material)
  }

  get instance () { return this.lineInstance }
}
