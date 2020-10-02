'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _graphGlUtilities = require('../utilities/graph-gl-utilities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(_ref) {
    var fov = _ref.fov,
        near = _ref.near,
        far = _ref.far,
        selector = _ref.selector,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Renderer);

    this.selector = selector;
    // const dim = getDimensions(selector)
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far + 1);
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.threeRenderer.setClearColor('#e5e5e5');
    this.threeRenderer.setSize(width, height);
    this.scene = new THREE.Scene();
    console.log(document.querySelector(selector));
    document.querySelector(selector).appendChild(this.threeRenderer.domElement);
    // this.addObjectToScene()
    this.initAnimaLoop();
  }

  _createClass(Renderer, [{
    key: 'initAnimaLoop',
    value: function initAnimaLoop() {
      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);
      this.camera.position.z = 5;
      var renderer = this.threeRenderer;
      var scene = this.scene;
      var camera = this.camera;

      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    }
  }, {
    key: 'addObjectToScene',
    value: function addObjectToScene() {
      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);
      this.camera.position.z = 5;
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions() {
      var dim = (0, _graphGlUtilities.getDimensions)(this.selector);
      this.camera.aspect = dim.width / dim.height;
      this.threeRenderer.setSize(dim.width, dim.height);
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: 'updateRendering',
    value: function updateRendering() {
      this.threeRenderer.render(this.scene, this.camera);
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;