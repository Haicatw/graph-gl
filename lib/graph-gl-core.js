'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js'


var _defaultSettings = require('./default-settings');

var _graphGlUtilities = require('./utilities/graph-gl-utilities');

var _graphGlRenderer = require('./renderer/graph-gl-renderer');

var _graphGlRenderer2 = _interopRequireDefault(_graphGlRenderer);

var _graphGlScene = require('./scene/graph-gl-scene');

var _graphGlScene2 = _interopRequireDefault(_graphGlScene);

var _graphGlCamera = require('./camera/graph-gl-camera');

var _graphGlCamera2 = _interopRequireDefault(_graphGlCamera);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _cameraControls = require('camera-controls');

var _cameraControls2 = _interopRequireDefault(_cameraControls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_cameraControls2.default.install({ THREE: THREE });

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
      //   console.log(`${property}: ${settings[property]}`)
      this.settings[property] = settings[property];
    }
    console.log(this.settings);

    // Initialize renderer
    this.renderer = new _graphGlRenderer2.default(this.settings);
    // Initialize Scene
    this.scene = new _graphGlScene2.default();
    // Initialize camera
    this.camera = new _graphGlCamera2.default(this.settings);
    if (this.settings.debug) {
      this.addDebugCameraControl();
    }
  }

  _createClass(GraphGL, [{
    key: 'refresh',
    value: function refresh() {
      // Update container dimensions
      var dim = (0, _graphGlUtilities.getDimensions)(this.settings.selector);
      this.renderer.updateRenderDim(dim.width, dim.height);
      this.camera.updateCameraDim(dim.width, dim.height);
    }
  }, {
    key: 'addDebugCameraControl',
    value: function addDebugCameraControl() {
      var _this = this;

      this.controls = new _cameraControls2.default(this.camera.camera, this.renderer.domElement);
      this.controls.addEventListener('change', function () {
        return _this.renderer.render(_this.scene.scene, _this.camera.camera);
      });
    }
  }]);

  return GraphGL;
}();

exports.default = GraphGL;