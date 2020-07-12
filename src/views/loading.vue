<template>
  <section>
    Loading
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { games, packages, vs, cached } from "@/store";

@Component({ components: {} })
export default class Loading extends Vue {
  async created() {
    console.log("created");
    console.log("loading");

    await Promise.all([games.load().then(packages.load), vs.load()]);

    console.log("created end");

    // this.$router.push({ name: "home" });
    this.$router.push({ name: "library", query: { game: "6" } });
  }
}
</script>

<style lang="scss" scoped>
</style>
