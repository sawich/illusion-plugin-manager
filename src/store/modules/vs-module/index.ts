// import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { createModule, mutation, action } from "vuex-class-component";
import { readFile } from "fs/promises";
import { join } from "path";
import { arch } from "os";
import { spawn } from "child_process";

export interface IVSConfig {
  version: string;
  components: string[];
}

type KnownBuildTools = "15.0" | "16.0";

interface IBuildTools {
  [key: string]: {
    components: string[];
    msbuild: string;
  };
}

interface IUpdateComponents {
  buildTool: KnownBuildTools;
  components: string[];
}

interface BuildToolsLoad {
  [key: string]: string;
}

export interface IBuildQuery {
  toolset: KnownBuildTools;
  cwd: string;
  file: string;
}

const VuexModule = createModule({ namespaced: "vs", strict: false });

export class VSModule extends VuexModule {
  get buildTools() {
    return this._buildTools;
  }

  //
  // Actions
  //

  @action async build(info: IBuildQuery) {
    console.log("start build");
    console.log(info);

    await new Promise(success => {
      const dotnet = spawn(
        this._buildTools[info.toolset].msbuild,
        [
          join(info.cwd, info.file),
          "/t:Build",
          "/p:Configuration=Release",
          `/p:SolutionDir=${info.cwd}`
        ],
        {
          cwd: info.cwd,
          shell: true
        }
      );
      dotnet.stderr.on("data", out => {
        console.error(`${out}`);
      });
      dotnet.stdout.on("data", out => {
        console.log(`${out}`);
      });
      dotnet.once("close", () => {
        success();
      });
    });
    console.log("end build");
  }

  @action async load() {
    const buildtools: BuildToolsLoad[] = [
      { version: "15.0", filename: "vs_BuildTools16" }
    ];

    // const components = await Promise.all(
    // buildtools.map(info => this.getComponents(info))
    // );
    // for (const component of components) {

    for (const component of [
      { buildTool: "16.0", components: [] }
    ] as IUpdateComponents[]) {
      this.updateComponents(component);
    }
  }

  @action async getComponents(info: BuildToolsLoad) {
    const exe = join(__cache, `${info.filename}.exe`);
    const config = join(__cache, `${info.filename}_config.json`);
    // const args = ["export", "--config", config, "--passive"];
    const args = ["export", "--config", config, "--quiet"];
    return await new Promise(
      async (success: (filename: IUpdateComponents) => void) => {
        spawn(exe, args, { stdio: ["ignore"] }).once("close", async () => {
          const file = await readFile(config, "utf-8");
          const json = JSON.parse(file) as IVSConfig;
          return success({
            buildTool: info.version as KnownBuildTools,
            components: json.components
          });
        });
      }
    );
  }

  //
  // Mutations
  //

  @mutation
  private updateComponents(info: IUpdateComponents) {
    const year = { "15.0": 2017, "16.0": 2019 };
    const programFiles =
      arch() == "x64" ? "Program Files (x86)" : "Program Files";

    const msbuild = `"C:\\${programFiles}\\Microsoft Visual Studio\\${
      year[info.buildTool]
    }\\BuildTools\\MSBuild\\Current\\Bin\\MSBuild.exe"`;

    this._buildTools[info.buildTool] = {
      components: info.components,
      msbuild
    };
  }

  //
  // Data
  //

  private _componentMap = {
    "v3.5": ["Microsoft.Net.Component.3.5.DeveloperTools"],
    v4: [
      "Microsoft.Net.Component.4.TargetingPack",
      "Microsoft.Net.ComponentGroup.TargetingPacks.Common"
    ],
    "v4.5": [
      "Microsoft.Net.Component.4.5.TargetingPack",
      "Microsoft.Net.ComponentGroup.TargetingPacks.Common"
    ],
    "v4.5.1": [
      "Microsoft.Net.Component.4.5.1.TargetingPack",
      "Microsoft.Net.ComponentGroup.TargetingPacks.Common"
    ],
    "v4.5.2": [
      "Microsoft.Net.Component.4.5.2.TargetingPack",
      "Microsoft.Net.ComponentGroup.TargetingPacks.Common"
    ],
    "v4.6": [
      "Microsoft.Net.Component.4.6.TargetingPack",
      "Microsoft.Net.ComponentGroup.TargetingPacks.Common"
    ],
    "v4.6.1": [
      "Microsoft.Net.Component.4.6.1.TargetingPack",
      "Microsoft.Net.ComponentGroup.4.6.1.DeveloperTools"
    ],
    "v4.6.2": [
      "Microsoft.Net.Component.4.6.2.TargetingPack",
      "Microsoft.Net.ComponentGroup.4.6.2.DeveloperTools"
    ],
    "v4.7": [
      "Microsoft.Net.Component.4.7.TargetingPack",
      "Microsoft.Net.ComponentGroup.4.7.DeveloperTools"
    ],
    "v4.7.1": [
      "Microsoft.Net.Component.4.7.1.TargetingPack",
      "Microsoft.Net.ComponentGroup.4.7.1.DeveloperTools"
    ],
    "v4.7.2": [
      "Microsoft.Net.Component.4.7.2.TargetingPack",
      "Microsoft.Net.ComponentGroup.4.7.2.DeveloperTools"
    ],
    "v4.8": [
      "Microsoft.Net.Component.4.8.TargetingPack",
      "Microsoft.Net.ComponentGroup.4.8.DeveloperTools"
    ]
  };

  private _buildTools: IBuildTools = {
    "15.0": { components: [], msbuild: "" },
    "16.0": { components: [], msbuild: "" }
  };
}
