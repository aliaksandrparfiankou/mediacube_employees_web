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
                path: '/department/add',
                name: 'department_add',
                component: () => import('./pages/DepartmentAdd.vue')
            },
            {
                path: '/department/edit/:id',
                name: 'department_edit',
                component: () => import('./pages/DepartmentEdit.vue')
            },
            {
                path: '/employees/:pageNumber?',
                name: 'employees',
                component: () => import('./pages/Employees.vue')
            },
            {
                path: '/employee/add',
                name: 'employee_add',
                component: () => import('./pages/EmployeeAdd.vue')
            },
            {
                path: '/employee/edit/:id',
                name: 'employee_edit',
                component: () => import('./pages/EmployeeEdit.vue')
            },
            {
                path: '*',
                component: () => import('./pages/404.vue')
            }
        ]
    })
}
