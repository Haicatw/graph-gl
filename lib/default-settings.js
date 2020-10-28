'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSettings = defaultSettings;
exports.defaultNodeAttrs = defaultNodeAttrs;
exports.defaultEdgeAttrs = defaultEdgeAttrs;
function defaultSettings() {
  return {
    fov: 40,
    near: 10,
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
  };
}

function defaultNodeAttrs() {
  return {
    x: 0,
    y: 0,
    label: '',
    labelColor: 'black',
    size: 20,
    color: '#3e978b',
    opacity: 1,
    borderColor: '#d2e603',
    borderWidth: 0
  };
}

function defaultEdgeAttrs() {
  return {
    label: '',
    width: 3,
    type: 'line',
    color: '#000000',
    opacity: 1,
    curve: false
  };
}