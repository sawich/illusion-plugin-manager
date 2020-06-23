<template>
  <div class="layout">
    <header-component class="header" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    HeaderComponent: () => import("@/components/header.vue")
  }
})
export default class Default extends Vue {}
</script>

<style lang="scss" scoped>
$headerSize: 36px;

.layout {
  display: grid;
  grid-template-rows: $headerSize 1fr;
}

.header {
  height: $headerSize;
}
</style>
