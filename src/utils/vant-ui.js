import Vue from 'vue'
// 按需引入
import { Switch, Tab, Tabs, Checkbox, Dialog, ActionSheet, Lazyload, Rate, Search, Swipe, SwipeItem, Grid, GridItem, Button, Icon, Tabbar, TabbarItem, NavBar, Toast } from 'vant'
import 'vant/lib/index.css' // 引入 Vant 的样式文件
import 'vant/lib/icon/local.css' // 引入 Vant 的图标库

Vue.use(Button)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(Rate)
Vue.use(Lazyload)
Vue.use(ActionSheet)
Vue.use(Dialog)

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Checkbox)
Vue.use(Switch)
