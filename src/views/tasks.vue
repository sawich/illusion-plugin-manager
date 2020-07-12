<template>
  <section class="tasks">
    <div class="empty" v-if="Object.keys(entries).length == 0">
      {{ $t("tasks.empty") }}
    </div>
    <div class="items" v-else>
      <div
        class="item"
        v-for="task in entries"
        :key="`${task.package.uuidEntity}-item`"
      >
        <div
          class="game-icon"
          :style="{
            backgroundImage: `url(${gameFullIconPath(task.package.game.id)})`
          }"
        />
        <div class="detail">
          <header class="detail-header">
            <div class="game-name">
              {{ $t("game.names")[task.package.game.id] }}
            </div>
            <div class="plugin-name">
              {{ $t("plugins.items")[task.package.lang].name }}
            </div>
          </header>
          <div class="status">
            {{ $t("job.categories")[task.job.category] }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GameId } from "@/store/modules/packages-module/types";

import { namespace } from "vuex-class";
import { JobIcon, ITasks } from "../store/modules/tasks-module/types";
import { fullGameIconPath, GameIconSize } from "../helpers/game-icon-helper";
const tasks = namespace("tasks");

@Component({ components: {} })
export default class Tasks extends Vue {
  @tasks.Getter("entries")
  private entries!: ITasks;

  gameFullIconPath(game: GameId) {
    return fullGameIconPath(game, GameIconSize.s48);
  }
}
</script>

<style lang="scss" scoped>
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
