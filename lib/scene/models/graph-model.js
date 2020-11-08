'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaultSettings = require('../../default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphModel = function () {
  function GraphModel() {
    _classCallCheck(this, GraphModel);

    this.model = {};
    this.boundingBox = { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
  }

  _createClass(GraphModel, [{
    key: 'clear',
    value: function clear() {
      this.model = {};
    }
  }, {
    key: 'read',
    value: function read(graphObject) {
      // Validate graph object
      if (typeof graphObject === 'undefined') {
        throw new Error('Invalid graph object.');
      }
      if (typeof graphObject.nodes === 'undefined') {
        throw new Error('Graph object must have valid nodes.');
      }
      // if (typeof graphObject.edges === 'undefined') {
      //   throw new Error('Graph object must have valid edges.')
      // }
      this.model = _lodash2.default.cloneDeep(graphObject);
      this.model.nodeMap = {};
      this.model.edgeMap = {};
      // Nodes
      var nodeIdSet = [];
      _lodash2.default.each(this.model.nodes, function (node) {
        if (node.id === undefined) {
          throw new Error('Node must have a id field.');
        }
        nodeIdSet.push(node.id);
        if (nodeIdSet.length !== _lodash2.default.uniq(nodeIdSet).length) {
          throw new Error('Node must have a unique id.');
        }
        var defaultNode = (0, _defaultSettings.defaultNodeAttrs)();
        _lodash2.default.each(defaultNode, function (value, key) {
          if (typeof node[key] === 'undefined') {
            // console.log(key, value)
            node[key] = value;
          }
        });
        this.boundingBox.xMin = node.x < this.boundingBox.xMin ? node.x : this.boundingBox.xMin;
        this.boundingBox.yMin = node.y < this.boundingBox.yMin ? node.y : this.boundingBox.yMin;
        this.boundingBox.xMax = node.x > this.boundingBox.xMax ? node.x : this.boundingBox.xMax;
        this.boundingBox.yMax = node.y > this.boundingBox.yMax ? node.y : this.boundingBox.yMax;
        this.model.nodeMap[node.id] = node;
      }.bind(this));
      // Edges
      var edgeIdSet = [];
      _lodash2.default.each(this.model.edges, function (edge) {
        if (edge.id === undefined) {
          throw new Error('Edge must have a id field.');
        }
        if (edge.source === undefined) {
          throw new Error('Edge must have a source field.');
        }
        if (edge.target === undefined) {
          throw new Error('Edge must have a target field.');
        }
        edgeIdSet.push(edge.id);
        if (edgeIdSet.length !== _lodash2.default.uniq(edgeIdSet).length) {
          throw new Error('Edge must have a unique id.');
        }
        var defaultEdge = (0, _defaultSettings.defaultEdgeAttrs)();
        _lodash2.default.each(defaultEdge, function (value, key) {
          if (typeof edge[key] === 'undefined') {
            edge[key] = value;
          }
        });
        // console.log('Edge', edge)
        if (!edge.curve) {
          edge.positions = {
            source: { x: this.model.nodeMap[edge.source].x, y: this.model.nodeMap[edge.source].y, z: -0.1 },
            target: { x: this.model.nodeMap[edge.target].x, y: this.model.nodeMap[edge.target].y, z: -0.1 }
          };
        } else {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = edge.positions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var point = _step.value;

              point.z = -0.1;
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
        }
        this.model.edgeMap[edge.id] = edge;
      }.bind(this));
    }
  }, {
    key: 'graph',
    get: function get() {
      return this.model;
    }

    // TODO: return nodeMap and edgeMap for performance optimization

  }, {
    key: 'nodes',
    get: function get() {
      return this.model.nodes;
    }
  }, {
    key: 'edges',
    get: function get() {
      return this.model.edges;
    }
  }, {
    key: 'nodeMapper',
    get: function get() {
      return this.model.nodeMap;
    }
  }]);

  return GraphModel;
}();

exports.default = GraphModel;