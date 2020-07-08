import { readFile } from "fs/promises";
import { join } from "path";
import { action, createModule, mutation } from "vuex-class-component";

import { PluginGame } from "../packages-module/types";
import { Game, IGameInfo, IInstalledPackage, IInstalledPackages, KoikatsuGame } from "./types";

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
    const data = await GamesModule.getGamesData();
    for (const info of data) {
      const packages = await GamesModule.getPackagesData(info.path);

      switch (info.game) {
        case PluginGame.Koikatsu:
          this.add(new KoikatsuGame({ ...info, packages }));
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

  private static async readPackages(path: string) {
    try {
      return await readFile(join(path, "angel.packages.json"), "utf-8");
    } catch {
      return "[]";
    }
  }

  private static async readGames() {
    try {
      return await readFile(join(__userdata, "games.json"), "utf-8");
    } catch {
      return "[]";
    }
  }

  private static async getPackagesData(path: string) {
    return JSON.parse(
      await GamesModule.readPackages(path)
    ) as IInstalledPackages;
  }

  private static async getGamesData() {
    return JSON.parse(await GamesModule.readGames()) as IGameInfo[];
  }

  /**
   * Data
   */

  _games = new Map<PluginGame, Game>();
}
