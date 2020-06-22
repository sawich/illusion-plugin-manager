<template>
  <section class="tasks">
    <div class="items">
      <div class="item" v-for="task in tasks" :key="`${task.id}-item`">
        <div
          class="game-icon"
          :style="{ backgroundImage: `url(${gameFullIconPath(task.game)})` }"
        />
        <div class="detail" :key="`${task.id}-detail`">
          <header class="detail-header">
            <div class="game-name">
              {{ $t("game.names")[task.game] }}
            </div>
            <div class="plugin-name">
              {{ $t("plugins.items")[task.lang].name }}
            </div>
          </header>
          <div class="status">
            {{ $t("tasks.status")[task.status] }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PluginGame } from "@/store/modules/plugins-module/types";
import { fullGameIconPath, GameIconSize } from "@/helpers/game-icon-helper";
import { fullJobIconPath } from "@/helpers/job-icon-helper";

import { namespace } from "vuex-class";
import { JobIcon } from "../store/modules/tasks-module/types";
const tasks = namespace("tasks");

@Component({ components: {} })
export default class Tasks extends Vue {
  @tasks.Getter("tasks")
  private tasks!: any;

  gameFullIconPath(game: PluginGame) {
    return fullGameIconPath(game, GameIconSize.s48);
  }

  jobFullIconPath(icon: JobIcon) {
    return fullJobIconPath(icon);
  }
}
</script>

<style lang="scss" scoped>
@import "@/common.scss";

.tasks {
  padding: 20px;
}

.item {
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: var(--header-link-bg-hover-color);
  padding: 10px;
  gap: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.game-icon {
  width: 48px;
  height: 48px;
}

.detail-header {
  display: grid;
  grid-template-columns: 1fr auto;
}

.game-name {
  font-weight: 600;
}

.plugin-name {
  color: var(--font-detail-color);
}

.status {
  color: var(--font-detail-color);
  font-style: italic;
}
</style>
