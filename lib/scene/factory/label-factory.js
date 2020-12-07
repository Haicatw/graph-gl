'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import createLabelMaterial from '../../materials/label-material'


var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _graphGlUtilities = require('../../utilities/graph-gl-utilities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Label = function () {
  function Label(_ref) {
    var label = _ref.label,
        x = _ref.x,
        y = _ref.y,
        labelColor = _ref.labelColor,
        offset = _ref.offset;

    _classCallCheck(this, Label);

    // console.log(label)
    this.preserved = { label: label, x: x, y: y, labelColor: labelColor, offset: offset };
    this.texture = (0, _graphGlUtilities.getTextTexture)(label, 'black' || labelColor);
    this.texture.generateMipmaps = false;
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.needsUpdate = true;
    this.ratio = this.texture.image.width / this.texture.image.height;
    this.geometry = new THREE.PlaneBufferGeometry(1, 1);
    // this.material = createLabelMaterial({ x: x, y: y, texture: this.texture })
    this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
    this.material.depthTest = false;
    this.labelInstance = new THREE.Mesh(this.geometry, this.material);
    this.labelInstance.scale.set(this.ratio, 1, 1);
    // this.labelInstance.needsUpdate = true
    this.labelInstance.position.set(x, y + offset / 40, 0.2);
    this.labelInstance.renderOrder = 2;
  }

  _createClass(Label, [{
    key: 'update',
    value: function update(labelObject) {
      for (var property in this.preserved) {
        if (this.preserved[property] !== labelObject[property]) {
          if (property === 'label' || property === 'labelColor') {
            this.texture.dispose();
            this.texture = (0, _graphGlUtilities.getTextTexture)(labelObject.label, 'black' || labelObject.labelColor);
            this.texture.generateMipmaps = false;
            this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.needsUpdate = true;
            this.ratio = this.texture.image.width / this.texture.image.height;
            this.material.map = this.texture;
            this.labelInstance.scale.set(this.ratio, 1, 1);
          } else if (property === 'x' || property === 'y') {
            this.labelInstance.position.set(labelObject.x, labelObject.y + labelObject.offset / 40, 0.2);
          }
          this.preserved[property] = labelObject[property];
        }
      }
    }
  }, {
    key: 'resize',
    value: function resize(factor) {
      this.labelInstance.scale.set(this.labelInstance.x * factor, this.labelInstance.y * factor, 1);
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.labelInstance;
    }
  }]);

  return Label;
}();

exports.default = Label;