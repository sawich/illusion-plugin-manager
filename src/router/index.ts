import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home.vue"),
        children: [
          {
            name: "library",
            path: "library",
            component: () => import("@/views/library.vue"),
          },
        ],
      },
      {
        name: "tasks",
        path: "/tasks",
        component: () => import("@/views/tasks.vue"),
      },
      {
        name: "settings",
        path: "/settings",
        component: () => import("@/views/settings.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/empty.vue"),

    children: [
      {
        name: "loading",
        path: "loading",
        component: () => import("@/views/loading.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
