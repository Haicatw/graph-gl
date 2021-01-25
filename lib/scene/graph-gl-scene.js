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

var _graphGlLegend = require('../legend/graph-gl-legend');

var _graphGlLegend2 = _interopRequireDefault(_graphGlLegend);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLScene = function () {
  function GLScene(eventhandlerProxy, cameraProxy, renderDom) {
    _classCallCheck(this, GLScene);

    this.eventhandlerProxy = eventhandlerProxy;
    this.cameraProxy = cameraProxy;
    this.renderDom = renderDom;
    this.threeScene = new THREE.Scene();
    this.graph = new _graphModel2.default();
    this.polygons = new _polygonModel2.default();
    // this.legend = new GLLegend(this.cameraProxy.camera, this.renderDom)
    this.legend = new _graphGlLegend2.default();
    this.legend.createLinearScaleLegend('circle');
    this.sceneObjects = {
      nodes: {},
      edges: {}
    };
    this.hasData = false;
    this.eventhandlerProxy.addLayer('Nodes');
    // const scope = this
    // this.eventhandlerProxy.bindListener('click', function (e) {
    //   scope.setUpDebugObject()
    // }, 'Nodes')
  }

  _createClass(GLScene, [{
    key: 'setUpDebugObject',
    value: function setUpDebugObject() {
      console.log('setUpDebugObject');
      var geom = new THREE.BoxGeometry(100, 100, 100);
      var mat = new THREE.MeshBasicMaterial({ map: this.eventhandlerProxy.picker.pickingTexture.texture });
      var ma = new THREE.Mesh(geom, mat);
      ma.position.set(0, 0, 0);
      this.threeScene.add(ma);
    }
  }, {
    key: 'graph',
    value: function graph() {
      return this.graph;
    }
  }, {
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
      // if (!this.hasData) {
      //   throw new Error('No data to clear')
      // }
      clearScene(this.threeScene);
      this.sceneObjects = {
        nodes: {},
        edges: {}
      };
      this.graph.clear();
      this.polygons.clear();
      this.eventhandlerProxy.clearLayer('Nodes');
      this.hasData = false;
      // this.legend.clear()
    }
  }, {
    key: 'readGraph',
    value: function readGraph(graphObject) {
      if (this.hasData) {
        throw new Error('Please clear current graph before read new graph.');
      }
      this.graph.read(graphObject);
      // this.legend.createLayout(graphObject.legend)
      this.addGraphToScene();
      this.eventhandlerProxy.addObjectMapper(this.graph.nodeMapper);
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
        // node.internalObject.instance.id.set(node.id)
        this.threeScene.add(node.internalObject.instance);
        this.threeScene.add(node.internalObject.labelInstance.instance);
        this.eventhandlerProxy.addObjectToLayer('Nodes', node);
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
      // this.threeScene.add(this.legend.legend)
    }
  }, {
    key: 'updateGraph',
    value: function updateGraph() {
      var tempNodeMap = this.graph.nodeMapper;
      _lodash2.default.each(this.graph.nodes, function (node) {
        // console.log(node)
        node.internalObject.update(node);
        node.internalObject.labelInstance.update(_extends({}, node, { offset: node.size + node.borderWidth }));
      });
      _lodash2.default.each(this.graph.edges, function (edge) {
        if (!edge.positions) {
          throw new Error('Edge must provide points positions');
        }
        // this.graph.updateEdgePos(edge)
        edge.internalObject.update(edge, tempNodeMap);
        // TODO: edge label
        // console.log(edge)
      });
    }
  }, {
    key: 'sceneUpdate',
    value: function sceneUpdate() {
      var scaleFactor = 20;
      var camZoom = this.cameraProxy.camera.zoom;
      var scale = scaleFactor / camZoom;
      // console.log(camZoom)
      _lodash2.default.each(this.graph.nodes, function (node) {
        // console.log(node.internalObject.instance)
        var ratio = node.internalObject.labelInstance.ratio;
        node.internalObject.labelInstance.instance.scale.set(ratio * scale, scale, 1);
      });

      // if (this.legend.hasData) {
      //   const legendPos = this.legend.getWorldPositionTopLeft()
      //   console.log(legendPos)
      // this.legend.updateLabels(scale)
      // this.legend.legendContainer.position.set(legendPos.x, legendPos.y, 0)
      // this.legend.legendContainer.scale.set(scale, scale, scale)
      //   this.legend.legend.position.set(legendPos.x, legendPos.y, 0)
      //   this.legend.legend.scale.set(scale, scale, 1)
      // }
      // console.log(this.legend.legend)
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