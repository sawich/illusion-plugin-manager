import { PluginGame, IPluginRaw, PluginPlace, IGitPluginRaw, PluginResolver } from "../types";
import { VSCSharpPartialResolver } from "../resolvers/vs-c-sharp-partial-resolver";
import { VSCSharpResolver } from "../resolvers/vs-c-sharp-resolver";
import { GitPlacer } from "../placers/git-placer";
import { Resolver } from "../resolvers/resolver";
import { Placer } from "../placers/placer";
import { Task } from "../../tasks-module/core/task";

export class Plugin {
  public get id() {
    return this._id;
  }

  public get lang() {
    return this._lang;
  }

  public get identity() {
    return this._identity;
  }

  public get games(): PluginGame[] {
    return this._games;
  }

  public get dependencies() {
    return this._dependencies;
  }

  public async install(game: PluginGame) {
    try {
      const info = new Task(game, this);

      if (this._dependencies.length > 0) {
        console.dir("install dependencies:", this._dependencies);
        await Promise.race(this._dependencies.map((d) => d.install(game)));
      }

      await this._placer.place(info);
      await this._resolver.install(info);
    } catch (e) {
      if (e instanceof Task) {
        console.log("task already exists. wait...");

        await e.awaiter;
      }
    }
  }

  public async update(game: PluginGame) {
    // await this._placer.update(game);
    // await this._resolver.update(game);
  }

  public constructor(raw: IPluginRaw, plugins: Plugin[]) {
    this._id = raw.id;
    this._lang = raw.lang;
    this._identity = raw.identity;
    this._games = raw.games;
    this._dependencies = raw.dependencies.map((v) => plugins[v]);
    this._placer = this.makePlacer(raw);
    this._resolver = this.makeResolver(raw);
  }

  private makePlacer(raw: IPluginRaw) {
    if (raw.place == PluginPlace.Git) {
      return new GitPlacer(raw as IGitPluginRaw, this);
    }
    throw new Error("Bad placer type");
  }

  private makeResolver(raw: IPluginRaw) {
    switch (raw.resolver) {
      case PluginResolver.VSCSharpPartial:
        return new VSCSharpPartialResolver(this);
      case PluginResolver.VSCSharp:
        return new VSCSharpResolver(this);
    }
    throw new Error("Bad resolver type");
  }

  private _id: number;
  private _lang: number;
  private _identity: number;
  private _placer: Placer;
  private _games: PluginGame[];
  private _resolver: Resolver;
  private _dependencies: Plugin[] = [];
}
