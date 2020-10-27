import $ from 'cash-dom'
import * as THREE from 'three'
export function getDimensions (selector) {
  const height = $(selector).innerHeight()
  const width = $(selector).innerWidth()
  return { width, height }
}

// Modified from https://css-tricks.com/techniques-for-rendering-text-with-webgl/#article-header-id-2
function createTextCanvas (text, parameters = {}) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Prepare the font to be able to measure
  const fontSize = parameters.fontSize || 56
  ctx.font = `${fontSize}px monospace`

  const textMetrics = ctx.measureText(text)

  const width = textMetrics.width
  const height = fontSize

  // const dimensions = width > height ? width : height

  // Resize canvas to match text size
  canvas.width = width
  canvas.height = height
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  // canvas.width = dimensions
  // canvas.height = dimensions
  // canvas.style.width = dimensions + 'px'
  // canvas.style.height = dimensions + 'px'

  // Re-apply font since canvas is resized.
  ctx.font = `${fontSize}px monospace`
  ctx.textAlign = parameters.align || 'center'
  ctx.textBaseline = parameters.baseline || 'middle'

  // Make the canvas transparent for simplicity
  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  ctx.fillStyle = parameters.color || 'white'
  ctx.fillText(text, width / 2, height / 2)

  return canvas
}

export function getTextTexture (text, color) {
  const texture = new THREE.Texture(createTextCanvas(text, { color }))
  // console.log(texture)
  return texture
}
