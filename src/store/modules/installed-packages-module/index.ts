import { createModule, action } from "vuex-class-component";
import { PluginGame } from "../packages-module/types";
import { Game } from "../games-module/types";
import { promises as fs } from "fs";
import { games } from "@/store";
import { resolve } from "path";

const readFile = fs.readFile;

const VuexModule = createModule({ namespaced: "installed-packages", strict: false });

export interface IInstaledPackage {
  uuid: string;
  version: string;
  files: string[];
}

class InstaledPackage {
  get uuid() {
    return this._uuid;
  }

  get version() {
    return this._version;
  }

  get files() {
    return this._files;
  }

  async remove() {}

  constructor(data: IInstaledPackage) {
    this._uuid = data.uuid;
    this._version = data.version;
    this._files = data.files;
  }

  private _uuid: string;
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
      const packages = JSON.parse(await this.getData(game)) as IInstaledPackage[];
      this._plugins.set(
        game.id,
        packages.map((p) => new InstaledPackage(p))
      );
    }
  }

  private async getData(game: Game) {
    try {
      return await readFile(resolve(game.path, "angel.packages.json"), "utf-8");
    } catch {
      return "[]";
    }
  }

  private _plugins = new Map<PluginGame, InstaledPackage[]>();
}
