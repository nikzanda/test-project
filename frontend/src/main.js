import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./store/store"

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.prototype.$axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000
})


new Vue({
  vuetify,
  router,
  store,
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('user/SET_USER_DATA', userData, { root: true })
    }//if
  },
  render: h => h(App)
}).$mount('#app')
