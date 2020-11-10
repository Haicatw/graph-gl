export function defaultSettings () {
  return {
    fov: 40,
    near: 50,
    far: 7000,
    height: 900,
    width: 1600,
    cameraPosition: {
      x: 0,
      y: 0,
      z: 100
    },
    clearColor: '#e5e5e5',
    viewportPadding: 10
  }
}

export function defaultNodeAttrs () {
  return {
    x: 0,
    y: 0,
    label: '',
    labelColor: 'black',
    size: 20,
    color: '#3182bd',
    opacity: 1,
    borderColor: '#525252',
    borderWidth: 1
  }
}

export function defaultEdgeAttrs () {
  return {
    label: '',
    width: 3,
    type: 'line',
    color: '#000000',
    opacity: 1,
    curve: false
  }
}

export function defaultLegendAttrs () {
  return {
    label: { label: '' },
    instance: { type: '', x: 0, y: 0, size: 30, positions: { source: {}, target: {} }, width: 10, color: '#000000', opacity: 1, borderWidth: 0, borderColor: '#000000' }
  }
}
