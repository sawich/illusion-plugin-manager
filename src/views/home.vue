<template>
  <section class="home">
    <div class="games">
      <router-link
        class="game"
        v-for="(name, id) in $t('game.names')"
        :key="`info-${name}`"
        :to="{ name: 'library', query: { game: id } }"
      >
        <div
          class="icon"
          :style="{ backgroundImage: `url(${fullIconPath(id)})` }"
        />
        {{ name }}
      </router-link>
    </div>
    <router-view class="router-content" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PluginGame } from "@/store/modules/packages-module/types";
import { fullGameIconPath, GameIconSize } from "@/helpers/game-icon-helper";

@Component({ components: {} })
export default class Home extends Vue {
  fullIconPath(game: PluginGame) {
    return fullGameIconPath(game, GameIconSize.s16);
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
}

.games {
  background-color: var(--games-list-bg-color);
  position: sticky;
  top: 0;
}

.game {
  padding: 4px 20px;
  cursor: pointer;
  text-decoration: none;

  display: grid;
  grid-template-columns: 16px 1fr;
  align-items: center;
  gap: 10px;

  color: var(--font-color);
  transition: color var(--animation-long-time) var(--animation-function),
    background-color var(--animation-long-time) var(--animation-function);
}

.icon {
  width: 16px;
  height: 16px;
}

.game:hover,
.router-link-exact-active {
  color: var(--games-list-bg-hover-color);
  background-color: var(--font-color);
  // color: var(--link-hover-color);
  // background-color: var(--games-list-bg-hover-color);
  transition: var(--animation-short-time) var(--animation-function);
}

.router-link-exact-active {
  cursor: default;
}

.router-content {
  overflow-y: auto;
}
</style>
