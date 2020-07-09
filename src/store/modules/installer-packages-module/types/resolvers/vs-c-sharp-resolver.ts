import { spawn } from "child_process";
import { open, readFile, unlink } from "fs/promises";
import { join, parse } from "path";

import { vs } from "@/store";
import { VSBuildJob } from "@/store/modules/jobs-module/types/jobs/vs-build-job";
import { Task } from "@/store/modules/tasks-module/core/task";

import { IInstaller, IInstallerArguments, PluginContainer } from "../core/installer";
import { IVSProject, IVSProjects, IVSResolver } from "./types";

export class VSCSharpResolver implements IInstaller {
  async install(info: IInstallerArguments) {
    const job = new VSBuildJob({
      task: info.task,
      action: this.action.bind(this, info.task)
    });
    await job.run();
  }

  constructor(info: { container: PluginContainer; resolver: IVSResolver }) {
    this._container = info.container;
    this._projects = info.resolver.projects;
    this._path = join(__cache, `git/${this._container.uuidentity}`);
  }

  private async action(task: Task) {
    await this.restore();

    for (const build of this._projects) {
      const file = await this.createProjectFile(build, task);
      await vs.build({ cwd: this._path, file, toolset: "16.0" });
      await unlink(join(this._path, file));
    }

    //TargetFrameworkVersion
  }

  private async createProjectFile(project: IVSProject, task: Task) {
    const file = await readFile(join(this._path, project.file), "utf-8");
    const xmlHeader = file.match(/<\?xml.*?\?>/);
    if (xmlHeader == null) {
      throw new Error("");
    }

    const cropped = file.replace(/<\?xml.*?\?>/, "");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(cropped, "text/xml");
    for (const element of xmlDoc.querySelectorAll("HintPath")) {
      const dllName = parse(element.innerHTML).name;
      if (project.ignore.includes(dllName)) {
        console.warn(`[dll]: ${dllName} ignored replace path`);
        continue;
      }
      const gameDll = task.package.game.dll(dllName);
      if (gameDll != null) {
        element.innerHTML = gameDll;
      }

      console.log(`[dll]: ${element.innerHTML}`);
    }

    const xmlSerializer = new XMLSerializer();
    const projectFileSerialized = xmlSerializer.serializeToString(xmlDoc);

    const projectFileName = join(
      parse(project.file).dir,
      `${this._container.uuidentity}.csproj`
    );

    const out = join(this._path, projectFileName);

    const projectFile = await open(out, "w");
    await projectFile.write(xmlHeader[0]);
    await projectFile.write("\n");
    await projectFile.write(projectFileSerialized);
    await projectFile.close();

    return projectFileName;
  }

  private async restore() {
    console.log("start restore");
    await new Promise(resolve => {
      const dotnet = spawn(join(__cache, "nuget.exe"), ["restore"], {
        cwd: this._path,
        shell: true
      });
      dotnet.stdout.on("data", out => {
        console.log(`${out}`);
      });
      dotnet.stderr.on("data", out => {
        console.error(`${out}`);
      });
      dotnet.once("close", () => {
        resolve();
      });
    });
    console.log("end restore");
  }

  private _path: string;
  private _container: PluginContainer;
  private _projects: IVSProjects;
}