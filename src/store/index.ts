import Vue from "vue";
import Vuex from "vuex";

import { extractVuexModule, createProxy } from "vuex-class-component";

import { VSModule } from "./modules/vs-module";
import { AppModule } from "./modules/app-module";
import { TasksModule } from "./modules/tasks-module";
import { PluginsModule } from "./modules/plugins-module";
import { CachedPluginsModule } from "./modules/cached-plugins-module";
import { InstalledGamesModule } from "./modules/installed-games-module";
import { InstalledPluginsModule } from "./modules/installed-plugins-module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(VSModule),
    ...extractVuexModule(AppModule),
    ...extractVuexModule(TasksModule),
    ...extractVuexModule(PluginsModule),
    ...extractVuexModule(CachedPluginsModule),
    ...extractVuexModule(InstalledGamesModule),
    ...extractVuexModule(InstalledPluginsModule),
  },
  strict: process.env.NODE_ENV != "production",
});

export const tasks = createProxy(store, TasksModule);
export const plugins = createProxy(store, PluginsModule);
export const installedGames = createProxy(store, InstalledGamesModule);
export const installedPlugins = createProxy(store, InstalledPluginsModule);
