import _ from 'lodash'
export default class PolygonModels {
  constructor () {
    this.models = {}
  }

  get polygons () {
    return this.models
  }

  read (polygonObjects) {
    if (typeof polygonObjects === 'undefined') {
      throw new Error('Invalid polygon objects')
    }
    this.models = _.cloneDeep(polygonObjects)
    // TODO: Validation
  }

  clear () {
    this.models = {}
  }
}
