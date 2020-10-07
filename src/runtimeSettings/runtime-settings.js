/* eslint-disable no-unused-vars */
class Settings {
  constructor (settings) {
    this.runtimeSettings = settings
  }

  get settings () { return this.runtimeSettings }

  setOneSetting ({ key, value }) {
    this.runtimeSettings[key] = value
  }

  resetSettings (settings) {
    this.runtimeSettings = settings
  }
}

let runtimeSettings = {}
export default runtimeSettings = new Settings({})
/* eslint-enable no-unused-vars */
