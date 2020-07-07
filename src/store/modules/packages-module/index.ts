import { createModule, action, mutation } from "vuex-class-component";
import { Vue } from "vue-property-decorator";

import { PluginGame, Package, IPackage } from "./types";
import { games } from "@/store";
import { Game } from "../games-module/types";

const VuexModule = createModule({ namespaced: "packages", strict: false });

export interface IPackages {
  [key: string]: Package;
}

export class PackagesModule extends VuexModule {
  // @action
  // async get(info: { game: PluginGame; uuid: string }) {
  //   return this._entries[info.game][info.uuid];
  // }

  @action
  async list(game: PluginGame) {
    return this._entries[game] || {};
  }

  @action
  async load() {
    for (const game of games.list) {
      const packages = await fetch(game.packagesUrl);
      const datas = (await packages.json()) as IPackage[];
      this.add({ game, packages: datas });
    }
  }

  @mutation
  private add(info: { game: Game; packages: IPackage[] }) {
    const packages: IPackages = {};

    for (const p of info.packages) {
      packages[p.uuid] = new Package({ package: p, game: info.game });
    }

    Vue.set(this._entries, info.game.id, packages);
  }

  private _entries: { [key: number]: IPackages } = {};
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
