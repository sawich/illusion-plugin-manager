import { Task } from "../../tasks-module/core/task";
import { PluginContainer } from "../core/plugin";

export abstract class Placer {
  get container() {
    return this._container;
  }

  abstract place(info: Task): Promise<void>;
  abstract update(info: Task): Promise<void>;

  protected constructor(container: PluginContainer) {
    this._container = container;
  }

  private _container: PluginContainer;
}
