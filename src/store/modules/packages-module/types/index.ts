import { installerPackages } from "@/store";

import { Game } from "../../games-module/types";

export const enum PluginGame {
  /** Play Home */
  PlayHome,

  /** Honey Select 1 */
  HoneySelect1,

  /** Koikatsu */
  Koikatsu,

  /** AI Shoujo */
  AIShoujo,

  /** Honey Select 2 */
  HoneySelect2,

  /** Emotion Creators */
  EmotionCreators
}

export interface IPackage {
  uuid: string;
  lang: string;
  uuidEntity: string;
}

export class Package {
  get uuid() {
    return this._uuid;
  }

  get lang() {
    return this._lang;
  }

  get uuidEntity() {
    return this._uuidentity;
  }

  get game() {
    return this._game;
  }

  get url() {
    return `${__api}/scripts/${this._uuid}`;
  }

  async install() {
    installerPackages.install(this);
  }

  constructor(info: { package: IPackage; game: Game }) {
    this._uuid = info.package.uuid;
    this._lang = info.package.lang;
    this._uuidentity = info.package.uuidEntity;

    this._game = info.game;
  }

  private _uuid: string;
  private _lang: string;
  private _uuidentity: string;
  private _game: Game;
}
