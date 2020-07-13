import { vue } from "@/main";
import { action } from "vuex-class-component";
import { Game } from "../games-module/types";
import { AvailablePackage, IPackage } from "./types";

export class PackagesModule {
  @action async list(game: Game) {
    return this.#entries[game.id];
  }

  @action async add(game: Game) {

    const fetched = await fetch(`${__api}/packages/${game.id}`);
    const packages = (await fetched.json()) as IPackage[];

    vue.$set(this.#entries, game.id, packages.filter(p => !game.has(p.uuid)).map(p => new AvailablePackage(p)));
  }

  constructor() {
    this.#entries = {};
  }

  #entries: { [key: number]: { [key: string]: AvailablePackage };
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
