import Vue from "vue";
import Vuex from "vuex";
import { createProxy, extractVuexModule } from "vuex-class-component";
import { CachedPackagesModule } from "./modules/cached-packages-module";
import { GamesModule } from "./modules/games-module";
import { InstallerPackagesModule } from "./modules/installer-packages-module";
import { PackagesModule } from "./modules/packages-module";
import { TasksModule } from "./modules/tasks-module";
import { VSModule } from "./modules/vs-module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(VSModule),
    ...extractVuexModule(GamesModule),
    ...extractVuexModule(CachedPackagesModule),
    ...extractVuexModule(InstallerPackagesModule),
  },
  strict: process.env.NODE_ENV != "production"
});

export const vs = createProxy(store, VSModule);
export const games = createProxy(store, GamesModule);
export const tasks = new TasksModule();
export const packages = new PackagesModule;
export const cached = createProxy(store, CachedPackagesModule);
export const installerPackages = createProxy(store, InstallerPackagesModule);
