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
    path: "/Edit",
    name: "Edit",
    component: () => import("../views/Edit.vue"),
  },
  {
    path: "/CrewMain",
    name: "CrewMain",
    component: () => import("../views/CrewMain.vue"),
  },
  {
    path: "/CrewPost",
    name: "CrewPost",
    component: () => import("../views/CrewPost.vue"),
  },
  {
    path: "/CreateCrew",
    name: "CreateCrew",
    component: () => import("../views/CreateCrew.vue"),
  },
  {
<<<<<<< HEAD
=======
    path: "/CrewEdit",
    name: "CrewEdit",
    component: () => import("../views/CrewEdit.vue"),
  },
  {
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    path: "/Mypage",
    name: "Mypage",
    component: () => import("../views/Mypage.vue"),
  },
<<<<<<< HEAD
=======
  {
    path: "/UpdateEdit",
    name: "UpdateEdit",
    component: () => import("../views/UpdateEdit.vue"),
  },
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
