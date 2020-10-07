<template>
  <div id="vis-window"></div>
</template>

<script>
import GraphGL from "vidi-graph-gl";
export default {
  data: () => ({
    graphGLInstance: undefined,
    graphObject: {
      nodes: [],
      edges: [],
      // nodes: [
      //   { id: 0, x: 0, y: 0, size: 40 },
      //   { id: 1, x: 3.4, y: -5.2, size: 30, borderWidth: 10 },
      //   { id: 2, x: 0, y: 10, size: 30, borderWidth: 30 },
      // ],
      // edges: [{ id: 0, source: 2, target: 1, color: "#2ec1ac", width: 1 }],
    },
  }),
  mounted() {
    const numNodes = 30;
    const numEdges = 30;
    for (let i = 0; i < numNodes; i++) {
      this.graphObject.nodes.push({
        id: i,
        x: this.rand(),
        y: this.rand(),
        size: this.randomInt(40, 60),
        // color: this.randColor(),
        borderWidth: this.randomInt(10, 20),
        // borderColor: this.randColor(),
        // opacity: 0.5,
      });
    }
    for (let i = 0; i < numEdges; i++) {
      this.graphObject.edges.push({
        id: i,
        source: this.randomInt(0, numNodes - 1),
        target: this.randomInt(0, numNodes - 1),
        width: this.randTiny() * 10,
        color: "#2ec1ac", //this.randColor(),
        // opacity: 0.2,
      });
    }
    this.graphGLInstance = new GraphGL({ selector: "#vis-window" });
    this.graphGLInstance.readGraph(this.graphObject);
    this.graphGLInstance.refresh();
  },
  methods: {
    rand() {
      return (Math.random() * (30 - -30) + -30).toFixed(4);
    },
    randSize() {
      return Math.random() * (100 - 60) + 60;
    },
    randColor() {
      return (
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
      );
    },
    randomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randTiny() {
      return (Math.random() * (1.2 - 1) + 1).toFixed(4);
    },
  },
};
</script>

<style>
</style>