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
      <div class="toolbar-content">
        <template v-if="installed">
          <div class="button" @click="toggle">
            <install-icon :size="16" class="icon install-icon" />
            <template v-if="disabled">
              {{ $t("plugins.enable") }}
            </template>
            <template v-else>
              {{ $t("plugins.disable") }}
            </template>
          </div>
          <div class="button button-uninstall" @click="uninstall">
            <install-icon :size="16" class="icon install-icon" />
            {{ $t("plugins.uninstall") }}
          </div>
        </template>

        <div class="button" @click="install" v-else>
          <install-icon :size="16" class="icon install-icon" />
          {{ $t("plugins.install") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Package } from "@/store/modules/packages-module/types";
import { tasks } from "../store";
import { Game } from "../store/modules/games-module/types";
import { togglePackage } from "@/helpers/packages/toggle-package";
import { installPackage } from "@/helpers/packages/install-package";
import { uninstallPackage } from "@/helpers/packages/uninstall-package";

@Component({
  components: {
    InstallIcon: () => import("vue-material-design-icons/InboxArrowDown.vue")
  }
})
export default class PackageComponent extends Vue {
  @Prop({ required: true }) game!: Game;
  @Prop({ required: true }) p!: Package;

  async install() {
    installPackage(this.p);
  }

  async uninstall() {
    const installed = this.game.package(this.p.uuid);
    uninstallPackage(installed);
  }

  async toggle() {
    const installed = this.game.package(this.p.uuid);
    togglePackage(installed);
  }

  get disabled() {
    const installed = this.game.package(this.p.uuid);
    return installed && installed.disabled;
  }

  get installing() {
    const task = tasks.entries[this.p.uuid];
    return this.p.uuid in tasks.entries;
  }

  get installed() {
    return this.game.has(this.p.uuid);
  }
}
</script>

<style lang="scss" scoped>
$padding: 10px;

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
  user-select: unset;
  display: grid;
  align-content: end;

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
  padding: $padding;

  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: $padding;
  opacity: 0;
  transition: var(--animation-long-time) var(--animation-function);
}

.button {
  cursor: pointer;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 4px;

  padding: 4px 8px;

  color: var(--font-color);
  transition: var(--animation-long-time) var(--animation-function);

  &:hover {
    color: var(--games-list-bg-hover-color);
    background-color: var(--font-color);
    transition: var(--animation-short-time) var(--animation-function);
  }
}

.button-uninstall {
  color: var(--red);

  &:hover {
    color: var(--font-color);
    background-color: var(--red);
  }
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
