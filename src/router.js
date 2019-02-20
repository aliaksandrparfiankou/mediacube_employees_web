import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior () {
            return { x: 0, y: 0 }
        },
        routes: [
            {
                path: '/',
                redirect: 'company'
            },
            {
                path: '/company/:pageNumber?',
                name: 'company',
                component: () => import('./pages/Company.vue')
            },
            {
                path: '/departments/:pageNumber?',
                name: 'departments',
                component: () => import('./pages/Departments.vue')
            },
            {
                path: '/employees/:pageNumber?',
                name: 'employees',
                component: () => import('./pages/Employees.vue')
            },
            {
                path: '*',
                component: () => import('./pages/404.vue')
            }
        ]
    })
}
