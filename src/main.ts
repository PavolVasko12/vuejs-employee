import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueLodash from 'vue-lodash'
import orderBy from 'lodash/orderBy'
import random from 'lodash/random'

Vue.config.productionTip = false;
Vue.use(VueLodash, { name: 'custom' , lodash: { orderBy, random } })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
