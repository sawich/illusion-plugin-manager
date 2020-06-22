<template>
  <section class="library">
    <!-- <div class="categories">
      <div class="category">plugins</div>
      <div class="category">mods</div>
      <div class="category">cards</div>
    </div>-->
    <div class="plugins">
      <div class="plugin">
        <template v-for="plugin of plugins">
          <div
            class="button installing-button"
            :key="`button-installing-${plugin.id}`"
            v-if="`${plugin.id}-id-${$route.query.game}` in tasksTasks"
          >
            <install-icon :size="16" class="icon install-icon" />
            {{ $t(`plugins.installing`) }}
          </div>
          <div
            class="button install-button"
            @click="install($route.query.game, plugin)"
            :key="`button-install-${plugin.id}`"
            v-else
          >
            <install-icon :size="16" class="icon install-icon" />
            {{ $t(`plugins.install`) }}
          </div>
          <div class="plugin-text" :key="`text-${plugin.id}`">
            <div class="name">
              {{ $t(`plugins.items.${plugin.lang}.name`) }}
            </div>
            <div class="desc">
              &nbsp;—&nbsp;{{ $t("plugins.items")[plugin.lang].desc }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="tasks">
      <div class="task" v-for="task in tasksTasks" :key="task.id">
        {{ task.id }} {{ task.plugin.id }}
        {{ $t(`plugins.items.${task.plugin.lang}.name`) }}
      </div>
    </div>
  </section>
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

.library {
  padding: 20px;
}

.categories {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 20px;
  padding: 6px 8px;
  border-radius: 3px;
  font-weight: bold;

  background-color: #292d33;
}

.category {
  cursor: pointer;
  border-radius: 3px;
  padding: 4px 8px;
  transition: color $animationLongTime $animationFunction,
    background-color $animationLongTime $animationFunction;

  &:hover {
    color: #dbe6f1;
    background-color: #474f5c;
    transition: color $animationVeryShortTime $animationFunction,
      background-color $animationVeryShortTime $animationFunction;
  }
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
  border-radius: 3px;
}

.install-button {
  color: var(--header-link-bg-hover-color);
  background-color: var(--font-color);
  transition: color $animationLongTime $animationFunction,
    background-color $animationLongTime $animationFunction;

  &:hover {
    color: unset;
    background-color: var(--header-link-bg-hover-color);
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
.desc {
  display: inline;
}

.desc {
  color: var(--font-detail-color);
  font-style: italic;
}
</style>
