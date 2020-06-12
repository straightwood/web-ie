// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'//等效于from './router/index.js'  是node加载的方式
import VueRouter from 'vue-router';
import store from './store/index'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'


Vue.use(Vuex);
Vue.use(VueRouter);//引入router
Vue.use(ViewUI);//引入view
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,     //属性值和属性名一样时省略 router:router
    components: { App },
    template: '<App/>',
    store
  })

Vue.prototype.judge = function(){
  fetch('api/web-ie/server/judge.php',{
      method:"POST",
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({
          Authorization:localStorage.getItem('Authorization'),//token
          username:JSON.parse(localStorage.getItem("username")),
      }),
  }).then((res)=>{
      return res.json();
  }).then((res)=>{
      if(res[0]==0){
        if(this.$route.path!='/main/exam/xsExam')
          this.$router.push('/main/exam/xsExam');
      }else if(res[0]==1){
        if(this.$route.path!='/main/exam/hsExam')
          this.$router.push('/main/exam/hsExam');
      }else if(res[0]==2){
        if(this.$route.path!='/main/exam/dsExam')
          this.$router.push('/main/exam/dsExam');
      }
  });
}


