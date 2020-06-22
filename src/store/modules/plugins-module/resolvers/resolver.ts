import { Plugin } from "../core/plugin";
import { Task } from "../../tasks-module/core/task";

export abstract class Resolver {
  public get plugin() {
    return this._plugin;
  }

  public abstract install(info: Task): Promise<void>;
  public abstract update(info: Task): Promise<void>;

  protected constructor(plugin: Plugin) {
    this._plugin = plugin;
  }

  private _plugin: Plugin;
}
