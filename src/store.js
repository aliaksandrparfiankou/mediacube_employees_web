import Vue from 'vue'
import Vuex from 'vuex'
import { fetchCompany } from './api'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: {
            company: null,
            pageNumber: null,
        },
        actions: {
            fetchCompany ({ commit }, pageNumber) {
                commit('setPageNumber', { pageNumber })
                return fetchCompany(pageNumber).then(response => {
                    commit('setCompany', {
                        company: response.data
                    })
                })
            }
        },
        mutations: {
            setCompany (state, { company }) {
                Vue.set(state, 'company', company)
            },
            setPageNumber(state, { pageNumber }) {
                Vue.set(state, 'pageNumber', pageNumber)
            }
        }
    })
}
