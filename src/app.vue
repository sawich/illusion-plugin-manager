
<template>
  <!-- <div id="app"> -->
  <router-view class="app-content" theme="raratina" />
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
const cached = namespace("cached");
const plugins = namespace("plugins");
const vs = namespace("vs");

@Component({})
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
