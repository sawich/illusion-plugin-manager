import "normalize.css";

import Vue from "vue";
Vue.config.productionTip = false;

import { resolve } from "path";
(global as any).__cache = resolve(__static, `.cache`);
(global as any).__userdata = resolve(__static, `userdata`);

import i18n from "./i18n";
import app from "./app.vue";
import router from "./router";
import { store } from "./store";

export const vue = new Vue({ router, i18n, store, render: (h) => h(app) }).$mount("#app");
