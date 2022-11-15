import Vue from "vue";
import VueRouter from "vue-router";
import { authGuard } from "@/auth-module";
//global store
import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("@/layout/Layout.vue"),
        meta: { requiresAuth: true },
        children: []
    },
    {
        path: "/login",
        name:"login",
        component: () => import("@/auth-module/Login.vue"),
        meta: { requiresAuth: false },
        beforeEnter: (to, from, next) => {
            console.log(store.state.user)
            if(store.state.user) {
              next({ path: "/" });
            } else {
              next();
            }
        }
    },{
        path: "/register",
        name:"register",
        component: () => import("@/auth-module/Register.vue"),
        meta: { requiresAuth: false },
        beforeEnter: (to, from, next) => {
            console.log(store.state.user)
            if(store.state.user) {
              next({ path: "/" });
            } else {
              next();
            }
        }
    }
];
const router = new VueRouter({
    routes,
});
router.beforeEach(authGuard);

export default router;
