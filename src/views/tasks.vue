<template>
  <section class="tasks">
    <div class="items">
      <template v-for="task in tasks">
        <div
          class="icon"
          :key="`${task.id}-icon`"
          :style="{ backgroundImage: `url(${fullIconPath(task.game)})` }"
        />

        {{ task.id }}

        <!-- <div class="id">{{ task.id }}</div> -->
      </template>
    </div>
    Tasks
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
    return fullGameIconPath(game, GameIconSize.s24);
  }
}
</script>

<style lang="scss" scoped>
@import "@/common.scss";

.tasks {
  padding: 20px;
}

.items {
}

.install-button {
  cursor: pointer;
  display: inline-grid;
  align-items: center;
  grid-template-columns: 24px 1fr;
  gap: 4px;
  padding: 0px 4px;
  border-radius: 3px;
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
