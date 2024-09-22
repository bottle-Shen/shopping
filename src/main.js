import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
// import Vant from 'vant'
// import 'vant/lib/index.css'
// 把vant中所有组件都引入了
// Vue.use(Vant)
// 按需引入
// import { Button, Icon } from 'vant'
// Vue.use(Button)
// Vue.use(Icon)
// 把引入组件的步骤抽离到单独的js文件中比如 `utils/vant-ui.js`
// 然后，在main.js中导入按需导入的配置文件
import '@/utils/vant-ui'
// 导入styles/common.less重置默认样式
import '@/styles/common.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
