import { Vue } from "vue-property-decorator";
import { action, createModule, mutation } from "vuex-class-component";

import { vue } from "@/main";
import { games } from "@/store";

import { Game } from "../games-module/types";
import { IPackage, Package, PluginGame } from "./types";

const VuexModule = createModule({ namespaced: "packages", strict: false });

export interface IPackages {
  [key: string]: Package;
}

export class PackagesModule extends VuexModule {
  @action async get(uuid: string) {
    return this._unordered[uuid];
  }

  @action async list(game: PluginGame) {
    return this._entries[game] || {};
  }

  @action async load() {
    for (const game of games.values) {
      const packages = await fetch(game.url);

      const datas = (await packages.json()) as IPackage[];
      this.seed({ game, packages: datas });
    }
  }

  @mutation private seed(info: { game: Game; packages: IPackage[] }) {
    const packages: IPackages = {};

    for (const p of info.packages) {
      const pack = new Package({ package: p, game: info.game });
      packages[p.uuid] = pack;
      vue.$set(this._unordered, p.uuid, pack);
    }

    vue.$set(this._entries, info.game.id, packages);
  }

  private _unordered: { [key: string]: Package } = {};
  private _entries: { [key: number]: IPackages } = {};
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
