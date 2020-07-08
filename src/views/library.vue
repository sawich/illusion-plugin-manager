<template>
  <div class="plugins">
    <div class="plugin">
      <template v-for="p of list">
        <!-- <div
          class="button installing-button"
          :key="`button-installing-${p.uuid}`"
          v-if="`${p.uuid}-id-${$route.query.game}` in tasksTasks"
        >
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.installing`) }}
        </div> -->
        <div
          class="button install-button"
          @click="() => p.install()"
          :key="`button-install-${p.uuid}`"
        >
          <!-- v-else -->
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.install`) }}
        </div>
        <div class="plugin-text" :key="`text-${p.uuid}`">
          <div class="name">
            {{ $t("plugins.items")[p.lang].name }}
          </div>
          <div class="description">
            &nbsp;—&nbsp;{{ $t("plugins.items")[p.lang].description }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PluginGame, Package } from "@/store/modules/packages-module/types";
import { ITasks } from "../store/modules/tasks-module/types";
import { packages } from "../store";
import { IPackages } from "../store/modules/packages-module";

@Component({
  components: {
    InstallIcon: () => import("vue-material-design-icons/InboxArrowDown.vue")
  }
})
export default class Game extends Vue {
  list: IPackages = {};

  @Watch("$route")
  async onRouteChange() {
    this.init();
  }

  async created() {
    this.init();
  }

  private async init() {
    const game = Number(this.$route.query.game);
    this.list = await packages.list(game);
  }
}
</script>

<style lang="scss" scoped>
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
  transition: color var(--animation-long-time) var(--animation-function),
    background-color var(--animation-long-time) var(--animation-function);

  &:hover {
    color: var(--font-color);
    background-color: var(--library-install-button-color);
    transition: color var(--animation-very-short-time) var(--animation-function),
      background-color var(--animation-very-short-time)
        var(--animation-function);
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
