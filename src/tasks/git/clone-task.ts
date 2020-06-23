// import { Task, ProgressHandler } from "@/store/modules/tasks-module";
// import simpleGit from "simple-git";
// import { promisify } from "util";

// import fs from "fs";
// const mkdir = promisify(fs.mkdir);

// import rimrafCallback from "rimraf";
// import { Plugin } from "@/store/modules/plugins-module";
// const rimraf = promisify(rimrafCallback);

// export type ResolverType = () => void;
// export type RejectorType = (r: any) => void;

// export class GitCloneTask extends Task {
//     public async run() {
//         try {
//             const path = `${__cache}/${this._plugin.identity}`;
//             await rimraf(path);
//             await mkdir(path);

//             const git = simpleGit(path);
//             await git.clone(this._plugin.root.url, ".");

//             this._resolver();
//         } catch (e) {
//             this._rejector(e);
//         } finally {
//             super.resolve();
//         }
//     }

//     public constructor(plugin: Plugin, description: string, resolve: ResolverType, reject: RejectorType) {
//         super("cloning", description, "github");

//         this._plugin = plugin;
//         this._resolver = resolve;
//         this._rejector = reject;
//     }

//     private _plugin: Plugin;
//     private _resolver: ResolverType;
//     private _rejector: RejectorType;
// }
