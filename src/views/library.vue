<template>
  <div class="plugins">
    <div class="plugin">
      <template v-for="p of packages">
        <!-- <div
          class="button installing-button"
          :key="`button-installing-${p.uuid}`"
          v-if="`${p.uuid}-id-${$route.query.game}` in tasksTasks"
        >
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.installing`) }}
        </div> -->

        <div
          class="installing"
          :key="`text-installing-${p.uuid}`"
          v-if="installing(p)"
        >
          installing
        </div>

        <div
          class="installed"
          :key="`text-installed-${p.uuid}`"
          v-else-if="installed(p)"
        >
          installed
        </div>

        <div
          class="button install-button"
          @click="() => p.install()"
          :key="`button-install-${p.uuid}`"
          v-else
        >
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.install`) }}
        </div>
        <div class="plugin-text" :key="`text-${p.uuid}`">
          <div class="name">
            {{ $t("plugins.items")[p.lang].name }}
          </div>
          <div class="description">
            &nbsp;—&nbsp;{{ $t("plugins.items")[p.lang].description }}
          </div>
        </div>
      </template>
    </div>
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
    InstallIcon: () => import("vue-material-design-icons/InboxArrowDown.vue")
  }
})
export default class Library extends Vue {
  game: Game | null = null;
  packages: IPackages = {};

  installing(p: Package) {
    const task = tasks.entries[p.uuid];
    return p.uuid in tasks.entries;
  }

  installed(p: Package) {
    return this.game !== null && this.game.has(p.uuid);
  }

  @Watch("$route")
  async onRouteChange() {
    this.init();
  }

  async created() {
    this.init();
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

.plugin {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 10px;
}

.button {
  justify-self: end;
  cursor: pointer;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 4px;
  padding: 0px 4px;
}

.install-button {
  color: var(--library-install-button-color);
  background-color: var(--font-color);
  transition: color var(--animation-long-time) var(--animation-function),
    background-color var(--animation-long-time) var(--animation-function);

  &:hover {
    color: var(--font-color);
    background-color: var(--library-install-button-color);
    transition: color var(--animation-very-short-time) var(--animation-function),
      background-color var(--animation-very-short-time)
        var(--animation-function);
  }
}

.installing-button {
  cursor: default;
}

.icon {
  align-self: center;
  display: flex;
}

.name,
.description {
  display: inline;
}

.description {
  color: var(--font-detail-color);
  font-style: italic;
}
</style>
