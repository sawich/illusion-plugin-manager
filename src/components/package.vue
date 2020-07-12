<template>
  <div
    :class="[
      'plugin',
      {
        'plugin-installing': installing,
        'plugin-installed': installed,
        'plugin-disabled': disabled
      }
    ]"
  >
    <div class="plugin-text">
      <div class="name">
        {{ $t("plugins.items")[p.lang].name }}
      </div>
      <div class="description">
        &nbsp;—&nbsp;{{ $t("plugins.items")[p.lang].description }}
      </div>
    </div>

    <div class="toolbar" v-if="installing == false">
      <template class="installed">
        <div class="toolbar-content">
          <div class="installed" v-if="installed">
            uninstall
          </div>

          <div class="button install-button" @click="() => p.install()" v-else>
            <install-icon :size="16" class="icon install-icon" />
            {{ $t(`plugins.install`) }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Package } from "@/store/modules/packages-module/types";
import { tasks } from "../store";
import { Game } from "../store/modules/games-module/types";

@Component({
  components: {
    InstallIcon: () => import("vue-material-design-icons/InboxArrowDown.vue")
  }
})
export default class PackageComponent extends Vue {
  @Prop({ required: true }) game!: Game;

  @Prop({ required: true }) p!: Package;

  get disabled() {
    const p = this.game.package(this.p.uuid);
    return p && p.disabled;
  }

  get installing() {
    const task = tasks.entries[this.p.uuid];
    return this.p.uuid in tasks.entries;
  }

  get installed() {
    const has = this.game.has(this.p.uuid);
    console.log(`has: ${has}`);

    return has;
  }
}
</script>

<style lang="scss" scoped>
$padding: 10px;
$pagePadding: 20px;

.plugin {
  position: relative;
  padding: $padding;
  border-left: 1px solid transparent;

  transition: var(--animation-short-time) var(--animation-function);

  &:hover {
    transition: var(--animation-long-time) var(--animation-function);

    .plugin-text {
      transition: var(--animation-short-time) var(--animation-function);
      filter: blur(6px);
    }
  }
}

.plugin-text {
  transition: var(--animation-long-time) var(--animation-function);
}

.plugin-disabled {
  opacity: 0.4;
  text-decoration: line-through;
  border-color: transparent;

  &:hover {
    opacity: 1;
  }
}

.plugin-installing {
  color: #00bfff;

  &:hover {
    transition: var(--animation-short-time) var(--animation-function);
  }

  .plugin-text {
    filter: unset !important;
  }
}

.plugin-installed {
  border-color: rgba(7, 202, 0, 0.4);
}

.toolbar {
  border-left: 1px solid #00bfff;
  position: absolute;
  top: 0;
  left: -1px;
  width: calc(100% + 1px);
  height: 100%;
  filter: none;
  user-select: unset;
  display: grid;
  align-content: center;
  opacity: 0;
  transition: var(--animation-long-time) var(--animation-function);

  &:hover {
    opacity: 1;
    transition: var(--animation-short-time) var(--animation-function);

    .toolbar-content {
      opacity: 1;

      transition: var(--animation-short-time) var(--animation-function);
    }
  }
}

.toolbar-content {
  padding: 0 10px;

  opacity: 0;
  transition: var(--animation-long-time) var(--animation-function);
}

.button {
  justify-self: end;
  cursor: pointer;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 4px;
  padding: 0px 4px;
}

.install-button {
  display: inline-grid;
  color: var(--font-color);

  $color: var(--bg-color);
  text-shadow: 0 0 2px var(--font-color), 0 0 4px $color, 0 0 6px $color;
  transition: var(--animation-long-time) var(--animation-function);

  &:hover {
    text-shadow: unset;
    color: var(--games-list-bg-hover-color);
    background-color: var(--font-color);
    transition: var(--animation-short-time) var(--animation-function);
  }
}

.installing-button {
  cursor: default;
}

.icon {
  align-self: center;
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
