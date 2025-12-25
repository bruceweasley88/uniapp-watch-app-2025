import App from './App'
import { initLanguage, t, setLanguage } from './locale/index.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$t = t
Vue.prototype.$setLanguage = setLanguage
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$t = t
  app.config.globalProperties.$setLanguage = setLanguage
  return {
    app
  }
}
// #endif