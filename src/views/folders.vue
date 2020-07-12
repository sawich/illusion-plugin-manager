<template>
  <section class="folders">
    <h2>Folders</h2>
    <div class="description">Add games path here</div>
    <div class="games">
      <div class="game" v-for="game of games.values" :key="game.id">
        {{ $t("game.names")[game.id] }}
        <div class="detail">
          &nbsp;—&nbsp;
          <div
            class="path"
            contenteditable="true"
            @keydown.esc="$event.target.blur"
            @keydown.enter.prevent=""
          >
            {{ game.path }}
          </div>
        </div>
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
@import "@/common.scss";

.folders {
  padding: 20px;
}

.description {
  color: var(--font-detail-color);
  margin-bottom: 20px;
}

.detail {
  display: inline;
  color: var(--font-detail-color);
  font-style: italic;
}

.path {
  display: inline-block;
  padding: 4px 8px;

  color: var(--font-detail-color);
  transition: var(--animation-long-time) var(--animation-function);

  &:hover,
  &:focus {
    outline: none;

    color: var(--games-list-bg-hover-color);
    background-color: var(--font-color);
    transition: var(--animation-short-time) var(--animation-function);
  }
}
</style>
