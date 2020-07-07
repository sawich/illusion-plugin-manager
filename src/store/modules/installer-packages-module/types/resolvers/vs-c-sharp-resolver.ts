import { PluginContainer, IInstaller } from "../core/installer";
import { readFile, open, mkdir, copyFile, unlink } from "fs/promises";
import { Task } from "@/store/modules/tasks-module/core/task";
import { IVSResolver, IVSBuild, IVSFile } from "..";
import { parse, join, dirname } from "path";
import { spawn } from "child_process";
import { vs } from "@/store";

export class VSCSharpResolver implements IInstaller {
  async install(task: Task) {
    await this.restore();

    for (const build of this._build) {
      const file = await this.createProjectFile(build, task);
      await vs.build({ cwd: this._path, file, toolset: "16.0" });
      await unlink(join(this._path, file));
    }

    for (const file of this._files) {
      const src = join(this._path, file.src);
      const dst = join(task.package.game.path, file.dst);
      const path = dirname(dst);

      await mkdir(path, { recursive: true });
      await copyFile(src, dst);
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

  constructor(info: { container: PluginContainer; resolver: IVSResolver }) {
    this._container = info.container;
    this._files = info.resolver.files;
    this._build = info.resolver.build;
    this._path = join(__cache, `git/${this._container.uuidentity}`);
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
  private _files: IVSFile[];
  private _build: IVSBuild[];
}
