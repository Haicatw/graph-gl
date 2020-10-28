'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import * as THREE from 'three'


var _OrbitControls = require('three/examples/jsm/controls/OrbitControls');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLControl = function () {
  function GLControl(camera, domElementTag) {
    _classCallCheck(this, GLControl);

    this.threeControl = new _OrbitControls.OrbitControls(camera, domElementTag);
    this.threeControl.enableRotate = false;
  }

  _createClass(GLControl, [{
    key: 'enableNavigation',
    value: function enableNavigation() {
      this.threeControl.enableZoom = true;
      // this.threeControl.enableRotate = true
      this.threeControl.enablePan = true;
    }
  }, {
    key: 'disableNavigation',
    value: function disableNavigation() {
      this.threeControl.enableZoom = false;
      // this.threeControl.enableRotate = false
      this.threeControl.enablePan = false;
    }
  }, {
    key: 'update',
    value: function update() {
      this.threeControl.update();
    }
  }, {
    key: 'control',
    get: function get() {
      return this.threeControl;
    }
  }]);

  return GLControl;
}();

exports.default = GLControl;