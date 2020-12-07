/* eslint-disable no-use-before-define */

import * as d3 from 'd3v4'
// import $ from 'cash-dom'
// import { legendColor, legendSize, legendSymbol, legendHelpers } from 'd3-svg-legend'
import * as d3Legend from 'd3-svg-legend'
import runtimeSettings from '../runtimeSettings/runtime-settings'

export default class GLLegend {
  constructor () {
    const dim = document.querySelector(runtimeSettings.settings.selector).children[0].getBoundingClientRect()
    this.svg = d3.select(runtimeSettings.settings.selector).append('svg').attr('width', 1000)
      .attr('height', 200).style('top', dim.top).style('left', dim.left).style('position', 'absolute').style('z-index', -10)
    console.log(runtimeSettings)
    this.scale = window.devicePixelRatio
  }

  createLegend () {
    this.createLinearScaleLegend('circle')
  }

  // type: circle/line
  createLinearScaleLegend (type) {
    console.log('createLinearScaleLegend')
    if (type === 'line') {
      const lineSize = d3.scaleLinear().domain([0, 10]).range([2, 10])

      // const svg = d3.select('#graph-gl-legend')

      this.svg.append('g')
        .attr('class', 'legendSizeLine')
        .attr('transform', 'translate(0, 20)')

      const legendSizeLine = d3Legend.legendSize()
        .scale(lineSize)
        .shape('line')
        .orient('horizontal')
      // otherwise labels would have displayed:
      // 0, 2.5, 5, 10
        .labels([])
        .labelWrap(30)
        .shapeWidth(40)
        .labelAlign('start')
        .shapePadding(10)

      this.svg.select('.legendSizeLine')
        .call(legendSizeLine)
    } else {
      const linearSize = d3.scaleLinear().domain([0, 10]).range([10, 30])

      // const svg = d3.select('#graph-gl-legend')

      this.svg.append('g')
        .attr('class', 'legendSize')
        .attr('transform', 'translate(20, 40)')

      const legendSize = d3Legend.legendSize()
        .scale(linearSize)
        .shape('circle')
        .shapePadding(15)
        .labelOffset(20)
        .orient('horizontal')

      this.svg.select('.legendSize')
        .call(legendSize)
    }
  }
}
/* eslint-enable no-use-before-define */
