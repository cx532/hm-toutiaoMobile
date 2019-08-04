import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import VeeValidate, { Validator } from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import ch from 'vee-validate/dist/locale/zh_CN'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
// 自定义规则
Vue.use(Vant)
Vue.use(VeeValidate)
Vue.use(VueLazyload)
dayjs.extend(relativeTime)
Validator.localize('zh_CN', ch)
Validator.extend('phone', {
  getMessage: field => field + '请输入正确手机号',
  validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})
Vue.filter('relTime', value => {
  return dayjs().locale('zh-cn').from(value)
})
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
