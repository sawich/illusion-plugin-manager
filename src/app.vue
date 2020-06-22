
<template>
  <div id="app">
    <header-component class="header" />
    <div class="router">
      <router-view class="router-content" theme="raratina" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
const cached = namespace("cached");
const plugins = namespace("plugins");
const vs = namespace("vs");

@Component({
  components: {
    HeaderComponent: () => import("@/components/header.vue")
  }
})
export default class App extends Vue {
  @cached.Action("load")
  private cachedLoad!: () => Promise<void>;

  @plugins.Action("load")
  private pluginsLoad!: () => Promise<void>;

  @vs.Action("load")
  private vsLoad!: () => Promise<void>;

  async created() {
    console.log("created");

    await this.cachedLoad();
    await this.pluginsLoad();
    await this.vsLoad();

    console.log("created end");
  }
}
</script>

<style lang="scss">
@import "@/themes/raratina.scss";

body {
  font: 14px "Oxygen Mono", monospace;
  height: 100vh;
  display: grid;
  line-height: 1.6;
}

$headerSize: 36px;

#app {
  display: grid;
  grid-template-rows: $headerSize 1fr;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--font-color);
  position: relative;
}

.header {
  position: sticky;
  top: 0px;
  height: $headerSize;
}

.router {
  overflow-y: auto;
  max-height: calc(100vh - #{$headerSize});
  // max-height: 0;
  display: inherit;
}
</style>
