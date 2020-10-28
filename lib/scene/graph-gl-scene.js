'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _edgeFactory = require('./factory/edge-factory');

var _edgeFactory2 = _interopRequireDefault(_edgeFactory);

var _labelFactory = require('./factory/label-factory');

var _labelFactory2 = _interopRequireDefault(_labelFactory);

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
    this.hasData = false;
  }

  _createClass(GLScene, [{
    key: 'graphNodes',
    value: function graphNodes() {
      return this.graph.nodes;
    }
  }, {
    key: 'graphEdges',
    value: function graphEdges() {
      return this.graph.edges;
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (!this.hasData) {
        throw new Error('No data to clear');
      }
      clearScene(this.threeScene);
      this.sceneObjects = {
        nodes: {},
        edges: {}
      };
      this.graph.clear();
      this.polygons.clear();
      this.hasData = false;
    }
  }, {
    key: 'readGraph',
    value: function readGraph(graphObject) {
      if (this.hasData) {
        throw new Error('Please clear current graph before read new graph.');
      }
      this.graph.read(graphObject);
      this.addGraphToScene();
      this.hasData = true;
    }
  }, {
    key: 'readPolygons',
    value: function readPolygons(polygonObjects) {
      this.polygons.read(polygonObjects);
    }
  }, {
    key: 'addGraphToScene',
    value: function addGraphToScene() {
      if (typeof this.graph.graph === 'undefined') {
        throw new Error('Graph object uninitialized.');
      }
      if (typeof this.graph.nodes === 'undefined') {
        throw new Error('Invalid nodes.');
      }
      _lodash2.default.each(this.graph.nodes, function (node) {
        node.internalObject = new _nodeFactory2.default(node);
        node.internalObject.labelInstance = new _labelFactory2.default(_extends({}, node, { offset: node.size + node.borderWidth }));
        this.sceneObjects.nodes[node.id] = node.internalObject.instance;
        this.threeScene.add(node.internalObject.instance);
        this.threeScene.add(node.internalObject.labelInstance.instance);
      }.bind(this));
      _lodash2.default.each(this.graph.edges, function (edge) {
        if (!edge.positions) {
          throw new Error('Edge must provide points positions');
        }
        edge.internalObject = new _edgeFactory2.default(edge);
        // TODO: edge label
        this.sceneObjects.edges[edge.id] = edge.internalObject.instance;
        this.threeScene.add(edge.internalObject.instance);
        // console.log(edge)
      }.bind(this));
    }
  }, {
    key: 'updateGraph',
    value: function updateGraph() {
      _lodash2.default.each(this.graph.nodes, function (node) {
        // console.log(node)
        node.internalObject.update(node);
        node.internalObject.labelInstance.update(_extends({}, node, { offset: node.size + node.borderWidth }));
      });
      _lodash2.default.each(this.graph.edges, function (edge) {
        if (!edge.positions) {
          throw new Error('Edge must provide points positions');
        }
        edge.internalObject.update(edge);
        // TODO: edge label
        // console.log(edge)
      });
    }
  }, {
    key: 'scene',
    get: function get() {
      return this.threeScene;
    }
  }, {
    key: 'boundingBox',
    get: function get() {
      return this.graph.boundingBox;
    }
  }]);

  return GLScene;
}();

// Reference: https://stackoverflow.com/questions/30359830/how-do-i-clear-three-js-scene/48722282


exports.default = GLScene;
function clearScene(scene) {
  while (scene.children.length > 0) {
    clearScene(scene.children[0]);
    scene.remove(scene.children[0]);
  }
  if (scene.geometry) scene.geometry.dispose();

  if (scene.material) {
    // in case of map, bumpMap, normalMap, envMap ...
    Object.keys(scene.material).forEach(function (prop) {
      if (!scene.material[prop]) {
        return;
      }
      if (scene.material[prop] !== null && typeof scene.material[prop].dispose === 'function') {
        scene.material[prop].dispose();
      }
    });
    scene.material.dispose();
  }
}