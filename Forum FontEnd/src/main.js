import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router'
import lodash from 'lodash'
import locale from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.css'
Vue.config.productionTip = false

Vue.use(ElementUI, { locale })
Vue.prototype.$basePath ="C:/Users/boulbeba/Desktop/IHM/forums/src/assets/img"
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

