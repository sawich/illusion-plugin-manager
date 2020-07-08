import { readFile } from "fs/promises";
import { join } from "path";
import { action, createModule } from "vuex-class-component";

import { games } from "@/store";

import { Game, IInstalledPackage } from "../games-module/types";
import { PluginGame } from "../packages-module/types";

const VuexModule = createModule({
  namespaced: "installed-packages",
  strict: false
});

class InstaledPackage {
  get version() {
    return this._version;
  }

  get files() {
    return this._files;
  }

  constructor(data: IInstalledPackage) {
    this._version = data.version;
    this._files = data.files;
  }

  private _version: string;
  private _files: string[];
}

export class InstalledPackagesModule extends VuexModule {
  get(game: PluginGame) {
    return this._plugins.get(game);
  }

  @action
  async load() {
    for (const game of games.list) {
      const packages = JSON.parse(
        await this.getData(game)
      ) as IInstalledPackage[];
      this._plugins.set(
        game.id,
        packages.map(p => new InstaledPackage(p))
      );
    }
  }

  private async getData(game: Game) {
    try {
      return await readFile(join(game.path, "angel.packages.json"), "utf-8");
    } catch {
      return "[]";
    }
  }

  private _plugins = new Map<PluginGame, InstaledPackage[]>();
}
