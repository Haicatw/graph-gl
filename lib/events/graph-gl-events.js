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

    this.picker = new _graphGlPicker2.default(renderer);
    this.camera = camera;
    this.eventNameMap = {};
  }

  _createClass(GLEventHandeler, [{
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
      console.log('Build event');
      var eventHandler = function eventHandler(event) {
        console.log('Event called');
        var id = picker.pick(layerName, camera, picker.getCursorPosition(event));
        if (id === 0) {
          return;
        }
        event.pickedObject = mapper[id];
        console.log(id);
        callback(event);
      };

      return eventHandler;
    }
  }, {
    key: 'bindListener',
    value: function bindListener(eventName, callback, layerName) {
      var eventHandler = this.buildEvent(callback, layerName);
      (0, _cashDom2.default)(this.picker.renderer.domElement).on(eventName, eventHandler);
    }
  }, {
    key: 'unbindListener',
    value: function unbindListener(eventName) {
      (0, _cashDom2.default)(this.picker.renderer.domElement).off(eventName);
    }
  }]);

  return GLEventHandeler;
}();

exports.default = GLEventHandeler;