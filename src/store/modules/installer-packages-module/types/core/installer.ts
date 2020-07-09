import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { installerPackages, packages } from "@/store";
import {
    InstallingDependenciesJob
} from "@/store/modules/jobs-module/types/jobs/Installing-dependencies-job";
import { Package } from "@/store/modules/packages-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";

import { INodeHeader, IPluginContainer, NodeType } from "../";
import { FileMover } from "../movers/file-mover";
import { IFileMover, IMoverHeader, MoverType } from "../movers/types";
import { GitPlacer } from "../placers/git-placer";
import { IGitPlacer, IPlacerHeader, PlacerType } from "../placers/types";
import { IResolverHeader, IVSResolver, ResolverType } from "../resolvers/types";
import { VSCSharpResolver } from "../resolvers/vs-c-sharp-resolver";

export class PackageBuilder {
  /**
   * Getters
   */

  get container() {
    return this._container;
  }

  get version() {
    return this._version;
  }

  get files() {
    return this._files;
  }

  /**
   * Setters
   */

  set version(value) {
    this._version = value;
  }

  set files(value) {
    this._files = value;
  }

  /**
   * Methods
   */

  constructor(container: PluginContainer) {
    this._container = container;
  }

  private _container: PluginContainer;
  private _version: string = "";
  private _files: string[] = [];
}

export interface IInstallerArguments {
  task: Task;
  builder: PackageBuilder;
}

export interface IInstaller {
  install(info: IInstallerArguments): Promise<void>;
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

  async install() {
    if (this.package.game.has(this.container.uuid)) {
      console.warn("Already installed, skipped");
      return;
    }

    try {
      await this._task.run();
    } catch (error) {
      if (error instanceof TaskExistExeption) {
        // this._task.setJob(new WaitExistsJob(this._task));
        console.info("Task already exists. wait...");
        await error.task.awaiter;
      } else {
        console.error(error);
      }

      return;
    }

    if (this.container.dependence.length > 0) {
      console.log("install dependencies: ", this.container.dependence);
      this._task.setJob(new InstallingDependenciesJob(this._task));

      await Promise.all(
        this.container.dependence.map(async d => {
          return installerPackages.install(await packages.get(d));
        })
      );
    }

    const builder = new PackageBuilder(this.container);
    for (const node of this.container.nodes) {
      await node.install({ task: this._task, builder });
    }

    this._task.package.game.add(builder);
    await this._task.package.game.save();
  }

  async done() {
    await this._task.done();
  }

  constructor(info: { package: Package; container: IPluginContainer }) {
    this._package = info.package;
    this._container = new PluginContainer(info.container);
    this._task = new Task({
      container: this.container,
      installer: this,
      package: this.package
    });
  }

  private _task: Task;
  private _package: Package;
  private _container: PluginContainer;
}
