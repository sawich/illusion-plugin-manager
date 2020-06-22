<template>
  <section class="library">
    <!-- <div class="categories">
      <div class="category">plugins</div>
      <div class="category">mods</div>
      <div class="category">cards</div>
    </div>-->
    <div class="plugins">
      <div class="plugin">
        <template v-for="plugin of plugins[$route.query.game]">
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
              &nbsp;—&nbsp;{{ $t(`plugins.items.${plugin.lang}.desc`) }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="tasks">
      {{ Object.keys(tasksTasks) }}
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

  async created() {
    const gameIds = Array.from(
      Array(Object.keys(PluginGame).length / 2),
      (e, i) => i
    );

    this.plugins = gameIds.map(gameId =>
      this.pluginsPlugins.filter(p => p.games.includes(Number(gameId)))
    );
  }

  plugins: Plugin[][] = [];

  // async addTask1() {
  //   await download(
  //     "https://dotnet.microsoft.com/download/dotnet-core/scripts/v1/dotnet-install.ps1",
  //     "BetterHScenes"
  //   );
  //   console.log("after download 1");
  // }

  // async addTask2() {
  //   await download(
  //     "https://github.com/git-for-windows/git/releases/download/v2.27.0.windows.1/Git-2.27.0-32-bit.exe",
  //     "BetterHScenes"
  //   );
  //   console.log("after download 2");
  // }

  // private async created() {
  // const x = fs
  //   .readFile(
  //     "L:\\[ScrewThisNoise] Koikatsu BetterRepack RX1\\package.json",
  //     "utf8"
  //   )
  //   .then(err => console.log(err));
  // console.log(x);
  // this.data = await readFile(
  // "L:\\[ScrewThisNoise] Koikatsu BetterRepack RX1\\package.json"
  // );
  // console.log(this.data);
  // const uri = `https://api.github.com/repos/${this.pluginSources[0].uri}/releases/latest`;
  // const f = await fetch(uri);
  // const j = await f.json();
  // for (const asset of j.assets) {
  //   if ((asset.name as string).toLowerCase().includes("koik")) {
  //     console.log(asset);
  //     break;
  //   }
  // }
  // }
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
