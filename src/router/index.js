import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index'
// import Login from '../pages/login'
import Main from '../pages/main'
import Board from '../pages/board'

import Exam from '../pages/main/exam'
import Study from '../pages/main/study'
import Read from '../pages/main/read'
import Think from '../pages/main/think'
import xsTest1 from '../pages/main/exam/xsTest1'
import xsTest2 from '../pages/main/exam/xsTest2'
import hsTest1 from '../pages/main/exam/hsTest1'
import hsTest2 from '../pages/main/exam/hsTest2'
import dsTest from '../pages/main/exam/dsTest'

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
    },{
      path: '/board',         //排行榜     
      name: 'board-page',     
      component: Board,       
    },{                   
      path: '/main/exam',      //科考
      name: 'exam',
      component: Exam
    },{
      path: '/main/study',     //勤学
      name: 'study',
      component: Study
    },{
      path: '/main/read',      //苦读
      name: 'read',
      component: Read
    },{
      path: '/main/think',     //自省
      name: 'think',
      component: Think
    },{
      path: '/main/exam/xsTest1',     //拼图1
      name: 'xsTest1',
      component: xsTest1
    },{
      path: '/main/exam/xsTest2/:correct/:time',     //拼图2
      name: 'xsTest2',
      component: xsTest2
    },{
      path: '/main/exam/hsTest1',     //填空1
      name: 'hsTest1',
      component: hsTest1
    },{
      path: '/main/exam/hsTest2/:correct/:time',     //填空2
      name: 'hsTest2',
      component: hsTest2
    },{
      path: '/main/exam/dsTest',     //填空2
      name: 'dsTest',
      component: dsTest
    },
  ]
});


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
 
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });
