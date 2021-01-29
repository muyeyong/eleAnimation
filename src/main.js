/* eslint-disable camelcase */
import Vue from 'vue'
import App from './App.vue'
import './icons'
import VueRouter from 'vue-router'
import routes from './router'
Vue.config.productionTip = false
Vue.use(VueRouter)
// 声明变量管理vue及路由实例
let router = null
let instance = null

// 导出子应用生命周期 挂载前
export async function bootstrap (props) {
  console.log(props)
}

export async function mount (props) {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/aaa' : '/',
    mode: 'history',
    routes
  })
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

// 导出子应用生命周期 挂载前 卸载后
export async function unmount () {
  instance.$destroy()
  instance = null
  router = null
}

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 单独开发环境
window.__POWERED_BY_QIANKUN__ || mount()
