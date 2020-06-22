import { Task } from "../../tasks-module/core/task";
import { IGitPluginRaw } from "../types";
import { Plugin } from "../core/plugin";
import { promises as fs } from "fs";
import { Placer } from "./placer";
import { tasks } from "@/store";
import { resolve } from "path";

import simpleGit from "simple-git";

const mkdir = fs.mkdir;
const access = fs.access;

export class GitPlacer extends Placer {
  public async clonned(path: string) {}

  public async place(info: Task) {
    console.info("call place");

    const task = await tasks.runGitClone({
      task: info,
      action: async () => {
        console.info("task action");

        const path = this.path;
        console.info("path:", path);

        try {
          await access(path);
          console.info("already clonned");
        } catch {
          console.log("create directories");
          await mkdir(path, { recursive: true });

          const git = simpleGit(path);

          console.log("start clone");
          await git.clone(this._url, ".", ["--recursive"]);
        }

        console.log("start timeout");
        await new Promise(async (r) => {
          setTimeout(() => {
            // console.log("timeout end");
            r();
          }, 1000 * 60 * 4);
        });

        console.info("action end");
      },
    });

    await task.awaiter;
  }

  public async update(info: Task) {}

  public constructor(raw: IGitPluginRaw, plugin: Plugin) {
    super(plugin);

    this._url = raw.url;
  }

  private get path() {
    return resolve(__cache, `git/${this.plugin.identity}`);
  }

  private _url: string;
}
