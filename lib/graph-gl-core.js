'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaultSettings = require('./default-settings');

var _graphGlUtilities = require('./utilities/graph-gl-utilities');

var _runtimeSettings = require('./runtimeSettings/runtime-settings');

var _runtimeSettings2 = _interopRequireDefault(_runtimeSettings);

var _graphGlRenderer = require('./renderer/graph-gl-renderer');

var _graphGlRenderer2 = _interopRequireDefault(_graphGlRenderer);

var _graphGlScene = require('./scene/graph-gl-scene');

var _graphGlScene2 = _interopRequireDefault(_graphGlScene);

var _graphGlCamera = require('./camera/graph-gl-camera');

var _graphGlCamera2 = _interopRequireDefault(_graphGlCamera);

var _graphGlControl = require('./control/graph-gl-control');

var _graphGlControl2 = _interopRequireDefault(_graphGlControl);

var _graphGlEvents = require('./events/graph-gl-events');

var _graphGlEvents2 = _interopRequireDefault(_graphGlEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import * as THREE from 'three'

var GraphGL = function () {
  function GraphGL(settings) {
    _classCallCheck(this, GraphGL);

    // Initialize settings
    if (!settings) {
      throw new Error('GraphGL constructor requires a settings object.');
    }
    if (!settings.selector) {
      throw new Error('selector field must be specified.');
    }
    this.settings = (0, _defaultSettings.defaultSettings)();
    for (var property in settings) {
      this.settings[property] = settings[property];
    }
    _runtimeSettings2.default.resetSettings(this.settings);
    // Initialize renderer
    this.renderer = new _graphGlRenderer2.default(this.settings);
    // Initialize camera
    this.camera = new _graphGlCamera2.default(this.settings);
    this.eventHandler = new _graphGlEvents2.default(this.renderer.renderer, this.camera.camera);
    this.control = new _graphGlControl2.default(this.camera.camera, this.renderer.rendererDOM);
    // Initialize Scene
    this.scene = new _graphGlScene2.default(this.eventHandler, this.camera, this.renderer.rendererDOM);
    this.eventHandler.addScene(this.scene.scene);
    this.control.update();
    this.control.control.target.set(0, 0, 0);
    this.control.control.addEventListener('change', this.render.bind(this));
    this.refresh();
  }

  _createClass(GraphGL, [{
    key: 'nodes',
    value: function nodes() {
      return this.scene.graphNodes();
    }
  }, {
    key: 'edges',
    value: function edges() {
      return this.scene.graphEdges();
    }
  }, {
    key: 'readGraph',
    value: function readGraph(graphObject) {
      this.scene.readGraph(graphObject);
      this.fitToGraph();
      this.control.update();
      this.refresh();
    }
  }, {
    key: 'bindListener',
    value: function bindListener(eventName, callback) {
      this.eventHandler.bindListener(eventName, callback);
    }
  }, {
    key: 'unbindListener',
    value: function unbindListener(eventName) {
      this.eventHandler.unbindListener(eventName);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.scene.clear();
      this.control.control.target.set(0, 0, 0);
      this.control.update();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var dim = (0, _graphGlUtilities.getDimensions)(this.settings.selector);
      _runtimeSettings2.default.setOneSetting({ key: 'width', value: dim.width });
      _runtimeSettings2.default.setOneSetting({ key: 'height', value: dim.height });
      this.renderer.updateRenderDim(dim.width, dim.height);
      this.camera.updateCameraDim(dim.width, dim.height);
      this.scene.updateGraph();
      this.renderer.render(this.scene.scene, this.camera.camera);
    }
  }, {
    key: 'fitToGraph',
    value: function fitToGraph() {
      var centerX = (this.scene.boundingBox.xMax + this.scene.boundingBox.xMin) / 2;
      var centerY = (this.scene.boundingBox.yMax + this.scene.boundingBox.yMin) / 2;
      var bondX = Math.abs(this.scene.boundingBox.xMax - this.scene.boundingBox.xMin) + _runtimeSettings2.default.settings.viewportPadding * 2;
      var bondY = Math.abs(this.scene.boundingBox.yMax - this.scene.boundingBox.yMin) + _runtimeSettings2.default.settings.viewportPadding * 2;
      var bond = bondX > bondY ? bondX : bondY;
      if (_runtimeSettings2.default.settings.width / _runtimeSettings2.default.settings.height > 1.0) {
        this.camera.camera.zoom = _runtimeSettings2.default.settings.height / bond;
      } else {
        this.camera.camera.zoom = _runtimeSettings2.default.settings.width / bond;
      }
      this.camera.camera.position.set(centerX, centerY, this.camera.camera.position.z);
      this.camera.camera.updateProjectionMatrix();
    }
  }, {
    key: 'render',
    value: function render() {
      this.scene.sceneUpdate();
      this.renderer.render(this.scene.scene, this.camera.camera);
    }
  }, {
    key: 'takeSnapshot',
    value: function takeSnapshot() {
      var rendererCanvas = this.renderer.rendererDOM;
      return rendererCanvas.toDataURL();
    }
  }, {
    key: 'kill',
    value: function kill() {
      this.scene.clear();
      this.camera.clear();
      this.eventHandler.clear();
    }
  }]);

  return GraphGL;
}();

exports.default = GraphGL;