'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

    // console.log(edge)
    this.preserved = _extends({}, edge);
    var points = [];
    if (!edge.curve) {
      points.push(new THREE.Vector3(edge.positions.source.x, edge.positions.source.y, edge.positions.source.z));
      points.push(new THREE.Vector3(edge.positions.target.x, edge.positions.target.y, edge.positions.target.z));
    } else {
      var rawPoints = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = edge.positions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var point = _step.value;

          rawPoints.push(new THREE.Vector3(point.x, point.y, point.z));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var curve = new THREE.CatmullRomCurve3(rawPoints, false);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = curve.getPoints(50)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _point = _step2.value;

          points.push(_point);
        }
        // points = THREE.CatmullRomCurve3(rawPoints, false)
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    this.geometry = new _three2.MeshLine();
    this.geometry.setGeometry(points);
    var resolution = new THREE.Vector2(_runtimeSettings2.default.settings.width, _runtimeSettings2.default.settings.height);
    this.material = new _three2.MeshLineMaterial({ useMap: false, color: new THREE.Color(0xed6a5a), opacity: 1, resolution: resolution, sizeAttenuation: false, lineWidth: 10 });
    this.material.depthTest = false;
    this.lineInstance = new THREE.Mesh(this.geometry, this.material);
    this.lineInstance.renderOrder = 0;
  }

  _createClass(Edge, [{
    key: 'update',
    value: function update(edgeObject) {
      var isPositionUpdated = false;
      if (this.preserved.curve) {
        if (this.preserved.positions.length() !== edgeObject.positions.length()) {
          isPositionUpdated = true;
        }
        this.preserved.positions.forEach(function (value, index) {
          if (!(value.x === edgeObject.positions[index].x && value.y === edgeObject.positions[index].y && value.z === edgeObject.positions[index].z)) {
            isPositionUpdated = true;
          }
        });
      } else {
        isPositionUpdated = true;
        if (this.preserved.positions.source.x === edgeObject.positions.source.x && this.preserved.positions.source.y === edgeObject.positions.source.y && this.preserved.positions.source.z === edgeObject.positions.source.z) {
          if (this.preserved.positions.target.x === edgeObject.positions.target.x && this.preserved.positions.target.y === edgeObject.positions.target.y && this.preserved.positions.target.z === edgeObject.positions.target.z) {
            isPositionUpdated = false;
          }
        }
      }
      if (this.preserved.curve !== edgeObject.curve || isPositionUpdated) {
        var points = [];
        if (edgeObject.curve) {
          var rawPoints = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = edgeObject.positions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var point = _step3.value;

              rawPoints.push(new THREE.Vector3(point.x, point.y, point.z));
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          var curve = new THREE.CatmullRomCurve3(rawPoints, false);
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = curve.getPoints(50)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _point2 = _step4.value;

              points.push(_point2);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        } else {
          points.push(new THREE.Vector3(edgeObject.positions.source.x, edgeObject.positions.source.y, edgeObject.positions.source.z));
          points.push(new THREE.Vector3(edgeObject.positions.target.x, edgeObject.positions.target.y, edgeObject.positions.target.z));
        }
        this.geometry.setPoints(points);
      }
      // color: edge.color, opacity: edge.opacity, sizeAttenuation: false, lineWidth: edge.width
      if (this.preserved.color !== edgeObject.color) {
        this.material.color = edgeObject.color;
      }
      if (this.preserved.opacity !== edgeObject.opacity) {
        this.material.opacity = edgeObject.opacity;
      }
      if (this.preserved.lineWidth !== edgeObject.lineWidth) {
        this.material.lineWidth = edgeObject.lineWidth;
      }
      this.preserved = _extends({}, edgeObject);
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.lineInstance;
    }
  }]);

  return Edge;
}();

exports.default = Edge;