import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/Home"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/Login")
        }
    ]
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem("user")

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn)
        next("/login")
    if (to.matched.some(record => !record.meta.requiresAuth) && loggedIn)
        next("/")

    next()
})

export default router