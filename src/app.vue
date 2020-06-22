
<template>
  <div id="app">
    <header-component />
    <router-view id="router" theme="raratina" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// s
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
  min-height: 100vh;
  font: 14px "Oxygen Mono", monospace;
  overflow-x: hidden;
  display: grid;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--font-color);
  position: relative;
}
</style>
