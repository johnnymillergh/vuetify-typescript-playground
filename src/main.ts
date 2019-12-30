import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/directives/throttled-click'
import { ColorSchemeUtil } from '@/utils/color-scheme-util'

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

const media = window.matchMedia('(prefers-color-scheme: dark)')
media.addEventListener('change', () => {
  vue.$vuetify.theme.dark = ColorSchemeUtil.isDarkMode()
})
