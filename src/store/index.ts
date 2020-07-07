import Vue from "vue";
import Vuex from "vuex";

import { extractVuexModule, createProxy } from "vuex-class-component";

import { VSModule } from "./modules/vs-module";
import { AppModule } from "./modules/app-module";
import { GamesModule } from "./modules/games-module";
import { TasksModule } from "./modules/tasks-module";
import { PackagesModule } from "./modules/packages-module";
import { CachedPackagesModule } from "./modules/cached-packages-module";
import { InstalledPackagesModule } from "./modules/installed-packages-module";
import { InstallerPackagesModule } from "./modules/installer-packages-module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(VSModule),
    ...extractVuexModule(AppModule),
    ...extractVuexModule(GamesModule),
    ...extractVuexModule(TasksModule),
    ...extractVuexModule(PackagesModule),
    ...extractVuexModule(CachedPackagesModule),
    ...extractVuexModule(InstalledPackagesModule),
    ...extractVuexModule(InstallerPackagesModule),
  },
  strict: process.env.NODE_ENV != "production",
});

export const vs = createProxy(store, VSModule);
export const app = createProxy(store, AppModule);
export const games = createProxy(store, GamesModule);
export const tasks = createProxy(store, TasksModule);
export const packages = createProxy(store, PackagesModule);
export const cached = createProxy(store, CachedPackagesModule);
export const installedPackages = createProxy(store, InstalledPackagesModule);
export const installerPackages = createProxy(store, InstallerPackagesModule);
