'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _nodeMaterial = require('../../materials/node-material');

var _nodeMaterial2 = _interopRequireDefault(_nodeMaterial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import createPickerMaterial from '../../materials/picker-material'

var Node = function () {
  function Node(node) {
    _classCallCheck(this, Node);

    // console.log(node)
    var x = node.x,
        y = node.y,
        size = node.size,
        color = node.color,
        opacity = node.opacity,
        borderWidth = node.borderWidth,
        borderColor = node.borderColor;

    this.preserved = _extends({}, node);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, 0]), 3));
    // this.geometry.attributes.position.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('node_size', new THREE.BufferAttribute(new Float32Array([size / 2]), 1));
    // this.geometry.attributes.node_size.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('node_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(color).toArray()), 3));
    // this.geometry.attributes.node_color.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('node_opacity', new THREE.BufferAttribute(new Float32Array([opacity]), 1));
    // this.geometry.attributes.node_opacity.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('border_width', new THREE.BufferAttribute(new Float32Array([borderWidth]), 1));
    // this.geometry.attributes.border_width.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('border_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(borderColor).toArray()), 3));
    // this.geometry.attributes.border_color.setUage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('pointSize', new THREE.BufferAttribute(new Float32Array([size / 2 + borderWidth]), 1));
    this.geometry.setAttribute('idcolor', new THREE.BufferAttribute(new Float32Array(new THREE.Color('#f05454').toArray()), 3));
    this.material = (0, _nodeMaterial2.default)(node);
    this.material.transparent = true;
    // this.material = createPickerMaterial()
    this.material.depthTest = false;
    this.pointInstance = new THREE.Points(this.geometry, this.material);
    this.pointInstance.renderOrder = 1;
  }

  _createClass(Node, [{
    key: 'update',
    value: function update(nodeObject) {
      // console.log(nodeObject)
      for (var property in nodeObject) {
        if (this.preserved[property] !== nodeObject[property]) {
          if (property === 'color') {
            var newColor = new THREE.Color(nodeObject.color);
            this.material.uniforms.node_color.value = newColor;
            this.geometry.attributes.node_color.array[0] = newColor.toArray()[0];
            this.geometry.attributes.node_color.array[1] = newColor.toArray()[1];
            this.geometry.attributes.node_color.array[2] = newColor.toArray()[2];
            this.geometry.attributes.node_color.needsUpdate = true;
          } else if (property === 'borderColor') {
            var _newColor = new THREE.Color(nodeObject.borderColor);
            this.material.uniforms.border_color.value = _newColor;
            this.geometry.attributes.border_color.array[0] = _newColor.toArray()[0];
            this.geometry.attributes.border_color.array[1] = _newColor.toArray()[1];
            this.geometry.attributes.border_color.array[2] = _newColor.toArray()[2];
            this.geometry.attributes.border_color.needsUpdate = true;
          } else if (property === 'x' || property === 'y') {
            this.material.uniforms.position.value = new THREE.Vector3(nodeObject.x, nodeObject.y, 0);
            this.geometry.attributes.position.array[0] = nodeObject.x;
            this.geometry.attributes.position.array[1] = nodeObject.y;
            this.geometry.attributes.position.needsUpdate = true;
          } else if (property === 'size') {
            this.material.uniforms.node_size.value = nodeObject.size / 2;
            this.geometry.attributes.node_size.array[0] = nodeObject.size / 2;
            this.geometry.attributes.node_size.needsUpdate = true;
          } else if (property === 'borderWidth') {
            this.material.uniforms.border_width.value = nodeObject.borderWidth;
            this.geometry.attributes.border_width.array[0] = nodeObject.borderWidth;
            this.geometry.attributes.border_width.needsUpdate = true;
          } else if (property === 'opacity') {
            this.material.uniforms.node_opacity.value = nodeObject.opacity;
            this.geometry.attributes.node_opacity.array[0] = nodeObject.opacity;
            this.geometry.attributes.node_opacity.needsUpdate = true;
          }
          this.preserved[property] = nodeObject[property];
        }
      }
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.pointInstance;
    }
  }]);

  return Node;
}();

exports.default = Node;