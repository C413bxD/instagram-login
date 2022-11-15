import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("@/layout/Layout.vue"),
        meta: { requiresAuth: true, permission: "acceso" },
        children: []
    },
    {
        path: "/login",
        component: () => import("@/auth-module/Login.vue"),

    },{
        path: "/register",
        component: () => import("@/auth-module/Register.vue"),
    }
];
const router = new VueRouter({
    routes
});

export default router;
