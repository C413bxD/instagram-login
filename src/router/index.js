import Vue from "vue";
import VueRouter from "vue-router";
import { authGuard } from "@/auth-module";

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

    },{
        path: "/register",
        name:"register",
        component: () => import("@/auth-module/Register.vue"),
    }
];
const router = new VueRouter({
    routes,
    mode: 'history',
});
router.beforeEach(authGuard);

export default router;
