'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-use-before-define */

// import $ from 'cash-dom'
// import { legendColor, legendSize, legendSymbol, legendHelpers } from 'd3-svg-legend'


var _d3v = require('d3v4');

var d3 = _interopRequireWildcard(_d3v);

var _d3SvgLegend = require('d3-svg-legend');

var d3Legend = _interopRequireWildcard(_d3SvgLegend);

var _runtimeSettings = require('../runtimeSettings/runtime-settings');

var _runtimeSettings2 = _interopRequireDefault(_runtimeSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLLegend = function () {
  function GLLegend() {
    _classCallCheck(this, GLLegend);

    var dim = document.querySelector(_runtimeSettings2.default.settings.selector).children[0].getBoundingClientRect();
    this.svg = d3.select(_runtimeSettings2.default.settings.selector).append('svg').attr('width', 1000).attr('height', 200).style('top', dim.top).style('left', dim.left).style('position', 'absolute').style('z-index', -10);
    console.log(_runtimeSettings2.default);
    this.scale = window.devicePixelRatio;
  }

  _createClass(GLLegend, [{
    key: 'createLegend',
    value: function createLegend() {
      this.createLinearScaleLegend('circle');
    }

    // type: circle/line

  }, {
    key: 'createLinearScaleLegend',
    value: function createLinearScaleLegend(type) {
      console.log('createLinearScaleLegend');
      if (type === 'line') {
        var lineSize = d3.scaleLinear().domain([0, 10]).range([2, 10]);

        // const svg = d3.select('#graph-gl-legend')

        this.svg.append('g').attr('class', 'legendSizeLine').attr('transform', 'translate(0, 20)');

        var legendSizeLine = d3Legend.legendSize().scale(lineSize).shape('line').orient('horizontal')
        // otherwise labels would have displayed:
        // 0, 2.5, 5, 10
        .labels([]).labelWrap(30).shapeWidth(40).labelAlign('start').shapePadding(10);

        this.svg.select('.legendSizeLine').call(legendSizeLine);
      } else {
        var linearSize = d3.scaleLinear().domain([0, 10]).range([10, 30]);

        // const svg = d3.select('#graph-gl-legend')

        this.svg.append('g').attr('class', 'legendSize').attr('transform', 'translate(20, 40)');

        var legendSize = d3Legend.legendSize().scale(linearSize).shape('circle').shapePadding(15).labelOffset(20).orient('horizontal');

        this.svg.select('.legendSize').call(legendSize);
      }
    }
  }]);

  return GLLegend;
}();
/* eslint-enable no-use-before-define */


exports.default = GLLegend;