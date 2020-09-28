import defaultSettings from 'default-settings'

export default class GraphGL {
  constructor (settings) {
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
  }
}
