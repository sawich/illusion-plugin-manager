import { PluginGame, IPluginContainer, PluginPlace, IGitPlugin, PluginResolve } from "../types";
import { VSCSharpPartialResolver } from "../resolvers/vs-c-sharp-partial-resolver";
import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { VSCSharpResolver } from "../resolvers/vs-c-sharp-resolver";
import { GitPlacer } from "../placers/git-placer";
import { Resolver } from "../resolvers/resolver";
import { Placer } from "../placers/placer";
import { Task } from "../../tasks-module/core/task";

export class PluginContainer {
  get identity() {
    return this._identity;
  }

  get placer() {
    return this._placer;
  }

  constructor(container: IPluginContainer, plugin: Plugin) {
    this._identity = container.identity;
    this._placer = this.makePlacer(container);
  }

  private _identity: number;
  private _placer: Placer;

  private makePlacer(container: IPluginContainer) {
    if (container.place == PluginPlace.Git) {
      return new GitPlacer(container as IGitPlugin, this);
    }
    throw new Error("Bad placer type");
  }
}

export class Plugin {
  get identity() {
    return this._container.identity;
  }

  get placer() {
    return this._container.placer;
  }

  get id() {
    return this._id;
  }

  get lang() {
    return this._lang;
  }

  get games(): PluginGame[] {
    return this._games;
  }

  get dependencies() {
    return this._dependencies;
  }

  /**
   * @param game unique game id
   * @param deep install as dependency
   */
  async install(game: PluginGame, deep = false) {
    try {
      const info = new Task(game, this);

      if (this._dependencies.length > 0) {
        console.dir("install dependencies:", this._dependencies);
        await Promise.race(this._dependencies.map((d) => d.install(game, true)));
      }

      await this._placer.place(info);
      await this._resolver.install(info);
    } catch (e) {
      if (e instanceof TaskExistExeption) {
        if (deep) {
          console.log("task already exists. wait...");
          await e.task.awaiter;
        } else {
          console.warn("duplicated task...");
          throw new Error("Duplicated task");
        }
      }
    }
  }

  async update(game: PluginGame) {
    // await this._placer.update(game);
    // await this._resolver.update(game);
  }

  constructor(container: IPluginContainer, plugins: Plugin[]) {
    this._container = new PluginContainer(container, this);
    this._id = container.id;
    this._lang = container.lang;
    this._games = container.games;
    this._dependencies = container.dependencies.map((v) => plugins[v]);
    this._resolver = this.makeResolver(container);
  }

  private makeResolver(raw: IPluginContainer) {
    switch (raw.resolver) {
      case PluginResolve.VSCSharpPartial:
        return new VSCSharpPartialResolver(this);
      case PluginResolve.VSCSharp:
        return new VSCSharpResolver(this);
    }
    throw new Error("Bad resolver type");
  }

  private _container: PluginContainer;
  private _id: number;
  private _lang: number;
  private _games: PluginGame[];
  private _resolver: Resolver;
  private _dependencies: Plugin[] = [];
}
