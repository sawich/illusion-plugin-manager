<template>
  <div class="library">
    <header>Packages</header>
    <div class="description">
      Manage packages for
      <template v-if="game !== null">{{ $t("game.names")[game.id] }}</template>
    </div>

    <template v-if="game !== null">
      <package-component
        v-for="p of packages"
        :key="p.uuid"
        :p="p"
        :game="game"
      />
    </template>
    <div class="folders" v-else>
      Select installed game or specify a folder path
      <router-link :to="{ name: 'folders' }">here</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { packages, games } from "../store";
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
.library {
  padding: 20px;
}

header {
  font-size: 2rem;
}

.description {
  color: var(--font-detail-color);
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #00bfff;
  transition: var(--animation-long-time) var(--animation-function);

  &:hover {
    color: var(--link-hover-color);
    transition-duration: var(--animation-short-time);
  }
}
</style>
