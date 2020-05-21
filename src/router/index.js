import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CharactersShow from "../views/CharactersShow.vue";
import CharactersNew from "../views/CharactersNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/characters/new",
    name: "characters-new",
    component: CharactersNew,
  },
  {
    path: "/characters/:id",
    name: "characters-show",
    component: CharactersShow,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
