<template>
  <section class="tasks">
    <div class="items">
      <div class="item" v-for="task in tasks" :key="`${task.id}-item`">
        <div
          class="icon"
          :style="{ backgroundImage: `url(${fullIconPath(task.game)})` }"
        />
        <div class="detail" :key="`${task.id}-detail`">
          <div class="name">
            {{ $t("game.names")[task.game] }}
          </div>
          <div class="status">
            {{ $t("tasks.status")[task.status] }}
          </div>

          <!-- <div class="id">{{ task.id }}</div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PluginGame } from "@/store/modules/plugins-module/types";
import { fullGameIconPath, GameIconSize } from "@/helpers/game-icon-helper";

import { namespace } from "vuex-class";
const tasks = namespace("tasks");

@Component({ components: {} })
export default class Tasks extends Vue {
  @tasks.Getter("tasks")
  private tasks!: any;

  fullIconPath(game: PluginGame) {
    return fullGameIconPath(game, GameIconSize.s48);
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

.icon {
  width: 48px;
  height: 48px;
}

.status {
  color: var(--font-detail-color);
}
</style>
