<template>
  <div id="main">
    <div class="aside">
        <div :class="{bgColors:1==current}" class="aside_text">
            <div class="chinese" @click="changeColor(1);handleMain()">学习—</div>
            <div class="english">STUDY</div>
        </div>
        <div :class="{bgColors:2==current}" class="aside_text">
            <div class="chinese" @click="changeColor(2);handleBoard()">金榜—</div>
            <div class="english">LEADERBOARD</div>
        </div>
        <div :class="{bgColors:3==current}" class="aside_text">
            <div class="chinese" @click="changeColor(3);handleLogout()">登出—</div>
            <div class="english">LOGOUT</div>
        </div>
    </div>
    <div class="content">
      <div class="item_box" v-for="item in dataList" :key="item.nickname">
        <p class="item_name">{{item.nickname}}</p><br><br>
        <p class="item_score">{{item.score}}</p><br><br>
      </div>
      <div class="item_box" v-for="(item,index) in achieveList" :key="-index">
        <p class="item_achieve">{{item.achieve}}</p>
      </div>
      <div class="achieve_box">
        <img src="../assets/board/zhuangyuan.png">
        <img src="../assets/board/bangyan.png">
        <img src="../assets/board/tanhua.png">
      </div>
    </div>
    <div id="title">
      <img src="../assets/board/boardtitle.png">
    </div>
    <audio preload="auto" loop id="audio" :src="require('../music/金榜背景音乐.mp3')"></audio>
	  <div @click="changeOn" :class="isOff? 'isOff':'isOn' "></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data(){
      return{
          current:2,
          dataList:[],
          // dataList:[
          //   {
          //     name:'围城',
          //     score:100,
          //     achieve:'四个大字'
          //   },{
          //     name:'肖申克的救赎',
          //     score:99,
          //     achieve:'四个大字'
          //   },{
          //     name:'白鹿原',
          //     score:98,
          //     achieve:'四个大字'
          //   },{
          //     name:'基督山伯爵',
          //     score:97,
          //     achieve:'四个大字'
          //   },{
          //     name:'默读',
          //     score:96,
          //     achieve:'四个大字'
          //   },{
          //     name:'设计师',
          //     score:95,
          //     achieve:'四个大字'
          //   },{
          //     name:'红宝书',
          //     score:94,
          //     achieve:'四个大字'
          //   },{
          //     name:'镜子',
          //     score:93,
          //     achieve:'四个大字'
          //   }
          // ],
          achieveList:[
            {
              achieve:'风华绝代'
            },
            {
              achieve:'经国之才'
            },
            {
              achieve:'当时才度'
            },
            {
              achieve:'才高八斗'
            },
            {
              achieve:'才识过人'
            },
            {
              achieve:'耳聪目明'
            },
            {
              achieve:'小有才气'
            },
            {
              achieve:'稀疏平常'
            },
          ],
          isOff:true,
      };
  },
  mounted(){
    this.getData();
     // 自动播放音乐效果，解决微信自动播放问题
       document.addEventListener('touchstart',this.audioAutoPlay,false);
       document.addEventListener('WeixinJSBridgeReady', this.audioAutoPlay,false);
       let oAudio = document.querySelector("#audio");
       oAudio.onended = function () {//播放完毕，重新循环播放
            oAudio.load();
            oAudio.play();
    }
  },
  methods:{
    ...mapMutations(['changeLogin']),
    getData(){
      fetch('api/web-ie/server/board.php',{
          method:"POST",
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
              Authorization:localStorage.getItem('Authorization'),//token
          }),
      }).then((res)=>{
          return res.json();
      }).then((res)=>{
          if(res[2].code==1){     
              this.dataList = res[0];
              if(res[1]<8){
                for(var i=res[1];i<8;i++){
                  console.log(i);
                  this.dataList.push({nickname:'待君上榜',score:0});
                }
              }
          }else{
              this.$Message.error(res[2].message);
              this.$router.push('./index');
          }
      });  
    },
    changeColor(num){
        this.current=num;
    },
    handleMain(){
        this.$router.push('./main');
    },
    handleBoard(){
        this.$router.push('./board');
    },
    handleLogout(){
        this.$Modal.confirm({
            title: '确认要退出登录吗？',
            onOk: () => {
                this.$Message.info('已退出登录！');
                this.changeLogin({ Authorization: '' });
                this.$router.push('./index');
            },
            onCancel: () => {
            }
        });
        
    },changeOn(){
                let oAudio = document.querySelector("#audio");
               if(this.isOff){
                oAudio.play();//让音频文件开始播放     
               }else{
                oAudio.pause();//让音频文件暂停播放 
               }
               this.isOff = !this.isOff;
        },
      audioAutoPlay() {
                let audio = document.getElementById('audio');
                    this.isOff = false;
                    audio.play();
                document.removeEventListener('touchstart',this.audioAutoPlay);
    },
    load(){
      location.reload();
    }
  }
}
</script>

<style scoped>
#main{
  position: relative;
  background: url('../assets/board/boardBG.png');
  width: 1920px;
  height: 1080px;
}
.aside{
    position: absolute;
    background-color:#F0EFEB;
    width:70px;
    height: 1080px;
    padding: 25px;
}
.aside_text{
    margin-bottom: 60px;
}
.aside_text .chinese{
    font-family: Arial,STKaiti,"楷体";
    line-height: 1;
    width: 15px;
    font-size: 30px;
}
.aside_text .english{
    padding-left: 7px;
    font-family: Arial,STKaiti,"楷体";
    word-wrap: break-word;
    line-height: 1;
    width: 15px;
    /* rotate: 90deg; */
}
.bgColors{
    color:rgb(195, 1, 1);
}
.content{
    position: absolute;
    background: url('../assets/board/linetable.png') no-repeat;
    width:1200px;
    height: 850px;
    left:250px;
    top:100px;
}
.item_box{
  padding-left: 50px;
  display: inline-block;
  width: 143px;
  word-wrap: break-word;
  line-height: 1.2;
}
.item_name{
  width:30px;
  font-size:50px;
  color:rgb(195, 1, 1);
}
.item_score{
  width:100px;
  font-size:45px;
}
.item_achieve{
  font-family: STKaiti,"楷体";
  width:30px;
  font-size:50px;
}
.achieve_box{
  width:600px;
}
.achieve_box img{
  padding-left:13px;
}
#title{
  position: absolute;
  left:1600px;
  top:100px;
}

.isOn{
    width: 80px;
    height: 80px;
    position: fixed;
    z-index: 2000;
    top: 950px;
    left:1800px;
     -webkit-animation: rotating 1.2s linear infinite;
    animation: rotating 1.2s linear infinite;
    background: url("../assets/board/音乐播放.png") 0 0px no-repeat;
    background-size:100%; 
}
@keyframes rotating {
    from { -webkit-transform: rotate(0) }
    to { -webkit-transform: rotate(360deg) }
 }
@-webkit-keyframes rotating {
    from { -webkit-transform: rotate(0) }
    to { -webkit-transform: rotate(360deg) }
 }
.isOff{
    width: 80px;
    height:80px;
    position: fixed;
    z-index: 2000;
    top: 950px;
    left:1800px;
    background: url("../assets/board/音乐播放.png") 0 0px no-repeat;
    background-size:100%; 
}
</style>
