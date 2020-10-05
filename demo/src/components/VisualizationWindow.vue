<template>
  <div id="vis-window"></div>
</template>

<script>
import GraphGL from "vidi-graph-gl";
export default {
  data: () => ({
    graphGLInstance: undefined,
    graphObject: {
      nodes: [{ id: 0, x: 0, y: 0, size: 30 }],
    },
  }),
  mounted() {
    this.graphGLInstance = new GraphGL({ selector: "#vis-window" });
    this.graphGLInstance.readGraph(this.graphObject);
  },
};
</script>

<style>
</style>