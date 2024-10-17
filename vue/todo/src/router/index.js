// https://router.vuejs.org/installation.html
// https://router.vuejs.org/api/#Functions-createRouter
import { createRouter, createWebHistory } from "vue-router";
import MainTodo from "/src/pages/MainTodo.vue";

// https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
import NotFound from "/src/pages/NotFound.vue";

// https://router.vuejs.org/guide/advanced/lazy-loading.html#lazy-loading-routes
// 遅延ローディングルートとして反映
const About = () => import("/src/pages/About.vue");
const Blog = () => import("/src/pages/Blog.vue");
const BlogDetail = () => import("/src/pages/BlogDetail.vue");

const routes = [
    {
        path: "/",
        name: "MainTodo",
        component: MainTodo,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/blog",
        name: "Blog",
        component: Blog,
    },
    {
        path: "/blog/:id",
        name: "BlogDetail",
        component: BlogDetail,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router;
