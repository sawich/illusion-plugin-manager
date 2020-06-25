import { Plugin } from "../core/plugin";
import { Task } from "../../tasks-module/core/task";

export abstract class Resolver {
  get plugin() {
    return this._plugin;
  }

  abstract install(info: Task): Promise<void>;
  abstract update(info: Task): Promise<void>;

  protected constructor(plugin: Plugin) {
    this._plugin = plugin;
  }

  private _plugin: Plugin;
}
