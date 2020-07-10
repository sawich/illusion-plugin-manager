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

  get package() {
    return this._package;
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

  constructor(p: Package) {
    this._package = p;
  }

  private _package: Package;
  private _version: string = "";
  private _files: string[] = [];
}

export interface IInstallerArguments {
  package: Package;
  container: IPluginContainer;
}

export interface IInstallArguments {
  task: Task;
  builder: PackageBuilder;
}

export interface IInstaller {
  install(info: IInstallArguments): Promise<void>;
}

export type IInstallers = IInstaller[];

export class PluginContainer {
  get dependence() {
    return this._dependence;
  }

  get nodes() {
    return this._nodes;
  }

  constructor(info: IInstallerArguments) {
    this._dependence = info.container.dependence;
    this._nodes = info.container.nodes.map(header =>
      this.makeNode({ header, package: info.package })
    );
  }

  private makeNode(info: { header: INodeHeader; package: Package }) {
    switch (info.header.type) {
      case NodeType.Placer:
        return this.makePlacer({
          header: info.header.node as IPlacerHeader,
          package: info.package
        });
      case NodeType.Resolver:
        return this.makeResolver({
          header: info.header.node as IResolverHeader,
          package: info.package
        });
      case NodeType.Mover:
        return this.makeMover({
          header: info.header.node as IMoverHeader,
          package: info.package
        });
    }
  }

  private makePlacer(info: { header: IPlacerHeader; package: Package }) {
    switch (info.header.type) {
      case PlacerType.Git:
        return new GitPlacer({
          placer: info.header as IGitPlacer,
          package: info.package
        });
    }
    throw new Error("Bad placer type");
  }

  private makeResolver(info: { header: IResolverHeader; package: Package }) {
    switch (info.header.type) {
      case ResolverType.VisualStudio:
        return new VSCSharpResolver({
          resolver: info.header as IVSResolver,
          package: info.package
        });
    }
    throw new Error("Bad resolver type");
  }

  private makeMover(info: { header: IMoverHeader; package: Package }) {
    switch (info.header.type) {
      case MoverType.File:
        return new FileMover({
          mover: info.header as IFileMover,
          package: info.package
        });
    }
  }

  private _dependence: string[];
  private _nodes: IInstallers;
}

export class Installer {
  get container() {
    return this._container;
  }

  async install() {
    if (this._task.package.game.has(this._task.package.uuid)) {
      console.warn(
        `Already installed, skipped [game: ${this._task.package.game.id}]`
      );
      return;
    }

    await this._task.run();

    if (this.container.dependence.length > 0) {
      console.log("install dependencies: ", this.container.dependence);
      this._task.setJob(new InstallingDependenciesJob(this._task));

      await Promise.all(
        this.container.dependence.map(async uuid => {
          return installerPackages.install(
            await packages.get({
              game: this._task.package.game,
              uuid
            })
          );
        })
      );
    }

    const builder = new PackageBuilder(this._task.package);
    for (const node of this.container.nodes) {
      await node.install({ task: this._task, builder });
    }

    this._task.package.game.add(builder);
    // await this._task.package.game.save();
  }

  async done() {
    await this._task.done();
  }

  constructor(info: IInstallerArguments) {
    this._container = new PluginContainer(info);
    this._task = new Task({
      container: this.container,
      installer: this,
      package: info.package
    });
  }

  private _task: Task;
  private _container: PluginContainer;
}
