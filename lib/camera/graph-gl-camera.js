'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLCamera = function () {
  function GLCamera(_ref) {
    var fov = _ref.fov,
        near = _ref.near,
        far = _ref.far,
        width = _ref.width,
        height = _ref.height,
        cameraPosition = _ref.cameraPosition;

    _classCallCheck(this, GLCamera);

    this.threeCamera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.threeCamera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  }

  _createClass(GLCamera, [{
    key: 'updateCameraDim',
    value: function updateCameraDim(width, height) {
      this.threeCamera.aspect = width / height;
      this.threeCamera.updateProjectionMatrix();
    }
  }, {
    key: 'camera',
    get: function get() {
      return this.threeCamera;
    }
  }]);

  return GLCamera;
}();

exports.default = GLCamera;