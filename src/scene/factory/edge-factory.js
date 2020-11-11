import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import runtimeSettings from '../../runtimeSettings/runtime-settings'
// import createEdgeMaterial from '../../materials/edge-material'
export default class Edge {
  constructor (edge) {
    // console.log(edge)
    this.preserved = { ...edge }
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
    this.geometry.setGeometry(points)
    const resolution = new THREE.Vector2(runtimeSettings.settings.width, runtimeSettings.settings.height)
    this.material = new MeshLineMaterial({ useMap: false, color: new THREE.Color(0xed6a5a), opacity: 1, resolution: resolution, sizeAttenuation: false, lineWidth: 10 })
    this.material.depthTest = false
    this.lineInstance = new THREE.Mesh(this.geometry, this.material)
    this.lineInstance.renderOrder = 0
  }

  get instance () { return this.lineInstance }

  update (edgeObject) {
    let isPositionUpdated = false
    if (this.preserved.curve) {
      if (this.preserved.positions.length() !== edgeObject.positions.length()) {
        isPositionUpdated = true
      }
      this.preserved.positions.forEach(function (value, index) {
        if (!(value.x === edgeObject.positions[index].x && value.y === edgeObject.positions[index].y && value.z === edgeObject.positions[index].z)) {
          isPositionUpdated = true
        }
      })
    } else {
      isPositionUpdated = true
      if (this.preserved.positions.source.x === edgeObject.positions.source.x && this.preserved.positions.source.y === edgeObject.positions.source.y && this.preserved.positions.source.z === edgeObject.positions.source.z) {
        if (this.preserved.positions.target.x === edgeObject.positions.target.x && this.preserved.positions.target.y === edgeObject.positions.target.y && this.preserved.positions.target.z === edgeObject.positions.target.z) {
          isPositionUpdated = false
        }
      }
    }
    if (this.preserved.curve !== edgeObject.curve || isPositionUpdated) {
      const points = []
      if (edgeObject.curve) {
        const rawPoints = []
        for (const point of edgeObject.positions) {
          rawPoints.push(new THREE.Vector3(point.x, point.y, point.z))
        }
        const curve = new THREE.CatmullRomCurve3(rawPoints, false)
        for (const point of curve.getPoints(50)) {
          points.push(point)
        }
      } else {
        points.push(new THREE.Vector3(edgeObject.positions.source.x, edgeObject.positions.source.y, edgeObject.positions.source.z))
        points.push(new THREE.Vector3(edgeObject.positions.target.x, edgeObject.positions.target.y, edgeObject.positions.target.z))
      }
      this.geometry.setPoints(points)
    }
    // color: edge.color, opacity: edge.opacity, sizeAttenuation: false, lineWidth: edge.width
    if (this.preserved.color !== edgeObject.color) {
      this.material.color = edgeObject.color
    }
    if (this.preserved.opacity !== edgeObject.opacity) {
      this.material.opacity = edgeObject.opacity
    }
    if (this.preserved.lineWidth !== edgeObject.lineWidth) {
      this.material.lineWidth = edgeObject.lineWidth
    }
    this.preserved = { ...edgeObject }
  }
}
