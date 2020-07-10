import { spawn } from "child_process";
import { open, readFile, unlink } from "fs/promises";
import { getFileProperties } from "get-file-properties";
import { join, parse } from "path";

import { vs } from "@/store";
import { VSBuildJob } from "@/store/modules/jobs-module/types/jobs/vs-build-job";
import { Package } from "@/store/modules/packages-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";

import { IInstallArguments, IInstaller } from "../core/installer";
import { IVSProject, IVSProjects, IVSResolver } from "./types";

export class VSCSharpResolver implements IInstaller {
  async install(info: IInstallArguments) {
    const job = new VSBuildJob({
      task: info.task,
      action: this.action.bind(this, info.task)
    });
    await job.run();
  }

  constructor(info: { resolver: IVSResolver; package: Package }) {
    this._package = info.package;
    this._path = join(__cache, `git/${this._package.uuidentity}`);

    this._dir = info.resolver.dir;
    this._projects = info.resolver.projects;
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
      `${this._package.uuidentity}.csproj`
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
        cwd: join(this._path, this._dir),
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
  private _package: Package;

  private _dir: string;
  private _projects: IVSProjects;
}
