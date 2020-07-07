import "normalize.css";

import Vue from "vue";
Vue.config.productionTip = false;

import { resolve, join } from "path";
(globalThis as any).__static = resolve("public");
(globalThis as any).__cache = join(__static, `.cache`);
(globalThis as any).__userdata = join(__static, `userdata`);

import i18n from "./i18n";
import app from "./app.vue";
import router from "./router";
import { store } from "./store";

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

export const vue = new Vue({
  router,
  i18n,
  store,
  render: h => h(app)
}).$mount("#app");
