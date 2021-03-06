<template>
  <header class="header">
    <div class="title">
      <router-link
        class="link header-active-item header-row header-row-texts"
        :to="{ name: 'home' }"
        v-text="'Library'"
      />
    </div>
    <div class="header-row">
      <!-- <router-link
        class="link-icon-only header-active-item header-row"
        :to="{ name: 'settings' }"
      >
        <settings-icon class="icon user-icon" :size="16" />
      </router-link> -->
      <router-link
        class="link-icon-only header-active-item header-row"
        :to="{ name: 'folders' }"
      >
        <folders-icon class="icon user-icon" :size="16" />
      </router-link>
      <router-link
        class="link-icon-only header-active-item header-row icon-tasks"
        :to="{ name: 'tasks' }"
      >
        <tasks-icon class="icon user-icon" :size="16" />
        <div class="icon-have-tasks" v-if="Object.keys(entries).length > 0" />
      </router-link>
    </div>
    <div class="header-row">
      <minimize-icon
        class="icon header-active-item window-control-icon"
        :size="16"
        @click="minimize"
      />
      <!-- <unmaximize-icon
        class="icon header-active-item window-control-icon"
        :size="16"
        @click="unmaximize"
        v-if="windowState == 1"
      />
      <maximize-icon
        class="icon header-active-item window-control-icon"
        :size="16"
        @click="maximize"
        v-if="windowState == 0"
      /> -->
      <close-icon
        class="icon header-active-item window-control-icon"
        :size="16"
        @click="close"
      />
    </div>
  </header>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITasks } from "@/store/modules/tasks-module/types";

import { namespace } from "vuex-class";
import { tasks } from '@/store';

@Component({
  components: {
    // SettingsIcon: () => import("vue-material-design-icons/AccountConvert.vue"),
    // SettingsIcon: () => import("vue-material-design-icons/CogOutline.vue"),
    TasksIcon: () => import("vue-material-design-icons/ArrowCollapseDown.vue"),
    MinimizeIcon: () => import("vue-material-design-icons/WindowMinimize.vue"),
    // UnmaximizeIcon: () => import("vue-material-design-icons/WindowRestore.vue"),
    // MaximizeIcon: () => import("vue-material-design-icons/WindowMaximize.vue"),
    CloseIcon: () => import("vue-material-design-icons/WindowClose.vue"),
    FoldersIcon: () => import("vue-material-design-icons/FolderCog.vue")
  }
})
export default class Header extends Vue {
  entries = tasks.entries;

  private async minimize() {
    //@ts-ignore
    const window = nw.Window.get();
    window.minimize();
  }

  private async close() {
    //@ts-ignore
    const window = nw.Window.get();
    window.close();
  }

  private windowState = 0;
}
</script>

<style lang="scss" scoped>
@import "@/themes/raratina.scss";

.header {
  -webkit-app-region: drag;
  user-select: none;

  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;

  background-color: var(--header-bg-color);
}

.header-row {
  -webkit-app-region: no-drag;
  display: flex;
  flex-flow: row;
  height: 100%;
}

.header-row-texts {
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
}

.link,
.link-icon-only {
  border-bottom: 1px solid transparent;
  height: calc(100% - 1px);

  &:hover {
    border-bottom-color: var(--header-active-link-border-color);
  }
}

.link {
  text-decoration: unset;
  padding: 0 12px;
  font-weight: 600;
}

.icon {
  display: flex;
  align-items: center;
}

.window-control-icon {
  padding: 0 12px;
}

.user-icon {
  padding: 0 6px;
}

.icon-tasks {
  position: relative;
}

.icon-have-tasks {
  position: absolute;

  $size: 4px;
  width: $size;
  height: $size;

  background-color: var(--header-active-link-border-color);
  top: 10%;
  right: 10%;
  border-radius: 50%;
}

.header-active-item {
  color: var(--header-font-color);
  transition: color var(--animation-short-time) var(--animation-function),
    background-color var(--animation-short-time) var(--animation-function),
    border-bottom-color var(--animation-short-time) var(--animation-function);

  &:hover {
    transition: color var(--animation-very-short-time) var(--animation-function),
      background-color var(--animation-very-short-time)
        var(--animation-function),
      border-color var(--animation-very-short-time) var(--animation-function);
  }
}

.header-active-item:hover,
.router-link-active {
  color: unset;
  background-color: var(--header-link-bg-hover-color);
}

.router-link-active {
  cursor: default;
  border-bottom-color: var(--header-active-link-border-color);
}
</style>
