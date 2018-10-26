import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '@/lib/auth'

import NotFound from '@/pages/404.vue'
import Login from '@/pages/login.vue'
import Order from '@/pages/order.vue'
import User from '@/pages/user.vue'
import Gift from '@/pages/gift.vue'
import IosOrder from '@/pages/iosorder.vue'
import Api from '@/config/api'

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {keepAlive: false,layout:false},
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {keepAlive: true,layout: true},
        beforeEnter:auth
    },
    {
        path: '/iosOrder',
        name: 'iosOrder',
        component: IosOrder,
        meta: {keepAlive: true,layout: true},
        beforeEnter:auth
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        alias:['/'],
        meta: {keepAlive: true,layout: true},
        beforeEnter:auth
    },
    {
        path: '/gift',
        name: 'gift',
        component: Gift,
        meta:{keepAlive: true,layout:true},
        beforeEnter:auth
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        meta:{keepAlive: true,layout:false},
    },
    {
        path: '*',
        redirect: {name: '404'}
    }
];


const router = new VueRouter({
    routes,
    mode: 'hash'
});

export default router