import { createModule, mutation, action } from "vuex-class-component";
import { promises as fs } from "fs";
const readFile = fs.readFile;

const VuexModule = createModule({ namespaced: "installed-plugins", strict: false });

export class InstalledPluginsModule extends VuexModule {
  //   public get plugins() {
  // return this._plugins;
  //   }

  @action
  private async load() {
    const data = await readFile(`${__userdata}/plugins.json`, "utf-8");
    // const path = `Y:\\Users\\sawic\\source\\repos\\ill\\angel-package-generator\\test.angel.json`;
    // const plugins: IPluginRaw[] = JSON.parse(await readFile(path, "utf-8"));
    // for (const plugin of plugins) {
    //     this.context.commit("add", plugin);
    // }
  }

  @mutation
  private add() {}

  private _plugins = new Map();
  //   _plugins = Array.from<Plugin, Plugin[]>(Array(Object.keys(PluginGame).length), () => []);
}
