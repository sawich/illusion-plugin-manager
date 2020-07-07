import { createModule, mutation, action } from "vuex-class-component";

import { readFile, writeFile } from "fs/promises";

const VuexModule = createModule({ namespaced: "cached", strict: false });

export class CachedPackagesModule extends VuexModule {
  //
  // Actions
  //
  // @action
  // async save() {
  //   return await writeFile(`${__cache}/cached.json`, JSON.stringify(this._plugins), "utf-8");
  // }
  // @action
  // async check(plugin: Plugin) {
  //   return this._plugins.has(plugin.identity);
  // }
  // @action
  // async load() {
  //   const cached = await CachedPackagesModule.getData();
  //   this.$store.commit("seed", cached);
  // }
  // //
  // // Mutations
  // //
  // @mutation
  // private seed(identities: number[]) {
  //   this._plugins = new Set(identities);
  // }
  // @mutation
  // private add(identity: number) {
  //   this._plugins.add(identity);
  // }
  // //
  // // Static
  // //
  // private static async getData(): Promise<number[]> {
  //   try {
  //     return JSON.parse(await readFile(`${__cache}/cached.json`, "utf-8"));
  //   } catch {
  //     return [];
  //   }
  // }
  // //
  // // Data
  // //
  // _plugins: Set<number> = new Set();
}
