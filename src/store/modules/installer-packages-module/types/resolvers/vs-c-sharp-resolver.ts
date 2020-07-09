import { spawn } from "child_process";
import { open, readFile, unlink } from "fs/promises";
import { getFileProperties } from "get-file-properties";
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

    const parser = new DOMParser();

    const cropped = file.replace(/<\?xml.*?\?>/, "");
    const xml = parser.parseFromString(cropped, "text/xml");

    for (const element of xml.querySelectorAll("Reference")) {
      const include = element.getAttribute("Include");
      if (include === null) {
        console.info(`[dll] skipped: ${element}`);
        continue;
      }

      const [_, moduleName] = include.match(/([\S]+),/) || [null, null];
      if (moduleName === null) {
        continue;
      }

      if (project.ignore.includes(moduleName)) {
        console.warn(`[dll]: ${moduleName} ignored replace path`);
        continue;
      }

      const modulePath = task.package.game.dll(moduleName);
      if (modulePath !== null) {
        const hintPath = element.querySelector("HintPath");
        if (hintPath === null) {
          console.error("HintPath not found");
          continue;
        }

        hintPath.innerHTML = modulePath;

        const properties = await getFileProperties(modulePath);
        element.setAttribute(
          "Include",
          include.replace(/Version=.*?,/, `Version=${properties.Version},`)
        );
      }

      console.log("[dll]");
      console.log(element);
    }

    const xmlSerializer = new XMLSerializer();
    const projectFileSerialized = xmlSerializer.serializeToString(xml);

    const projectFileName = join(
      parse(project.file).dir,
      `${this._container.uuidentity}.csproj`
    );

    const out = join(this._path, projectFileName);

    const projectFile = await open(out, "w");
    await projectFile.write(xmlHeader[0]);
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
