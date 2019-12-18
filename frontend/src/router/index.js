import Vue from 'vue';
import VueRouter from 'vue-router';

/* Layout */
import Layout from '@/layout';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        component: () => import('@/views/Login'),
        hidden: true // hide in side bar
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true // hide in side bar
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home'),
                meta: {
                    title: 'Home',
                    // icon: 'dashboard'
                }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('@/views/About'),
                meta: {
                    title: 'About',
                    // icon: 'dashboard'
                }
            },

        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
