import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { installerPackages, packages } from "@/store";
import { Package } from "@/store/modules/packages-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";

import { INodeHeader, IPluginContainer, NodeType } from "../";
import { FileMover } from "../movers/file-mover";
import { IFileMover, IMoverHeader, MoverType } from "../movers/types";
import { GitPlacer } from "../placers/git-placer";
import { IGitPlacer, IPlacerHeader, PlacerType } from "../placers/types";
import { IResolverHeader, IVSResolver, ResolverType } from "../resolvers/types";
import { VSCSharpResolver } from "../resolvers/vs-c-sharp-resolver";

export interface IInstaller {
  install(info: Task): Promise<void>;
}

export type IInstallers = IInstaller[];

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

  get nodes() {
    return this._nodes;
  }

  constructor(container: IPluginContainer) {
    this._uuid = container.uuid;
    this._uuidentity = container.uuidentity;
    this._dependence = container.dependence;
    this._nodes = container.nodes.map(n => this.makeNode(n));
  }

  private makeNode(header: INodeHeader) {
    switch (header.type) {
      case NodeType.Placer:
        return this.makePlacer(header.node as IPlacerHeader);
      case NodeType.Resolver:
        return this.makeResolver(header.node as IResolverHeader);
      case NodeType.Mover:
        return this.makeMover(header.node as IMoverHeader);
    }
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

  private makeMover(header: IMoverHeader) {
    switch (header.type) {
      case MoverType.File:
        return new FileMover({ container: this, mover: header as IFileMover });
    }
  }

  private _uuid: string;
  private _uuidentity: string;
  private _dependence: string[];
  private _nodes: IInstallers;
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

      for (const node of this.container.nodes) {
        await node.install(task);
      }
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
