import { Task } from "../../tasks-module/core/task";
import { Plugin } from "../core/plugin";

export abstract class Placer {
  public get plugin() {
    return this._plugin;
  }

  public abstract place(info: Task): Promise<void>;
  public abstract update(info: Task): Promise<void>;

  protected constructor(plugin: Plugin) {
    this._plugin = plugin;
  }

  private _plugin: Plugin;
}
