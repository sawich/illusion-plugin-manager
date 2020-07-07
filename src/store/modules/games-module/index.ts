import { createModule, mutation, action } from "vuex-class-component";
import { PluginGame } from "../packages-module/types";
import { Game, KoikatsuGame, IGameInfo } from "./types";

import { readFile } from "fs/promises";

const VuexModule = createModule({ namespaced: "games", strict: false });

export class GamesModule extends VuexModule {
  /**
   * Getters
   */

  get list() {
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
      switch (info.game) {
        case PluginGame.Koikatsu:
          this.add(new KoikatsuGame(info));
          break;

        case PluginGame.PlayHome:
        case PluginGame.HoneySelect1:
        case PluginGame.AIShoujo:
        case PluginGame.HoneySelect2:
        default:
          break;
      }
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
   * Statics
   */

  private static async readData() {
    try {
      return await readFile(`${__userdata}/games.json`, "utf-8");
    } catch {
      return "[]";
    }
  }

  private static async getData() {
    return JSON.parse(await GamesModule.readData()) as IGameInfo[];
  }

  /**
   * Data
   */

  _games = new Map<PluginGame, Game>();
}
