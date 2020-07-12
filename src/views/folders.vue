<template>
  <section class="folders">
    <header>Folders</header>
    <div class="description">Add games path here</div>
    <div class="games">
      <div class="game" v-for="game of games.values" :key="game.id">
        {{ $t("game.names")[game.id] }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { games } from "../store";

@Component({ components: {} })
export default class Folders extends Vue {
  get games() {
    return games;
  }
}
</script>

<style lang="scss" scoped>
.folders {
  padding: 20px;
}

header {
  font-size: 2rem;
}

.description {
  color: var(--font-detail-color);
  margin-bottom: 20px;
}
</style>
