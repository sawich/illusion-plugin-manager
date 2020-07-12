<template>
  <div class="plugins" v-if="game !== null">
    <package-component
      v-for="p of packages"
      :key="p.uuid"
      :p="p"
      :game="game"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PluginGame, Package } from "@/store/modules/packages-module/types";
import { ITasks } from "../store/modules/tasks-module/types";
import { packages, games, tasks } from "../store";
import { IPackages } from "../store/modules/packages-module";
import { Game } from "../store/modules/games-module/types";

@Component({
  components: {
    PackageComponent: () => import("@/components/package.vue")
  }
})
export default class Library extends Vue {
  game: Game | null = null;
  packages: IPackages = {};

  @Watch("$route")
  async onRouteChange() {
    await this.init();
  }

  async created() {
    await this.init();
  }

  private async init() {
    const id = Number(this.$route.query.game);
    this.game = await games.get(id);
    this.packages = await packages.list(id);
  }
}
</script>

<style lang="scss" scoped>
.plugins {
  padding: 20px;
}
</style>
