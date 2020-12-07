'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import $ from 'cash-dom'
// import runtimeSettings from '../runtimeSettings/runtime-settings'


var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _pickerMaterial = require('../materials/picker-material');

var _pickerMaterial2 = _interopRequireDefault(_pickerMaterial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Reference: https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// Reference: https://riptutorial.com/three-js/example/17089/object-picking---gpu
var GPUPickHelper = function () {
  function GPUPickHelper(renderer) {
    _classCallCheck(this, GPUPickHelper);

    // create a 1x1 pixel render target
    this.renderer = renderer;
    this.pickingTexture = new THREE.WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false
    });
    this.pixelBuffer = new Uint8Array(4); // Float32Array(4)
    this.pixelBufferFloat = new Float32Array(4);
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
    this.pickingLayers = {};

    this.pickingTexture.texture.minFilter = THREE.LinearFilter;
  }

  _createClass(GPUPickHelper, [{
    key: 'createLayer',
    value: function createLayer(layerName) {
      if (this.pickingLayers[layerName]) {
        throw new Error(layerName + ' layer already exists');
      }
      this.pickingLayers[layerName] = {
        selectionObjects: {},
        layer: new THREE.Scene()
      };
      this.pickingLayers[layerName].layer.background = new THREE.Color(0);
    }
  }, {
    key: 'checkLayerNameAvailability',
    value: function checkLayerNameAvailability(layerName) {
      if (!this.pickingLayers[layerName]) {
        return true;
      }
    }
  }, {
    key: 'addObjectToLayer',
    value: function addObjectToLayer(layerName, sceneObject) {
      if (!this.pickingLayers[layerName]) {
        throw new Error(layerName + ' layer does not exist');
      }
      if (!sceneObject) {
        throw new Error('Object invalid');
      }

      var color = new THREE.Color();
      color.setHex(sceneObject.internalObject.instance.id);

      console.log(color);
      sceneObject.internalObject.geometry.setAttribute('idcolor', new THREE.BufferAttribute(new Float32Array(color.toArray()), 3));
      console.log(sceneObject.internalObject.geometry);
      var pickingObject = new THREE.Points(sceneObject.internalObject.geometry, (0, _pickerMaterial2.default)(color));

      this.pickingLayers[layerName].layer.add(pickingObject);
      this.pickingLayers[layerName].selectionObjects[sceneObject.internalObject.instance.id] = sceneObject;
    }
  }, {
    key: 'clearLayer',
    value: function clearLayer(layerName) {
      clearScene(this.pickingLayers[layerName].layer);
      this.pickingLayers[layerName].selectionObjects = {};
    }
  }, {
    key: 'deleteLayer',
    value: function deleteLayer(layerName) {
      this.clearLayer(layerName);
      this.pickingLayers[layerName].layer.dispose();
      delete this.pickingLayers[layerName];
    }
  }, {
    key: 'getCursorPosition',
    value: function getCursorPosition(event) {
      var canvas = this.renderer.domElement;
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }, {
    key: 'pick',
    value: function pick(layerName, camera, position) {
      console.log(position);
      if (!this.pickingLayers[layerName]) {
        throw new Error(layerName + ' does not exist');
      }

      this.renderer.render(this.pickingLayers[layerName].layer, camera);
      var gl = this.renderer.getContext();

      this.renderer.getContext().readPixels(position.x, this.renderer.getContext().drawingBufferHeight - position.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.pixelBuffer);

      var id = this.pixelBuffer[0] << 16 | this.pixelBuffer[1] << 8 | this.pixelBuffer[2];
      console.log(this.pixelBuffer);
      console.log(id);

      return id;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this = this;

      this.pickingLayers.forEach(function (element) {
        _this.clearLayer(element);
      });
    }
  }]);

  return GPUPickHelper;
}();

// Reference: https://stackoverflow.com/questions/30359830/how-do-i-clear-three-js-scene/48722282


exports.default = GPUPickHelper;
function clearScene(scene) {
  while (scene.children.length > 0) {
    clearScene(scene.children[0]);
    scene.remove(scene.children[0]);
  }
  if (scene.geometry) scene.geometry.dispose();
  if (scene.material) {
    Object.keys(scene.material).forEach(function (prop) {
      if (!scene.material[prop]) {
        return;
      }
      if (scene.material[prop] !== null && typeof scene.material[prop].dispose === 'function') {
        scene.material[prop].dispose();
      }
    });
    scene.material.dispose();
  }
}