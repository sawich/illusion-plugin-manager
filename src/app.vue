
<template>
  <fragment>
    <header-component class="header" />
    <router-view class="app-content" theme="raratina" />
  </fragment>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { games, packages, vs, cached } from "./store";

import { readdir, writeFile } from "fs/promises";

@Component({
  components: {
    HeaderComponent: () => import("@/components/layouts/default/header.vue")
  }
})
export default class App extends Vue {
  async created() {
    //@ts-ignore
    nw.Window.get().showDevTools();

    this.$router.push({ name: "loading" });
  }
}
</script>

<style lang="scss">
@import "@/themes/raratina.scss";

$headerSize: 36px;

body {
  // font: 14px "Oxygen Mono", monospace;
  font: 14px "Fira Code", monospace;
  line-height: 1.6;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--font-color);
  overflow: hidden;
}

body {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: $headerSize 1fr;
}

.header {
  height: $headerSize;
}
</style>
