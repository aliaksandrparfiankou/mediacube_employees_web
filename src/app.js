import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Notifications from 'vue-notification/dist/ssr.js'

Vue.use(Notifications)
Vue.use(Vuetify, {
  iconfont: 'md'
})

export function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
