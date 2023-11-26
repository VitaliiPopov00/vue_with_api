import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/';
import register from '@/pages/register.vue';
import login from '@/pages/login.vue';
import search from '@/pages/search.vue';
import profile from '@/pages/profile.vue';
import pet from '@/pages/pet.vue';
import create from '@/pages/create.vue';
import update from '@/pages/update.vue';

const routes = [
    {
        path: '/',
        component: index,
        name: 'index',
    },
    {
        path: '/register',
        component: register,
        name: 'register',
    },
    {
        path: '/login',
        component: login,
        name: 'login',
    },
    {
        path: '/search',
        component: search,
        name: 'search',
    },
    {
        path: '/profile',
        component: profile,
        name: 'profile',
        beforeEnter: (to, from) => {
            if (!localStorage.getItem('token')) {
                localStorage.setItem('errorMessage', 'Необходимо авторизоваться');
                return { name: 'login' }
            }
        },
    },
    {
        path: '/pet/:id',
        component: pet,
        name: 'pet',
    },
    {
        path: '/create',
        component: create,
        name: 'create',
    },
    {
        path: '/update/:id',
        component: update,
        name: 'update',
        beforeEnter: (to, from) => {
            if (!localStorage.getItem('token')) {
                return { name: 'index' }
            }
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
