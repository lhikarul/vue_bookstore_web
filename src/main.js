import Vue from 'vue'
import App from './App.vue'
import i18n from './lang'
import router from './router'
import store from './store'
import '@/assets/css/icon.css'
import '@/assets/css/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
