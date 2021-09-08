import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
//挂载事件总线
Vue.prototype.$bus = new Vue()
//解决移动端300ms点击延迟
FastClick.attach(document.body)
//图片懒加载
Vue.use(VueLazyLoad)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
