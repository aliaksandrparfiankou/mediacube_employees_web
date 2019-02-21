import Vue from 'vue'
import Vuex from 'vuex'
import {
    fetchCompany,
    fetchDepartment,
    fetchDepartments,
    fetchEmployee,
    fetchEmployees,
    removeDepartment,
    removeEmployee
} from './api'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: {
            company: null,
            pageNumber: null,
            employees: null,
            employee: null,
            departments: null,
            department: null,
            allDepartments: null,
        },
        actions: {
            fetchCompany ({ commit }, pageNumber) {
                commit('setPageNumber', { pageNumber })
                return fetchCompany(pageNumber).then(response => {
                    commit('setCompany', {
                        company: response.data
                    })
                })
            },
            fetchEmployees ({ commit }, pageNumber) {
                commit('setPageNumber', { pageNumber })
                return fetchEmployees(pageNumber).then(response => {
                    commit('setEmployees', {
                        employees: response.data
                    })
                })
            },
            fetchDepartments ({ commit }, pageNumber) {
                commit('setPageNumber', { pageNumber })
                return fetchDepartments(pageNumber).then(response => {
                    commit('setDepartments', {
                        departments: response.data
                    })
                })
            },
            fetchDepartment ({ commit }, id) {
                return fetchDepartment(id).then(response => {
                    commit('setDepartment', {
                        department: response.data
                    })
                })
            },
            fetchEmployee ({ commit }, id) {
                return fetchEmployee(id).then(response => {
                    commit('setEmployee', {
                        employee: response.data
                    })
                })
            },
            fetchAllDepartments ({ commit }) {
                return fetchDepartments(1, 9999).then(response => {
                    commit('setAllDepartments', {
                        allDepartments: response.data
                    })
                })
            },
            removeEmployee({}, { id, callback, errorCallback }) {
                return removeEmployee(id).then(() => {
                    callback()
                }).catch(error => {
                    const response = error.response
                    errorCallback(response)
                })
            },
            removeDepartment({}, { id, callback, errorCallback }) {
                return removeDepartment(id).then(() => {
                    callback()
                }).catch(error => {
                    const response = error.response
                    errorCallback(response)
                })
            }
        },
        mutations: {
            setCompany (state, { company }) {
                Vue.set(state, 'company', company)
            },
            setEmployees (state, { employees }) {
                Vue.set(state, 'employees', employees)
            },
            setDepartments (state, { departments }) {
                Vue.set(state, 'departments', departments)
            },
            setDepartment (state, { department }) {
                Vue.set(state, 'department', department)
            },
            setEmployee (state, { employee }) {
                Vue.set(state, 'employee', employee)
            },
            setAllDepartments (state, { allDepartments }) {
                Vue.set(state, 'allDepartments', allDepartments)
            },
            setPageNumber(state, { pageNumber }) {
                Vue.set(state, 'pageNumber', pageNumber)
            }
        }
    })
}
