import { createModule, mutation, action } from "vuex-class-component";
import { InstalledGame, IInstalledGame } from "./types";

import { promises as fs } from "fs";
import { PluginGame } from "../plugins-module/types";
const readFile = fs.readFile;

const VuexModule = createModule({ namespaced: "installed-games", strict: false });

export class InstalledGamesModule extends VuexModule {
  /**
   * Getters
   */

  public get games() {
    return this._games.values();
  }

  public get(id: PluginGame) {
    return this._games.get(id);
  }

  /**
   * Actions
   */

  @action
  public async load() {
    const data = await InstalledGamesModule.getData();
    for (const info of data) {
      this.add(new InstalledGame(info.id, info.path));
    }
  }

  /**
   * Mutations
   */

  @mutation
  public add(game: InstalledGame) {
    this._games.set(game.id, game);
  }

  /**
   * Static
   */

  private static async getData() {
    try {
      return JSON.parse(await readFile(`${__userdata}/games.json`, "utf-8")) as IInstalledGame[];
    } catch {
      return [];
    }
  }

  /**
   * Data
   */

  _games = new Map<number, InstalledGame>();
}
