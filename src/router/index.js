import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout'
import Search from '@/views/Search'
import SearchList from '@/views/SearchList'
import ProDetail from '@/views/ProDetail'
import Pay from '@/views/Pay'
import MyOrder from '@/views/MyOrder'

import Home from '@/views/layout/Home.vue'
import Category from '@/views/layout/Category.vue'
import Cart from '@/views/layout/Cart.vue'
import User from '@/views/layout/User.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      }, {
        path: 'category',
        component: Category
      }, {
        path: 'cart',
        component: Cart
      }, {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: MyOrder
  }
]

const router = new VueRouter({
  routes
})
// 全局前置导航守卫
// to:   到哪里去，到哪去的完整路由信息对象 (路径，参数)
// from: 从哪里来，从哪来的完整路由信息对象 (路径，参数)
// next(): 是否放行
// (1) next()     直接放行，放行到to要去的路径
// (2) next(路径)  进行拦截，拦截到next里面配置的路径
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，需要判断token是否为登录用户
  const token = store.getters.token// 导入store
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
