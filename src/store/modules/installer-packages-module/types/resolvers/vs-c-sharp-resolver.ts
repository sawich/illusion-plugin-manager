import { VSBuildJob } from "@/store/modules/jobs-module/types/jobs/vs-build-job";
import { PluginContainer, IInstaller } from "../core/installer";
import { Task } from "@/store/modules/tasks-module/core/task";
import { readFile, open, unlink } from "fs/promises";
import { IVSResolver, IVSBuild } from "./types";
import { spawn } from "child_process";
import { parse, join } from "path";
import { vs } from "@/store";

export class VSCSharpResolver implements IInstaller {
  async install(task: Task) {
    const job = new VSBuildJob({ task, action: this.action.bind(this, task) });
    await job.run();
  }

  constructor(info: { container: PluginContainer; resolver: IVSResolver }) {
    this._container = info.container;
    this._build = info.resolver.build;
    this._path = join(__cache, `git/${this._container.uuidentity}`);
  }

  private async action(task: Task) {
    await this.restore();

    for (const build of this._build) {
      const file = await this.createProjectFile(build, task);
      await vs.build({ cwd: this._path, file, toolset: "16.0" });
      await unlink(join(this._path, file));
    }

    //TargetFrameworkVersion
  }

  private async createProjectFile(build: IVSBuild, task: Task) {
    const file = await readFile(join(this._path, build.file), "utf-8");
    const xmlHeader = file.match(/<\?xml.*?\?>/);
    if (xmlHeader == null) {
      throw new Error("");
    }

    const cropped = file.replace(/<\?xml.*?\?>/, "");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(cropped, "text/xml");
    for (const element of xmlDoc.querySelectorAll("HintPath")) {
      const dllName = parse(element.innerHTML).name;
      const gameDll = task.package.game.getDllPath(dllName);
      if (gameDll != null) {
        element.innerHTML = gameDll;
      }
    }

    const xmlSerializer = new XMLSerializer();
    const projectFileSerialized = xmlSerializer.serializeToString(xmlDoc);

    const projectFileName = join(
      parse(build.file).dir,
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
      // dotnet.stdout.on("data", out => {
      //   console.log(`${out}`);
      // });
      // dotnet.stderr.on("data", out => {
      //   console.error(`${out}`);
      // });
      dotnet.once("close", () => {
        resolve();
      });
    });
    console.log("end restore");
  }

  private _path: string;
  private _container: PluginContainer;
  private _build: IVSBuild[];
}
