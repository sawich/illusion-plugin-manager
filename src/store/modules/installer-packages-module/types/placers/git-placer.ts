import { access, mkdir } from "fs/promises";
import { join } from "path";
import simpleGit from "simple-git";

import { GitCloneJob } from "@/store/modules/jobs-module/types/jobs/git-clone-job";

import {
    IInstaller, IInstallerArguments, PackageBuilder, PluginContainer
} from "../core/installer";
import { IGitPlacer } from "./types";

export class GitPlacer implements IInstaller {
  async install(info: IInstallerArguments) {
    console.info("call place");

    const job = new GitCloneJob({
      task: info.task,
      action: this.action.bind(this, info.builder)
    });
    await job.run();
  }

  async action(builder: PackageBuilder) {
    console.info("task action");

    const git = simpleGit(this._path);

    try {
      await access(this._path);
      console.info("already clonned");
    } catch {
      console.log("create directory");
      await mkdir(this._path, { recursive: true });

      console.log("start clone");
      await git.clone(this._url, ".", ["--recursive"]);
    }

    const log = await git.log({});
    builder.version = log.latest.hash;

    console.info("action end");
  }

  constructor(info: { container: PluginContainer; placer: IGitPlacer }) {
    this._container = info.container;
    this._url = info.placer.url;
    this._path = join(__cache, `git/${this._container.uuidentity}`);
  }

  private _path: string;
  private _container: PluginContainer;
  private _url: string;
}
