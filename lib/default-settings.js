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
      z: 50
    },
    clearColor: '#e5e5e5',
    debug: true
  };
}

function defaultNodeAttrs() {
  return {
    x: 0,
    y: 0,
    label: '',
    size: 1,
    color: undefined,
    opacity: undefined,
    boarderColor: undefined,
    boarderWidth: undefined
  };
}

function defaultEdgeAttrs() {
  return {
    label: '',
    width: 1,
    type: 'line',
    color: undefined,
    opacity: undefined
  };
}