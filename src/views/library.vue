<template>
  <div class="plugins">
    <div class="plugin">
      <template v-for="plugin of plugins">
        <!-- <div
          class="button installing-button"
          :key="`button-installing-${plugin.id}`"
          v-if="`${plugin.id}-id-${$route.query.game}` in tasksTasks"
        >
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.installing`) }}
        </div> -->
        <div
          class="button install-button"
          @click="install($route.query.game, plugin)"
          :key="`button-install-${plugin.id}`"
        >
          <!-- v-else -->
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.install`) }}
        </div>
        <div class="plugin-text" :key="`text-${plugin.id}`">
          <div class="name">
            {{ $t("plugins.items")[plugin.lang].name }}
          </div>
          <div class="description">
            &nbsp;—&nbsp;{{ $t("plugins.items")[plugin.lang].description }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PluginGame } from "@/store/modules/plugins-module/types";
import { Plugin } from "@/store/modules/plugins-module/core/plugin";
import { ITasks } from "../store/modules/tasks-module/types";

import { namespace } from "vuex-class";
const plugins = namespace("plugins");
const cached = namespace("cached");
const tasks = namespace("tasks");
const vs = namespace("vs");

@Component({
  components: {
    InstallIcon: () => import("vue-material-design-icons/InboxArrowDown.vue")
  }
})
export default class Game extends Vue {
  @plugins.Getter("plugins")
  private pluginsPlugins!: Plugin[];

  @tasks.Getter("tasks")
  private tasksTasks!: ITasks;

  async install(game: PluginGame, plugin: Plugin) {
    await plugin.install(game);
    console.log(" - - - installed");
  }

  get plugins() {
    const game = Number(this.$route.query.game);
    return this.pluginsPlugins.filter(p => p.games.includes(game));
  }
}
</script>

<style lang="scss" scoped>
@import "@/common.scss";

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
  display: inline-grid;
  align-items: center;
  grid-template-columns: 16px 1fr;
  gap: 4px;
  padding: 0px 4px;
}

.install-button {
  color: var(--library-install-button-color);
  background-color: var(--font-color);
  transition: color $animationLongTime $animationFunction,
    background-color $animationLongTime $animationFunction;

  &:hover {
    color: var(--font-color);
    background-color: var(--library-install-button-color);
    transition: color $animationVeryShortTime $animationFunction,
      background-color $animationVeryShortTime $animationFunction;
  }
}

.installing-button {
  cursor: default;
}

.icon {
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
