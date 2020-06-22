// import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { createModule, mutation, action } from "vuex-class-component";
import Vue from "vue";
import { store } from "../..";
import { promises as fs } from "fs";
import { resolve } from "path";
import { arch } from "os";
import { spawn } from "child_process";

const readFile = fs.readFile;

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

const VuexModule = createModule({ namespaced: "vs", strict: false });

export class VSModule extends VuexModule {
  public get buildTools() {
    return this._buildTools;
  }

  //
  // Actions
  //

  @action
  public async load() {
    const buildtools: BuildToolsLoad[] = [{ version: "15.0", filename: "vs_BuildTools16" }];
    for (const { version, filename } of buildtools) {
      const exe = resolve(__cache, `${filename}.exe`);
      const config = resolve(__cache, `${filename}_config.json`);
      // const args = ["export", "--config", config, "--passive"];
      const args = ["export", "--config", config, "--quiet"];
      await new Promise(async (resolve: (filename: IUpdateComponents) => void, reject) => {
        // spawn(exe, args, { stdio: ["ignore"] }).once("close", async () => {
        const json = JSON.parse(await readFile(config, "utf-8")) as IVSConfig;
        // console.dir(json);
        return resolve({
          buildTool: version as KnownBuildTools,
          components: json.components,
        });
      });
    }
  }

  //
  // Mutations
  //

  @mutation
  private updateComponents({ buildTool, components }: IUpdateComponents) {
    const year = { "15.0": 2017, "16.0": 2019 };
    const programFiles = arch() == "x64" ? "Program Files (x86)" : "Program Files";
    const msbuild = `C:\\${programFiles}\\Microsoft Visual Studio\\${year[buildTool]}\\BuildTools\\MSBuild\\Current\\Bin\\MSBuild.exe`;

    this._buildTools[buildTool] = {
      components,
      msbuild,
    };
  }

  //
  // Data
  //

  private _componentMap = {
    "v3.5": ["Microsoft.Net.Component.3.5.DeveloperTools"],
    v4: ["Microsoft.Net.Component.4.TargetingPack", "Microsoft.Net.ComponentGroup.TargetingPacks.Common"],
    "v4.5": ["Microsoft.Net.Component.4.5.TargetingPack", "Microsoft.Net.ComponentGroup.TargetingPacks.Common"],
    "v4.5.1": ["Microsoft.Net.Component.4.5.1.TargetingPack", "Microsoft.Net.ComponentGroup.TargetingPacks.Common"],
    "v4.5.2": ["Microsoft.Net.Component.4.5.2.TargetingPack", "Microsoft.Net.ComponentGroup.TargetingPacks.Common"],
    "v4.6": ["Microsoft.Net.Component.4.6.TargetingPack", "Microsoft.Net.ComponentGroup.TargetingPacks.Common"],
    "v4.6.1": ["Microsoft.Net.Component.4.6.1.TargetingPack", "Microsoft.Net.ComponentGroup.4.6.1.DeveloperTools"],
    "v4.6.2": ["Microsoft.Net.Component.4.6.2.TargetingPack", "Microsoft.Net.ComponentGroup.4.6.2.DeveloperTools"],
    "v4.7": ["Microsoft.Net.Component.4.7.TargetingPack", "Microsoft.Net.ComponentGroup.4.7.DeveloperTools"],
    "v4.7.1": ["Microsoft.Net.Component.4.7.1.TargetingPack", "Microsoft.Net.ComponentGroup.4.7.1.DeveloperTools"],
    "v4.7.2": ["Microsoft.Net.Component.4.7.2.TargetingPack", "Microsoft.Net.ComponentGroup.4.7.2.DeveloperTools"],
    "v4.8": ["Microsoft.Net.Component.4.8.TargetingPack", "Microsoft.Net.ComponentGroup.4.8.DeveloperTools"],
  };

  private _buildTools: IBuildTools = {
    "15.0": { components: [], msbuild: "" },
    "16.0": { components: [], msbuild: "" },
  };
}
