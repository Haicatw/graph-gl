'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaultSettings = require('../default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphModel = function () {
  function GraphModel() {
    _classCallCheck(this, GraphModel);

    this.model = {};
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
      if (typeof graphObject !== 'undefined') {
        throw new Error('Invalid graph object.');
      }
      if (typeof graphObject.nodes !== 'undefined') {
        throw new Error('Graph object must have valid nodes.');
      }
      if (typeof graphObject.edges !== 'undefined') {
        throw new Error('Graph object must have valid edges.');
      }
      this.model = _lodash2.default.cloneDeep(graphObject);
      // Nodes
      var nodeIdSet = [];
      _lodash2.default.each(this.model.nodes, function (node) {
        if (node.id === undefined) {
          throw new Error('Node must have a id field.');
        }
        nodeIdSet.push(node.id);
        if (nodeIdSet.length() !== _lodash2.default.uniq(nodeIdSet).length()) {
          throw new Error('Node must have a unique id.');
        }
        var defaultNode = (0, _defaultSettings.defaultNodeAttrs)();
        _lodash2.default.each(defaultNode, function (key, value) {
          if (typeof node[key] === 'undefined') {
            node[key] = value;
          }
        });
      });
      // Edges
      var edgeIdSet = [];
      _lodash2.default.each(this.model.edges, function (edge) {
        if (edge.id === undefined) {
          throw new Error('Edge must have a id field.');
        }
        if (edge.source === undefined) {
          throw new Error('Edge must have a source field.');
        }
        if (edge.destination === undefined) {
          throw new Error('Edge must have a destination field.');
        }
        edgeIdSet.push(edge.id);
        if (edgeIdSet.length() !== _lodash2.default.uniq(edgeIdSet).length()) {
          throw new Error('Edge must have a unique id.');
        }
        var defaultEdge = (0, _defaultSettings.defaultEdgeAttrs)();
        _lodash2.default.each(defaultEdge, function (key, value) {
          if (typeof edge[key] === 'undefined') {
            edge[key] = value;
          }
        });
      });
    }
  }, {
    key: 'graph',
    get: function get() {
      return this.model;
    }
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
  }]);

  return GraphModel;
}();

exports.default = GraphModel;