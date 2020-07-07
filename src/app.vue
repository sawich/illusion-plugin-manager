
<template>
  <router-view class="app-content" theme="raratina" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { games, packages, installedPackages, vs, cached } from "./store";

@Component({})
export default class App extends Vue {
  async created() {
    this.$router.push({ name: "loading" });
  }
}
</script>

<style lang="scss">
@import "@/themes/raratina.scss";

body {
  font: 14px "Oxygen Mono", monospace;
  line-height: 1.6;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--font-color);
  overflow: hidden;
}

body,
.app-content {
  height: 100vh;
  width: 100vw;
}
</style>
