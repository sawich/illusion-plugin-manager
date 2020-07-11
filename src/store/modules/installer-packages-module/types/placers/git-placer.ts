import { access, mkdir, rmdir } from "fs/promises";
import { join } from "path";
import simpleGit from "simple-git";

import { GitCloneJob } from "@/store/modules/jobs-module/types/jobs/git-clone-job";
import { Package } from "@/store/modules/packages-module/types";

import { IInstallArguments, IInstaller, PackageBuilder } from "../core/installer";
import { IGitPlacer } from "./types";

export class GitPlacer implements IInstaller {
  async install(info: IInstallArguments) {
    console.info("call place");

    const job = new GitCloneJob({
      task: info.task,
      action: this.action.bind(this, info.builder)
    });
    await job.run();
  }

  async action(builder: PackageBuilder) {
    try {
      await access(this._path);
      console.info("[git] Used cached");

      return;
    } catch {}

    // try {
    //   console.log(`rm: ${this._path}`);
    //   await rmdir(this._path, { recursive: true });
    // } catch {}
    console.info("[git] Task action");
    console.log("[git] Create directory");
    await mkdir(this._path, { recursive: true });
    const git = simpleGit();
    console.log("[git] Start clone");
    await git.clone(this._url, this._path, ["--recursive"]);

    const log = await git.log({});
    builder.version = log.latest.hash;

    console.info("[git] Action end");
  }

  constructor(info: { placer: IGitPlacer; package: Package }) {
    this._package = info.package;
    this._url = info.placer.url;
    this._path = join(__cache, `git/${this._package.uuidEntity}`);
  }

  private _path: string;
  private _package: Package;
  private _url: string;
}
