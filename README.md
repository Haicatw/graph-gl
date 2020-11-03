<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/haicatw/graph-gl">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

  <h3 align="center">Graph-GL</h3>

  <p align="center">
    Minimized graph visualization package only for rendering and interactions.
    <br />
    <a href="https://github.com/haicatw/graph-gl"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/haicatw/graph-gl">Demo Under Construction</a>
    ·
    <a href="https://github.com/haicatw/graph-gl/issues">Report Bug</a>
    ·
    <a href="https://github.com/haicatw/graph-gl/issues">Request Feature</a>
  </p>
</p>

![package](.\img\package.png)

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
  - [Notification](#notification)
- [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Graph-gl is a minimum package dedicated to render graphs and handel interactions based on WebGL.

### Built With

* [three.js](https://threejs.org/)
* [cash-dom](https://www.npmjs.com/package/cash-dom)
* [underscore.js](https://underscorejs.org/)

### Notification

Check out npm or github release branch for latest version.

The interaction feature is under development and will be released very soon.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

#### Using the lib

The library could be installed with

```sh
npm install vidi-graph-gl
```

#### Develop the lib

1. Clone the repo
```sh
git clone https://github.com/haicatw/graph-gl.git
```
2. Install NPM packages
```sh
npm install
```

3. Lint 

```sh
npm run lint
```

4. Build

```sh
npm run build
```

<!-- USAGE EXAMPLES -->

## Usage

1. Import the library

   ```js
   import GraphGL from "vidi-graph-gl";
   ```

2. Initialize the instance

   ```js
   const graphGLInstance = new GraphGL({ selector: "#container" });
   ```

3. Load your graph

   ```js
   const myGraph = {
       nodes: [
           { id: 0, x: 0, y: 0, size: 40, label: "testing..." },
           { id: 1, x: 3.4, y: -5.2, size: 30, borderWidth: 10, label: "testing" },
           { id: 2, x: 0, y: 10, size: 30, borderWidth: 30, label: "testing label"},
       ],
       edges: [{ id: 0, source: 2, target: 1, color: "#2ec1ac", width: 1 }],
   };
   graphGLInstance.readGraph(myGraph);
   ```

   ![initialization](.\img\initialization.png)

4. Update visualization

   ```js
   graphGLInstance.refresh();
   ```

5. Update graph data

   ```js
   for(const node of graphGLInstance.nodes()) { // or .edges() for updating edges
       node.color = '#000000'
       node.borderWidth = 40
       node.opacity = 0.5
       node.borderColor = '#2ec1ac'
       node.size = 40
       node.label = "new label"
   }
   graphGLInstance.refresh();
   ```

   ![updated](.\img\updated.png)

6. Clear current graph data

   ```js
   graphGLInstance.clear();
   ```

   

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/haicatw/graph-gl/issues) for a list of proposed features (and known issues).

### Features

- [x] Graph model
- [x] Node visual encoding
- [x] Edge visual encoding
- [x] Curved edge
- [x] Auto fit scene
- [x] Label
- [ ] Interaction handler
- [x] Graph hot updator

<!-- CONTRIBUTING -->
Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/haicatw/repo.svg?style=flat-square
[contributors-url]: https://github.com/haicatw/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/haicatw/repo.svg?style=flat-square
[forks-url]: https://github.com/haicatw/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/haicatw/repo.svg?style=flat-square
[stars-url]: https://github.com/haicatw/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/haicatw/repo.svg?style=flat-square
[issues-url]: https://github.com/haicatw/repo/issues
[license-shield]: https://img.shields.io/github/license/haicatw/repo.svg?style=flat-square
[license-url]: https://github.com/haicatw/repo/blob/master/LICENSE.txt