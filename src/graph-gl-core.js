import defaultSettings from './default-settings'
import Renderer from './renderer/graph-gl-renderer'

export default class GraphGL {
  constructor (settings) {
    // Initialize settings
    if (!settings) {
      throw new Error('GraphGL constructor requires a settings object.')
    }
    if (!settings.selector) {
      throw new Error('selector field must be specified.')
    }
    this.settings = defaultSettings()
    for (const property in settings) {
      //   console.log(`${property}: ${settings[property]}`)
      this.settings[property] = settings[property]
    }
    console.log(this.settings)

    // initialize renderer
    this.renderer = new Renderer(this.settings)
  }
}
