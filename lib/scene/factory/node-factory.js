'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _nodeMaterial = require('../../materials/node-material');

var _nodeMaterial2 = _interopRequireDefault(_nodeMaterial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(node) {
    _classCallCheck(this, Node);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(node.position, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(node.color, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(node.size, 1));
    this.geometry.setAttribute('opacity', new THREE.BufferAttribute(node.opacity, 1));
    this.material = (0, _nodeMaterial2.default)(node);
    this.instance = new THREE.Points(this.geometry, this.material);
  }

  _createClass(Node, [{
    key: 'instance',
    get: function get() {
      return this.instance;
    }
  }]);

  return Node;
}();

exports.default = Node;