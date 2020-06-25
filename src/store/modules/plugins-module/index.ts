import { createModule, mutation, action } from "vuex-class-component";
import { Plugin } from "./core/plugin";
import { IPluginContainer, ContainerCategory, ContainerType } from "./types";
import { resolve } from "path";

import { promises as fs } from "fs";
const readFile = fs.readFile;

const VuexModule = createModule({ namespaced: "packages", strict: false });

export class Tool {}

export class PluginsModule extends VuexModule {
  get plugins() {
    return this._plugins;
  }

  get tools() {
    return this._tools;
  }

  @action
  async load() {
    const path = resolve(__static, "packages.json");
    const packages: IPluginContainer[] = JSON.parse(await readFile(path, "utf-8"));
    for (const packet of packages) {
      if (packet.category == ContainerCategory.Plugin) this.$store.commit("addPlugin", packet);
    }
  }

  @mutation
  private addPlugin(container: IPluginContainer) {
    if (container.type == ContainerType.Partial) {
    } else if (container.type == ContainerType.All) {
      this._plugins.push(new Plugin(container, this._plugins));
    }
  }

  private _plugins: Plugin[] = [];
  private _tools: Tool[] = [];
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
