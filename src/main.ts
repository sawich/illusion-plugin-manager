import "normalize.css";

import { join, resolve } from "path";
import Vue from "vue";
import Fragment from "vue-fragment";

import app from "./app.vue";
import i18n from "./i18n";
import router from "./router";
import { store } from "./store";

Vue.config.productionTip = false;

(globalThis as any).__static = resolve("public");
(globalThis as any).__cache = join(__static, `.cache`);
(globalThis as any).__userdata = join(__static, `userdata`);

(globalThis as any).__api = "http://localhost:3000";

Vue.use(Fragment.Plugin);

export const vue = new Vue({
  router,
  i18n,
  store,
  render: h => h(app)
}).$mount("#app");
