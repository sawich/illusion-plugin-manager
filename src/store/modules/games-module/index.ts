import { readFile } from "fs/promises";
import { join } from "path";
import { Vue } from "vue-property-decorator";
import { action, createModule, mutation } from "vuex-class-component";

import { vue } from "@/main";

import { PackageBuilder } from "../installer-packages-module/types/core/installer";
import { PluginGame } from "../packages-module/types";
import { Game, IGameInfo, IInstalledPackages, InstalledPackage } from "./types";

const VuexModule = createModule({ namespaced: "games", strict: false });

export class GamesModule extends VuexModule {
  /**
   * Getters
   */

  get values() {
    return Object.values(this._games);
  }

  @action async get(id: PluginGame) {
    return this._games[id] || null;
  }

  /**
   * Actions
   */

  @action async load() {
    const installedGames = await GamesModule.getGamesData();

    for (const installedGame of installedGames) {
      const packages = await GamesModule.getPackagesData(installedGame.path);
      const gameBaseInfo = await fetch(`${__api}/games/${installedGame.game}`);

      this.add(
        new Game({
          ...installedGame,
          info: await gameBaseInfo.json(),
          packages
        })
      );
    }
  }

  /**
   * Mutations
   */

  @mutation addPackage(info: { builder: PackageBuilder; game: Game }) {
    const p = new InstalledPackage({
      uuid: info.builder.package.uuidEntity,
      version: info.builder.version,
      files: info.builder.files,
      disabled: false,
      game: info.game
    });

    vue.$set(info.game.packages, info.builder.package.uuid, p);
  }

  @mutation add(game: Game) {
    vue.$set(this._games, game.id, game);
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

  private _games: { [key: number]: Game } = {};
}
