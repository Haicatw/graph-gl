'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

var _graphGlPicker = require('./graph-gl-picker');

var _graphGlPicker2 = _interopRequireDefault(_graphGlPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLEventHandeler = function () {
  function GLEventHandeler(renderer, camera) {
    _classCallCheck(this, GLEventHandeler);

    this.renderer = renderer;
    this.picker = new _graphGlPicker2.default(renderer);
    this.camera = camera;
    this.eventLists = {
      clickNode: ['click', 'Nodes']
    };
    this.boundEvents = [];
  }

  _createClass(GLEventHandeler, [{
    key: 'addScene',
    value: function addScene(scene) {
      this.scene = scene;
    }
  }, {
    key: 'addObjectMapper',
    value: function addObjectMapper(objectMapper) {
      this.mapper = objectMapper;
    }
  }, {
    key: 'addLayer',
    value: function addLayer(layerName) {
      this.picker.createLayer(layerName);
    }
  }, {
    key: 'addObjectToLayer',
    value: function addObjectToLayer(layerName, pickableObject) {
      this.picker.addObjectToLayer(layerName, pickableObject);
    }
  }, {
    key: 'buildEvent',
    value: function buildEvent(callback, layerName) {
      var picker = this.picker;
      var camera = this.camera;
      var mapper = this.mapper;
      // console.log('Build event')
      var tempRenderer = this.renderer;
      var tempCamera = this.camera;
      var tempScene = this.scene;
      var eventHandler = function eventHandler(event) {
        // console.log('Event called')
        var id = picker.pick(layerName, camera, picker.getCursorPosition(event));
        tempRenderer.render(tempScene, tempCamera);
        console.log(id, mapper, mapper[id]);
        if (id === 16777215) {
          return undefined;
        }
        event.pickedObject = mapper[id];
        // console.log(id)
        callback(event);
      };

      return eventHandler;
    }
  }, {
    key: 'bindListener',
    value: function bindListener(eventName, callback) {
      if (!this.eventLists[eventName]) {
        throw new Error(eventName + ' event not supported.');
      }
      var internalEventname = this.eventLists[eventName][0];
      var layerName = this.eventLists[eventName][1];
      var eventHandler = this.buildEvent(callback, layerName);
      this.boundEvents.push(internalEventname);
      (0, _cashDom2.default)(this.picker.renderer.domElement).on(internalEventname, eventHandler);
    }
  }, {
    key: 'unbindListener',
    value: function unbindListener(eventName) {
      var internalEventname = this.eventLists[eventName][0];
      (0, _cashDom2.default)(this.picker.renderer.domElement).off(internalEventname);
    }

    // update dataset, use department, cobook, sematic label, overview (check box to show network wise department/ size stats data of network)

  }, {
    key: 'clearLayer',
    value: function clearLayer(layerName) {
      this.picker.clearLayer(layerName);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this = this;

      this.boundEvents.forEach(function (element) {
        _this.unbindListener(element);
      });
      this.picker.clear();
    }
  }]);

  return GLEventHandeler;
}();

exports.default = GLEventHandeler;