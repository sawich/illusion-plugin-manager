import { createModule, mutation, action } from "vuex-class-component";
import { Game, IInstalledGame } from "./types";

import { promises as fs } from "fs";
import { PluginGame } from "../plugins-module/types";
const readFile = fs.readFile;

const VuexModule = createModule({ namespaced: "games", strict: false });

interface IGames {
  [key: PluginGame]: Game;
}

export class GamesModule extends VuexModule {
  /**
   * Getters
   */

  get games() {
    return this._games.values();
  }

  get(id: PluginGame) {
    return this._games.get(id);
  }

  /**
   * Actions
   */

  @action
  async load() {
    const data = await GamesModule.getData();
    for (const info of data) {
      this.add(new Game(info.id, info.path));
    }
  }

  /**
   * Mutations
   */

  @mutation
  add(game: Game) {
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

  _games = new Map<number, Game>();
}
