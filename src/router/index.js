import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index'
// import Login from '../pages/login'
import Main from '../pages/main'
import Board from '../pages/board'

import Exam from '../pages/main/exam'
import Study from '../pages/main/study'
import Think from '../pages/main/think'
import xsTest1 from '../pages/main/exam/xsTest1'
import xsTest2 from '../pages/main/exam/xsTest2'
import hsTest1 from '../pages/main/exam/hsTest1'
import hsTest2 from '../pages/main/exam/hsTest2'
import xsTest3 from '../pages/main/exam/xsTest3'

import DsExam from '../pages/main/exam/dianExam'
import HsExam from '../pages/main/exam/huiExam'
import XsExam from '../pages/main/exam//xiangExam'
import DsWu from '../pages/main/exam//dianExamWu'
import DsWen from '../pages/main/exam/dianExamWen'

import failed from '../pages/main/exam/failed'
import success from '../pages/main/exam/success'

import dianWustudy from  '../pages/main/study/dianWustudy'
import dianWenstudy from  '../pages/main/study/dianWenstudy'
import xiangstudy1 from  '../pages/main/study/xiangshistudy1'
import xiangstudy2 from  '../pages/main/study/xiangshistudy2'
import xiangstudy3 from  '../pages/main/study/xiangshistudy3'
import huistudy1 from  '../pages/main/study/huishistudy1'
import huistudy2 from  '../pages/main/study/huishistudy2'

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
      path: '/main/think',     //自省
      name: 'think',
      component: Think
    },{
      path: '/main/exam/xsTest1',     //拼图1
      name: 'xsTest1',
      component: xsTest1
    },{
      path: '/main/exam/xsTest2/:correct',     //拼图2
      name: 'xsTest2',
      component: xsTest2
    },{
      path: '/main/exam/xsTest3/:correct',     //拼图3
      name: 'xsTest3',
      component: xsTest3
    },{
      path: '/main/exam/hsTest1',     //填空1
      name: 'hsTest1',
      component: hsTest1
    },{
      path: '/main/exam/hsTest2/:correct',     //填空2
      name: 'hsTest2',
      component: hsTest2
    },{
      path: '/main/exam/dsExam', //链接路径######################################
      name: 'dsexam-page',
      component: DsExam,
    },{
      path: '/main/exam/hsExam',
      name: 'hsexam-page',
      component: HsExam,
    },{
      path: '/main/exam/xsExam',
      name: 'xsexam-page',
      component: XsExam,
    },{
      path: '/main/exam/DsExamWu',
      name: 'dsexamwu-page',
      component: DsWu,
    },{
      path: '/main/exam/DsExamWen',
      name: 'dsexamwen-page',
      component: DsWen,
    },{
      path: '/main/exam/failed',
      name: 'failed-page',
      component: failed,
    },{
      path: '/main/exam/success',
      name: 'success-page',
      component: success,
    },{
      path: '/main/study/dianWustudy',
      name: 'dianWustudy-page',
      component: dianWustudy,
    },{
      path: '/main/study/dianWenstudy',
      name: 'dianWenstudy-page',
      component: dianWenstudy,
    },{
      path: '/main/study/xiangstudy1',
      name: 'xiangstudy1-page',
      component: xiangstudy1,
    }
    ,{
      path: '/main/study/xiangstudy2',
      name: 'xiangstudy2-page',
      component: xiangstudy2,
    }
    ,{
      path: '/main/study/xiangstudy3',
      name: 'xiangstudy3-page',
      component: xiangstudy3,
    }
    ,{
      path: '/main/study/huistudy1',
      name: 'huistudy1-page',
      component: huistudy1,
    }
    ,{
      path: '/main/study/huistudy2',
      name: 'huistudy2-page',
      component: huistudy2,
    }
  ]
})

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
