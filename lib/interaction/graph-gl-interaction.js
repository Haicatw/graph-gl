'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLInteraction = function () {
  function GLInteraction(selector, camera, scene) {
    _classCallCheck(this, GLInteraction);

    this.selector = selector;
    this.camera = camera;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  _createClass(GLInteraction, [{
    key: 'pick',
    value: function pick(normalizedPosition) {
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, this.camera);
      // get the list of objects the ray intersected
      var intersectedObjects = this.raycaster.intersectObjects(this.scene.children);
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        return intersectedObjects[0].object;
      }
    }
  }, {
    key: 'getCanvasRelativePosition',
    value: function getCanvasRelativePosition(event) {
      var rect = (0, _cashDom2.default)(this.selector).getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (0, _cashDom2.default)(this.selector).width / rect.width,
        y: (event.clientY - rect.top) * (0, _cashDom2.default)(this.selector).height / rect.height
      };
    }
  }, {
    key: 'getNormalizedPosition',
    value: function getNormalizedPosition(event) {
      var pos = this.getCanvasRelativePosition(event);
      return {
        x: pos.x / (0, _cashDom2.default)(this.selector).width * 2 - 1,
        y: pos.y / (0, _cashDom2.default)(this.selector).height * -2 + 1
      };
    }
  }, {
    key: 'bind',
    value: function bind(eventName, eventHandler) {
      (0, _cashDom2.default)(this.selector).on(eventName, eventHandler);
    }
  }, {
    key: 'unbind',
    value: function unbind(eventName, eventHandler) {
      (0, _cashDom2.default)(this.selector).off(eventName, eventHandler);
    }
  }]);

  return GLInteraction;
}();

exports.default = GLInteraction;