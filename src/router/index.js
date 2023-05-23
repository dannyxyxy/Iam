import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },

  {
    path: "/PostMain",
    name: "PostMain",
    component: () => import("../views/PostMain.vue"),
  },

  {
    path: "/Category",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  // {
  //   path: "/Edit",
  //   name: "Edit",
  //   component: () => import("../views/Edit.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
