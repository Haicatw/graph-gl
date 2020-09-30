'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

var _graphGlUtilities = require('../utilities/graph-gl-utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderer = function () {
  function renderer(_ref) {
    var fov = _ref.fov,
        near = _ref.near,
        far = _ref.far,
        selector = _ref.selector;

    _classCallCheck(this, renderer);

    this.selector = selector;
    var dim = (0, _graphGlUtilities.getDimensions)(selector);
    this.camera = new THREE.PerspectiveCamera(fov, dim.width / dim.height, near, far);
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.threeRenderer.setClearColor('#e5e5e5');
    this.scene = new THREE.Scene();
    (0, _cashDom2.default)(selector).add(this.threeRenderer.domElement);
  }

  _createClass(renderer, [{
    key: 'updateDimensions',
    value: function updateDimensions() {
      var dim = (0, _graphGlUtilities.getDimensions)(this.selector);
      this.camera.aspect = dim.width / dim.height;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: 'updateRendering',
    value: function updateRendering() {
      this.threeRenderer.render(this.scene, this.camera);
    }
  }]);

  return renderer;
}();

exports.default = renderer;