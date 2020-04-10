import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children:[
      {
        path: "regist",
        name:"Register",
        component: () => import(/* webpackChunkName: "about" */ "../views/Register.vue"),
      },
      {
        path: "live/:roomid",
        name:"Live",
        component: () => import(/* webpackChunkName: "about" */ "../views/live/Live.vue"),
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;