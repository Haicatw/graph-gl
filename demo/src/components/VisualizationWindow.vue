<template>
  <div id="vis-window"></div>
</template>

<script>
import GraphGL from "vidi-graph-gl";
export default {
  data: () => ({
    graphGLInstance: undefined,
  }),
  mounted() {
    this.graphGLInstance = new GraphGL({ selector: "#vis-window" });
  },
};
</script>

<style>
</style>