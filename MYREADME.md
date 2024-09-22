这是一篇vue2练习案例
在MYREADME.md这里记录一些学习过程
1.*创建vue2项目*
vue create 项目名(shopping)
1.1自定义创建项目
<!-- 上下键移动，空格选中或取消选中，enter键确定下一步 -->
Babel---es6转es3
Router---路由
Vuex---使用Vuex.Store仓库
CSS Pre-processors---less/scss
Linter/Formatter---eslint校验代码格式
选择vue版本---2.x
是否使用history模式---NO
<!-- NO为选择hash哈希模式地址栏会有#号，history模式上线时使用地址栏无#号 -->
选择css预处理---Less
选择eslint的风格(eslint 代码规范的检验工具，检验代码是否符合规范)
---ESLint + Standard config 标准无分号风格<!-- 多加了分号就会报错 -->
选择校验的时机---Lint on save 保存校验
选择配置文件的生成方式---In dedicated config files 把配置文件生成到单独的文件中
是否保存预设,下次直接使用?---N为不保存，每次自定义可自己调整
启动项目---方式一/方式二
方式一:yarn serve
方式二:npm run serve


2.*调整目录结构*
删除默认文件---logo.png/HelloWorld.vue/AboutView.vue/HomeView.vue
修改没删除的文件---清理一下路由index.js文件和App.vue默认样式
添加图片素材---assets目录中装图片素材
新增我们需要的目录结构---api目录&&utils目录
src/api目录---存储接口模块 (发送ajax请求接口的模块)
src/utils目录---存储一些工具模块 (自己封装的方法)


3.*加入使用的组件库*
这里使用了vant
安装vant-ui
yarn add vant@latest-v2
yarn add babel-plugin-import -D
使用按需导入，详细看官方文档进行配置!!!
https://youzan.github.io/vant/v2/#/zh-CN/quickstart

4.*处理main.js文件*
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
4.1导入使用的组件
Vue
---import Vue from 'vue'---
App、router路由、store仓库
---import router from './router'---
4.2vant组件
---import '@/utils/vant-ui'---
// 把引入组件的步骤抽离到单独的js文件中
// utils目录/vant-ui.js
配置文件中
import { Button, Icon , XXX } from 'vant'
Vue.use(Button)
Vue.use(Icon)
Vue.use(XXX)依次添加
// 然后，在main.js中导入按需导入的配置文件import '@/utils/vant-ui'
4.3新建styles/common.less重置默认样式
导入全部页面通用样式
import '@/styles/common.less'
4.4仓库store
引入Vue
import Vue from 'vue'
引入Vuex
import Vuex from 'vuex'
引入store目录下分模块modules目录下user模块
import user from './modules/user'
使用Vuex
Vue.use(Vuex)
导出Vuex仓库
export default new Vuex.Store({
  state: {//存放所有组件共享的数据,data是组件组件的数据
  },
  getters: {// 提供state计算属性
  },
  mutations: {//修改仓库state数据
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {//异步操作
  },
  modules: {//分模块
    user
  }
})

5.vw适配---将px自动转换为vw,在控制台可查看
安装
yarn add postcss-px-to-viewport@1.1.1 -D
项目根目录， 新建postcss的配置文件`postcss.config.js`
vx---viewportWidth:设计稿的视口宽度
vant-UI中的组件就是按照375的视口宽度设计的
本项目中的UI设计稿也是按照375的视口宽度设计的，此时我们只需要配置375就可以了
如果不是375而是750该怎么办?
修改下.postcssrc.js文件配置
module.exports = ({ file }) => {
const designWidth = file.includ('node_modules\\vant') ? 375 : 750
// console.log(file)
// console.log(designWidth)
return {
plugins: {
'postcss-px-to-viewport': {
viewportWidth: designWidth
}
}
}
}
修改过后，读取的是vant相关的文件，viewportWidth就设为375，若是其它文件则750。

6.*配置路由*
一级路由-->二级路由
在router目录下index.js配置路由
使用路由的页面文件在view目录下xxx.vue
引入Vue
import Vue from 'vue'

引入路由
import VueRouter from 'vue-router'
使用路由
Vue.use(VueRouter)
创建路由
const router = new VueRouter({
  routes:[]
})
导出路由
export default router
配置路由出口---在路由页面配置
<router-view></router-view>
<!-- 一级路由与二级路由都需配置路由出口 -->

引入使用路由的页面
import XXX from '@/views/XXX'
配置路由页面
const routes = [
    //一级路由
    {
    path: '/',
    component: XXX,//首页
    redirect: '/home',//重定向,切到/页会重定向到/home这页
    children: [//二级路由，一级路由下的页面
      {
        path: 'home',
        component: Home
      }, {
        path: '/XXX',
        component: XXX
      }
      //依次添加
    ]
  },
  {
    path: '/XXX',
    component: XXX
  }
  //依次添加
]

7.*页面静态布局*
新建  `styles/common.less` 重置默认样式
全部页面的通用样式
在main.js中导入
import '@/styles/common.less'

8.*封装axios---utils目录下request.js模块*
安装axios
npm i axios
详细使用axios查看官方文档
http://www.axios-js.com/zh-cn/docs/#axios-create-config
引入axios
import axios from 'axios'
8.1创建axios实例request
8.2添加请求拦截器
8.3添加响应拦截器
8.4导出request
8.5在页面中使用axios的request请求
在created中测试---控制台可查看返回是否成功200
async created(){
    const res = await request.get('/XXX')
    console.log(res)
}
8.6页面接收请求数据
data(){
    return{
        XXX:''//准备数据
    }
},
methods:{//准备方法
    async fn(){//函数
    const { data: { xxx, xxx } }=await request.get('/XXX')
    //解构data拿到request.get('/XXX')里面的xxx数据
    this.XXX = xxx
    //将解构data拿到的数据xxx赋给this.XXX准备的数据
    }
},
async created () {
  this.fn()//准备方法里的函数
}
模板
<img v-if="XXX" :src="XXX" @click="fn">
//点击触发fn函数,在created中找到this.fn(),去methods方法中找到fn()
v-if="XXX" 判断当有XXX的时候页面才渲染img
:src="XXX" 和XXX数据动态绑定

8.7*基于8.6继续封装api接口*
将请求封装成方法，统一存放到api模块，与页面分离，相同请求直接复用
新建api/XXX.js
引入axios请求
import request from '@/utils/request'
将api接口封装
export const fn = () => {
  return request.get('/XXX')
}
页面中直接调用
methods:{//准备方法
    async fn(){//函数
    //const { data: { xxx, xxx } }=await request.get('/XXX')
    //修改为
    const { data: { xxx, xxx } }=await fn()
    //解构data拿到request.get('/XXX')里面的xxx数据
    this.XXX = xxx
    //将解构data拿到的数据xxx赋给this.XXX准备的数据
    }
}

9.*响应拦截器统一处理错误提示*
只要不是 200 默认给提示，抛出错误

10.*将登录权证信息存入 vuex---分模块*
新建 vuex user 模块  store/modules/user.js
export default {
  namespaced: true, // 需要开启命名空间，才会挂载到子模块,否则到挂载全局
  state () {
    return {
      userInfo: {
        token: '',
        userId: ''
      },
    }
  },
  mutations: {},
  actions: {}
}
挂载到 vuex 上---store/index.js
提供mutations方法存数据
mutations: {
  setUserInfo (state, obj) {
    //state为index.js自己的state数据,obj用来接收
    state.userInfo = obj
  },
},
页面中 commit 调用
this.$store.commit('user/setUserInfo', res.data)

11.*vuex持久化处理*
新建 utils/storage.js 封装方法
---获取个人信息---get
---设置个人信息---set
---移除个人信息---remove
将vuex user模块持久化处理
将state的userInfo封装
state () {
    return {
    //   userInfo: {
    //     token: '',
    //     userId: ''
      //   }
      //修改为
      userInfo: getInfo()
    }
  },
  在页面中调用---实现持久化
12.*优化：添加请求 loading 效果---拦截器*
13.*登录访问拦截 - 路由前置守卫*
官网https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
14.*动态渲染页面数据*
接口:https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70115944
首先，封装准备接口 `api/home.js`
然后，页面中请求调用
最后，模板中渲染数据