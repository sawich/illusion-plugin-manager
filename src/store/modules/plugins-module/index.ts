import { createModule, mutation, action } from "vuex-class-component";
import { IPluginRaw } from "./types";

import { promises as fs } from "fs";
import { Plugin } from "./core/plugin";
const readFile = fs.readFile;

const VuexModule = createModule({ namespaced: "plugins", strict: false });

export class PluginsModule extends VuexModule {
  public get plugins() {
    return this._plugins;
  }

  @action
  public async load() {
    // const data = await fs.readFile(`${__cache}/angel-package.json`, "utf-8");
    const path = `Y:\\Users\\sawic\\source\\repos\\ill\\illusion-plugin-generator\\test.angel.json`;
    const raws: IPluginRaw[] = JSON.parse(await readFile(path, "utf-8"));
    for (const raw of raws) {
      this.$store.commit("add", raw);
    }
  }

  @mutation
  private add(raw: IPluginRaw) {
    const plugin = new Plugin(raw, this._plugins);
    this._plugins.push(plugin);
  }

  private _plugins: Plugin[] = [];
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
