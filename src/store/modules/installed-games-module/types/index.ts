import { PluginGame } from "../../plugins-module/types";

export interface IInstalledGame {
  id: PluginGame;
  path: string;
}

export class InstalledGame {
  public get id() {
    return this._id;
  }

  public get path() {
    return this._path;
  }

  public constructor(id: PluginGame, path: string) {
    this._id = id;
    this._path = path;
  }

  private _id: PluginGame;
  private _path: string;
}
