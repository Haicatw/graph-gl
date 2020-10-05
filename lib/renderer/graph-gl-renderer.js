'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLRenderer = function () {
  function GLRenderer(_ref) {
    var selector = _ref.selector,
        width = _ref.width,
        height = _ref.height,
        clearColor = _ref.clearColor;

    _classCallCheck(this, GLRenderer);

    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.threeRenderer.setClearColor(clearColor);
    this.threeRenderer.setSize(width, height);
    // this.scene = new THREE.Scene()
    // console.log(document.querySelector(selector))
    document.querySelector(selector).appendChild(this.threeRenderer.domElement);
    // if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
    //   __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.scene }))
    //   __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.threeRenderer }))
    // }
    // this.initAnimaLoop()
  }

  _createClass(GLRenderer, [{
    key: 'addObjectToScene',


    // initAnimaLoop () {
    //   const geometry = new THREE.BoxGeometry(1, 1, 1)
    //   const material = new THREE.MeshNormalMaterial()

    //   const cube = new THREE.Mesh(geometry, material)
    //   this.scene.add(cube)
    //   // this.camera.position.z = 5
    //   const renderer = this.renderer
    //   const scene = this.scene
    //   const camera = this.camera

    //   function animate () {
    //     requestAnimationFrame(animate)
    //     cube.rotation.x += 0.01
    //     cube.rotation.y += 0.01
    //     renderer.render(scene, camera)
    //   }
    //   animate()
    // }

    value: function addObjectToScene() {
      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);
      this.camera.position.z = 5;
    }
  }, {
    key: 'updateRenderDim',
    value: function updateRenderDim(width, height) {
      // this.camera.aspect = dim.width / dim.height
      this.threeRenderer.setSize(width, height);
      // this.camera.updateProjectionMatrix()
    }
  }, {
    key: 'render',
    value: function render(scene, camera) {
      this.threeRenderer.render(scene, camera);
    }
  }, {
    key: 'renderer',
    get: function get() {
      return this.threeRenderer;
    }
  }, {
    key: 'rendererDOM',
    get: function get() {
      return this.threeRenderer.domElement;
    }
  }]);

  return GLRenderer;
}();

exports.default = GLRenderer;