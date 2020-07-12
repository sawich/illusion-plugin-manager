<template>
  <div class="plugin">
    <div class="plugin-text">
      <div class="name">
        {{ $t("plugins.items")[p.lang].name }}
      </div>
      <div class="description">
        &nbsp;—&nbsp;{{ $t("plugins.items")[p.lang].description }}
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbar-content">
        <div class="installing" v-if="installing(p)">
          installing
        </div>

        <div class="installed" v-else-if="installed(p)">
          installed
        </div>

        <div class="button install-button" @click="() => p.install()" v-else>
          <install-icon :size="16" class="icon install-icon" />
          {{ $t(`plugins.install`) }}
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

@Component({
  components: {
    InstallIcon: () => import("vue-material-design-icons/InboxArrowDown.vue")
  }
})
export default class PackageComponent extends Vue {
  @Prop({ required: true }) game!: Game | null;

  @Prop({ required: true }) p!: Package;

  installing(p: Package) {
    const task = tasks.entries[p.uuid];
    return p.uuid in tasks.entries;
  }

  installed(p: Package) {
    return this.game !== null && this.game.has(p.uuid);
  }
}
</script>

<style lang="scss" scoped>
$padding: 10px;
$pagePadding: 20px;

.plugin {
  position: relative;
  padding: $padding;
  border-left: 1px solid rgba(7, 202, 0, 0.4);

  &:hover {
    .plugin-text {
      transition: filter var(--animation-short-time) var(--animation-function);
      filter: blur(6px);
    }
  }
}

.plugin-text {
  transition: filter var(--animation-long-time) var(--animation-function);
}

.toolbar {
  border-left: 1px solid #00bfff;
  position: absolute;
  top: 0;
  left: -1px;
  width: 100%;
  height: 100%;
  filter: none;
  user-select: unset;
  display: grid;
  align-content: center;
  opacity: 0;
  transition: text-shadow var(--animation-long-time) var(--animation-function),
    opacity var(--animation-long-time) var(--animation-function);

  &:hover {
    opacity: 1;
    transition: opacity var(--animation-short-time) var(--animation-function);

    .toolbar-content {
      opacity: 1;
      text-shadow: 0 0 (10px / 2) var(--font-color),
        0 0 (20px / 2) var(--font-color), 0 0 (30px / 2) #00bfff,
        0 0 (40px / 2) #00bfff, 0 0 (50px / 2) #00bfff, 0 0 (60px / 2) #00bfff,
        0 0 (70px / 2) #00bfff;

      transition: opacity var(--animation-short-time) var(--animation-function)
          var(--animation-short-time),
        text-shadow var(--animation-short-time) var(--animation-function)
          var(--animation-short-time);
    }
  }
}

.toolbar-content {
  padding: 0 10px;

  opacity: 0;
  transition: text-shadow var(--animation-long-time) var(--animation-function),
    opacity var(--animation-long-time) var(--animation-function);
}

.install {
  cursor: pointer;
  display: inline-block;
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
