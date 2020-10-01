<template>
  <div id="app">
    <VisualizationWindow />
  </div>
</template>

<script>
import VisualizationWindow from "./components/VisualizationWindow";
export default {
  name: "App",
  components: {
    VisualizationWindow,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
