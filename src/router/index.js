import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index'
// import Login from '../pages/login'
import Main from '../pages/main'

Vue.use(Router)//vue全局使用Router

export default new Router({
  routes: [                   //配置路由 这是个数组
    {
      path: '/',
      name: 'index',
      component: Index,
    },{                       //每个链接都是一个对象
      path: '/index',         //链接路径
      name: 'index-page',     //路由名称
      component: Index,       //对应的组建模板（上面import的vue文件）
    },{
      path: '/main',          //链接路径
      name: 'main-page',
      component: Main,
    }
  ]
})
