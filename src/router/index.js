import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/';
import register from '@/pages/register.vue';
import login from '@/pages/login.vue';
import search from '@/pages/search.vue';
import profile from '@/pages/profile.vue';
import pet from '@/pages/pet.vue';
import create from '@/pages/create.vue';
import auth_create from '@/pages/auth_create.vue';

const routes = [
    {
        path: '/',
        component: index
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/search',
        component: search
    },
    {
        path: '/profile',
        component: profile
    },
    {
        path: '/pet',
        component: pet
    },
    {
        path: '/create',
        component: create
    },
    {
        path: '/auth_create',
        component: auth_create
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
