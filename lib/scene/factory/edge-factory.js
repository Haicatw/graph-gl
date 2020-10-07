'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _three2 = require('three.meshline');

var _runtimeSettings = require('../../runtimeSettings/runtime-settings');

var _runtimeSettings2 = _interopRequireDefault(_runtimeSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import createEdgeMaterial from '../../materials/edge-material'
var Edge = function () {
  function Edge(edge) {
    _classCallCheck(this, Edge);

    console.log(edge);
    var points = [];
    points.push(new THREE.Vector3(edge.positions.source.x, edge.positions.source.y, edge.positions.source.z));
    points.push(new THREE.Vector3(edge.positions.target.x, edge.positions.target.y, edge.positions.target.z));
    // console.log(points)
    // this.geometry = new THREE.BufferGeometry().setFromPoints(points)
    // this.geometry.setAttribute('source_position', new THREE.BufferAttribute(new Float32Array([edge.positions.source.x, edge.positions.source.y, edge.positions.source.z]), 3))
    // this.geometry.setAttribute('target_position', new THREE.BufferAttribute(new Float32Array([edge.positions.target.x, edge.positions.target.y, edge.positions.target.z]), 3))
    // this.geometry.setAttribute('edge_color', new THREE.BufferAttribute(new Float32Array(new THREE.Color(edge.color).toArray()), 3))
    // this.geometry.setAttribute('edge_opacity', new THREE.BufferAttribute(new Float32Array([edge.opacity]), 1))
    // this.geometry.setAttribute('edge_width', new THREE.BufferAttribute(new Float32Array([edge.width]), 1))
    // this.material = createEdgeMaterial(edge)
    // this.testMat = new THREE.LineBasicMaterial({
    //   color: 0xffffff,
    //   linewidth: 20
    // })
    // this.lineInstance = new THREE.Line(this.geometry, this.material)
    this.geometry = new _three2.MeshLine();
    this.geometry.setPoints(points);
    var resolution = new THREE.Vector2(_runtimeSettings2.default.settings.width, _runtimeSettings2.default.settings.height);
    this.material = new _three2.MeshLineMaterial({ color: edge.color, opacity: edge.opacity, linewidth: edge.width, resolution: resolution });
    this.lineInstance = new THREE.Mesh(this.geometry, this.material);
  }

  _createClass(Edge, [{
    key: 'instance',
    get: function get() {
      return this.lineInstance;
    }
  }]);

  return Edge;
}();

exports.default = Edge;