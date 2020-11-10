'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _legendTextFactory = require('../scene/factory/legend-text-factory');

var _legendTextFactory2 = _interopRequireDefault(_legendTextFactory);

var _nodeFactory = require('../scene/factory/node-factory');

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _edgeFactory = require('../scene/factory/edge-factory');

var _edgeFactory2 = _interopRequireDefault(_edgeFactory);

var _defaultSettings = require('../default-settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { getTextTexture } from '../utilities/graph-gl-utilities'

var GLLegend = function () {
  function GLLegend(camera, domElement) {
    _classCallCheck(this, GLLegend);

    this.camera = camera;
    this.domElement = domElement;
    this.legendContainer = new THREE.Group();
    this.internalContainer = [];
    this.imgDim = 3;
    this.edgePadding = 2;
    this.hasData = false;
  }

  _createClass(GLLegend, [{
    key: 'createLayout',


    // node legend: max min size, max min border, color category, color continuous
    // edge legend: max min width, color category, color continuous

    value: function createLayout(legendData) {
      // const tempStorage = []
      // const tempStorageNode = []
      var count = 0;
      _lodash2.default.each(legendData, function (legend) {
        legend = this.processRawLegend(legend);
        // console.log(legend.type)
        if (legend.instance.type === 'node') {
          // const legendLabel
          console.log('node: ', legend);
          legend.label.x = this.imgDim;
          legend.label.y = -(count * this.imgDim / 2 + this.imgDim / 2);
          // tempStorage.push(new LegendText(legend.label))
          legend.instance.x = this.imgDim / 2;
          legend.instance.y = -(count * this.imgDim / 2 + this.imgDim / 2);
          // tempStorageNode.push(new Node(legend.node))
          var internalLabel = new _legendTextFactory2.default(legend.label);
          var internalInstance = new _nodeFactory2.default(legend.instance);
          this.legendContainer.add(internalInstance.instance);
          this.legendContainer.add(internalLabel.instance);
          this.internalContainer.push({ label: internalLabel, instance: internalInstance });
        } else {
          legend.label.x = this.imgDim;
          legend.label.y = -(count * this.imgDim / 2 + this.imgDim / 2);
          // tempStorage.push(new LegendText(legend.label))
          legend.instance.positions.source.x = this.edgePadding;
          legend.instance.positions.target.x = this.imgDim - this.edgePadding;
          legend.instance.positions.source.y = -(count * this.imgDim / 2 + this.imgDim / 2);
          legend.instance.positions.target.y = -(count * this.imgDim / 2 + this.imgDim / 2);
          // tempStorageNode.push(new Node(legend.node))
          var _internalLabel = new _legendTextFactory2.default(legend.label);
          var _internalInstance = new _edgeFactory2.default(legend.instance);
          this.legendContainer.add(_internalInstance.instance);
          this.legendContainer.add(_internalLabel.instance);
          this.internalContainer.push({ label: _internalLabel, instance: _internalInstance });
        }
        count += 1;
      }.bind(this));
      this.hasData = true;
      var newPos = this.getWorldPositionTopLeft();
      this.legendContainer.position.set(newPos.x, newPos.y, 0);
    }

    // convertToWorldSpace (x, y, cam) {
    //   const screenPos = new THREE.Vector3(x, y, -1)
    //   const pos = new THREE.Vector3()
    //   screenPos.unproject(cam)
    //   // screenPos.z = 0
    //   // console.log(screenPos)

    //   screenPos.sub(cam.position).normalize()

    //   const distance = -cam.position.z / screenPos.z

    //   pos.copy(cam.position).add(screenPos.multiplyScalar(distance))
    //   return pos
    // }

  }, {
    key: 'getWorldPositionTopLeft',
    value: function getWorldPositionTopLeft() {
      var x = 0; // -this.domElement.width / 2 + 10
      var y = 0.5; // this.domElement.height / 2 - 10
      var screenPos = new THREE.Vector3(x, y, 1);
      console.log(screenPos);
      var pos = new THREE.Vector3();
      screenPos.unproject(this.camera);
      // screenPos.z = 0
      // console.log(screenPos)

      screenPos.sub(this.camera.position).normalize();

      var distance = -this.camera.position.z / screenPos.z;

      pos.copy(this.camera.position).add(screenPos.multiplyScalar(distance));
      return pos;
    }
  }, {
    key: 'processRawLegend',
    value: function processRawLegend(rawLegend) {
      var legend = (0, _defaultSettings.defaultLegendAttrs)();
      legend.label = { label: rawLegend.label };
      for (var property in rawLegend.instance) {
        legend.instance[property] = rawLegend.instance[property];
      }
      return legend;
    }
  }, {
    key: 'updateLabels',
    value: function updateLabels(scale) {
      _lodash2.default.each(this.internalContainer, function (legend) {
        console.log(legend);
        legend.label.instance.scale.set(scale * legend.label.ratio, scale, 1);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.legendContainer = new THREE.Group();
      this.hasData = false;
    }
  }, {
    key: 'legend',
    get: function get() {
      return this.legendContainer;
    }
  }]);

  return GLLegend;
}();

exports.default = GLLegend;