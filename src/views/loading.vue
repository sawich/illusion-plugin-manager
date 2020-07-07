<template>
  <section>
    Loading
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { games, packages, installedPackages, vs, cached } from "@/store";

@Component({ components: {} })
export default class Loading extends Vue {
  async created() {
    console.log("created");

    // await vs.load();
    await games.load();
    await packages.load();
    // await cached.load();
    // await installedPackages.load();

    console.log("created end");

    this.$router.push({ name: "home" });
  }
}
</script>

<style lang="scss" scoped>
</style>
