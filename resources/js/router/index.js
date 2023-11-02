import { createRouter, createWebHistory } from "vue-router";

import login from '../components/invoices/login.vue';
import Register from "../components/invoices/register.vue";
import invoiceIndex from '../components/invoices/index.vue';
import invoiceNew from '../components/invoices/new.vue';
import invoiceShow from "../components/invoices/show.vue";
import invoiceEdit from '../components/invoices/edit.vue';
import notFound from '../components/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: login,
        meta: {
            requiresAuth:false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            requiresAuth:false
        }
    },
    {
        path:'/invoices',
        name: 'Invoices',
        component: invoiceIndex,
        meta: {
            requiresAuth:true
        }
    },
    {
        path: '/invoice/new',
        component: invoiceNew,
        meta: {
            requiresAuth:true
        }
    },
    {
        path: '/invoice/show/:id',
        component: invoiceShow,
        props: true,
        meta: {
            requiresAuth:true
        }
    },
    {
        path: '/invoice/edit/:id',
        component: invoiceEdit,
        props:true,
        meta: {
            requiresAuth:true
        }
    },
    {
        path:'/:pathMatch(.*)*',
        component: notFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        return {name:'Login'}
    }
    if (to.meta.requiresAuth == false && localStorage.getItem('token')) {
        return {name:'Invoices'}
    }
});

export default router