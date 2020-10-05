'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _graphModel = require('./models/graph-model');

var _graphModel2 = _interopRequireDefault(_graphModel);

var _polygonModel = require('./models/polygon-model');

var _polygonModel2 = _interopRequireDefault(_polygonModel);

var _nodeFactory = require('./factory/node-factory');

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLScene = function () {
  function GLScene() {
    _classCallCheck(this, GLScene);

    this.threeScene = new THREE.Scene();
    this.graph = new _graphModel2.default();
    this.polygons = new _polygonModel2.default();
    this.sceneObjects = {
      nodes: {},
      edges: {}
    };
  }

  _createClass(GLScene, [{
    key: 'readGraph',
    value: function readGraph(graphObject) {
      this.graph.read(graphObject);
    }
  }, {
    key: 'readPolygons',
    value: function readPolygons(polygonObjects) {
      this.polygons.read(polygonObjects);
    }
  }, {
    key: 'addGraphToScene',
    value: function addGraphToScene() {
      if (typeof this.graph.graph !== 'undefined') {
        throw new Error('Graph object uninitialized.');
      }
      if (typeof this.graph.nodes !== 'undefined') {
        throw new Error('Invalid nodes.');
      }
      _lodash2.default.each(this.graph.nodes, function (node) {
        node.internalObject = new _nodeFactory2.default(node);
        this.sceneObjects.nodes[node.id] = node.instance;
      });
      _lodash2.default.each(this.graph.edges, function (edge) {});
    }
  }, {
    key: 'scene',
    get: function get() {
      return this.threeScene;
    }
  }]);

  return GLScene;
}();

exports.default = GLScene;