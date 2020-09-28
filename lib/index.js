'use strict';

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = window.innerWidth;
// let vizWidth = width
var height = window.innerHeight;

var fov = 40;
var near = 10;
var far = 7000;

// Set up camera and scene
var camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#e5e5e5');
var scene = new THREE.Scene();
scene.add(new THREE.Points());
renderer.setSize(width, height);

(0, _cashDom2.default)('body').add(renderer.domElement);

var render = function render() {
  renderer.render(scene, camera);
};

render();