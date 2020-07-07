import {
  IPluginContainer,
  IPlacerHeader,
  IResolverHeader,
  IGitPlacer,
  PlacerType,
  ResolverType,
  IVSResolver
} from "..";
import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { VSCSharpResolver } from "../resolvers/vs-c-sharp-resolver";
import { Package } from "@/store/modules/packages-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";
import { GitPlacer } from "../placers/git-placer";
import { installerPackages, packages } from "@/store";

export interface IInstaller {
  install(info: Task): Promise<void>;
}

export class PluginContainer {
  get uuid() {
    return this._uuid;
  }

  get uuidentity() {
    return this._uuidentity;
  }

  get dependence() {
    return this._dependence;
  }

  get placer() {
    return this._placer;
  }

  get resolver() {
    return this._resolver;
  }

  constructor(container: IPluginContainer) {
    this._uuid = container.uuid;
    this._uuidentity = container.uuidentity;
    this._dependence = container.dependence;
    this._placer = this.makePlacer(container.placer);
    this._resolver = this.makeResolver(container.resolver);
  }

  private makePlacer(header: IPlacerHeader) {
    switch (header.type) {
      case PlacerType.Git:
        return new GitPlacer({ container: this, placer: header as IGitPlacer });
    }
    throw new Error("Bad placer type");
  }

  private makeResolver(header: IResolverHeader) {
    switch (header.type) {
      case ResolverType.VisualStudio:
        return new VSCSharpResolver({
          container: this,
          resolver: header as IVSResolver
        });
    }
    throw new Error("Bad resolver type");
  }

  private _uuid: string;
  private _uuidentity: string;
  private _dependence: string[];
  private _placer: IInstaller;
  private _resolver: IInstaller;
}

export class Installer {
  get package() {
    return this._package;
  }

  get container() {
    return this._container;
  }

  /**
   * @param game unique game id
   * @param dep install as dependency
   */
  async install(dep: boolean) {
    let task: Task | null = null;
    try {
      task = new Task({
        container: this.container,
        installer: this,
        package: this.package
      });

      if (this.container.dependence.length > 0) {
        console.log("install dependencies: ", this.container.dependence);
        await Promise.all(
          this.container.dependence.map(async d => {
            await installerPackages.install({
              package: await packages.get(d),
              dep: dep
            });
          })
        );
      }

      await this.container.placer.install(task);
      await this.container.resolver.install(task);
    } catch (error) {
      if (error instanceof TaskExistExeption) {
        if (dep) {
          console.log("task already exists. wait...");
          await error.task.awaiter;
        } else {
          console.warn("duplicated task...");
          throw new Error("Duplicated task");
        }
      } else {
        console.error(error);
      }
    } finally {
      if (task !== null) {
        task.done();
      }
    }
  }

  constructor(info: { package: Package; container: IPluginContainer }) {
    this._package = info.package;
    this._container = new PluginContainer(info.container);
  }

  private _package: Package;
  private _container: PluginContainer;
}
