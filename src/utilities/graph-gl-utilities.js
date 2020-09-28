import $ from 'cash-dom'

export function getDimensions (selector) {
  const height = $(selector).innerHeight()
  const width = $(selector).innerWidth()
  return { width, height }
}
