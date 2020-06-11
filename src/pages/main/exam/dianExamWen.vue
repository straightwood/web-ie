<template>
  <div id="main">
    
    <img src="../../../assets/dianexam/dsWenBg.png" @click='PlaySound()'>
    <input type="button" id="button1" @click.stop="handleInputOne" ref="inputOne"/>
    <div class="myDiv"  :class="{active1:isActive1}" ref="myDiv"></div>
    <div id="endtime">{{val1}}</div>
    <div id="bird">
    <img src="../../../assets/dianexam/酒杯A.gif" style="width:125px" id="birdA" @click='aclick'>
    <img src="../../../assets/dianexam/酒杯B.gif" style="width:125px" id="birdB" @click='bclick'>
    <img src="../../../assets/dianexam/酒杯C.gif" style="width:125px" id="birdC" @click='cclick'>
    <img src="../../../assets/dianexam/酒杯D.gif" style="width:125px" id="birdD" @click='dclick'>
    </div>
    <p id=q1title>问题(1/3)：你疯狂的爱上了一位女子，以下哪句话不适合你对她求爱时说：</p>
    <p id=q1content>A：关关雎鸠，在河之舟，窈窕淑女，君子好求。<br> 
       B：青青子衿，悠悠我心。 纵我不往，子宁不嗣音。<br> 
       C：于嗟女兮，无与士耽。女之耽兮，不可说也。<br> 
       D: 死生契阔，与子成说。执子之手，与子偕老。</p>
    <p id=q2title>问题(2/3)：《论语》是儒家学派的经典著作之一，请问它的作者是：</p>
    <p id=q2content>A：孔子<br> 
       B：孔子的弟子及其再传弟子<br> 
       C：孔子的邻居<br> 
       D: 孔子的后代</p>
    <p id=q3title>问题(3/3)：《左传》有很多别称，请问以下哪个不是它的别称：</p>
    <p id=q3content>A：《左氏传》<br> 
       B：《春秋古文》<br> 
       C：《春秋左氏传》<br> 
       D: 《左氏春秋》</p>
    <img src="../../../assets/dianexam/correct.png" id="gou">
    <img src="../../../assets/dianexam/wrong.png" id="cha">
    <Button type="text" id="nextqusBtn" @click="nextqus"></Button>
    <img id="wskaichang" src="../../../assets/dianexam/wenskaichang.png">
    <audio ref="audio" :src="audioUrl"></audio>
    <p id=playerans>{{val2}}</p>
  </div>
</template>

<script> 
export default {
  data(){
    return{
      pos:[],
      isActive1:false,
      val1:'倒计时:',
      t:16,
      ans:[],
      ansnum:0,
      correctans:['c','b','a'],
      correct:0,
      kcflag:0,
      choseflag:[0,0,0],
      timer:'',
      audioUrl:require('../../../music/流水潺潺.wav'),//声音文件
      val2:''
    }
  },
  mounted:function(){
      this.judge();
      this.timejian();
      this.timer=setInterval(this.timejian, 1000);
      this.handleInputOne(this.$refs.inputOne);
      this.correct = parseInt(this.$route.params.correct);//处理传参
  }, 
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  methods:{
    handleInputOne(e){
      var iY=this.$refs.myDiv.y;
      if(iY<800){
        isActive1:true;
      }
      var _this = this;
      (e||window.event).cancelBubble = true;
      this.clearEvent();
      document.onclick=function(e){
        var myDiv = _this.$refs.myDiv;
        _this.isActive1=true;
        _this.startMove(myDiv,{x:e.clientX,y:e.clientY});
        return false;
      }
    },
    clearEvent(){
      document.onclick = null;
      document.onmousedown = null;
      document.onmousemove = null;
      document.onmouseup = null;
      var inputOne = this.$refs.inputOne;
      inputOne.onmousedown = inputOne.onmouseup=function(e){
        (e||window.event).cancelBubble = true;
      }
    },
    startMove(obj,target){
      var _this = this;
      clearInterval(obj.timer);
      obj.timer=setInterval(function(){
        _this.doMove(obj,target);
      },0.05)
    },
    doMove(obj,target){
      var iX=(target.x - obj.offsetLeft) ;
      var iY=(target.y - obj.offsetTop) ;
      iX = iX > 0 ? Math.ceil(iX) : Math.floor(iX);
      iY = iY > 0 ? Math.ceil(iY) : Math.floor(iY);
      if(target.x == obj.offsetLeft && target.y==obj.offsetTop){
        clearInterval(obj.timer);
      }else{
        var myDiv = this.$refs.myDiv;
        if(obj.offsetTop + iY  -26<675){this.isActive1=true;}
        else{this.isActive1=false;}
        obj.style.left = obj.offsetLeft + iX -32 + 'px';
        obj.style.top = obj.offsetTop + iY  -26 + 'px';
      }
    },
     timejian(){
        this.val1 ="倒计时:"+(this.t).toString();
        if(this.t>0 ){
          this.t=this.t-1;
        }
        if(this.t==14 && this.kcflag==0){
          this.kcflag=1;
          wskaichang.style.visibility='hidden';
        } 
        if(this.val1=="倒计时:0" && this.choseflag[this.ansnum]==0){
          cha.style.visibility='visible';
          if(this.ansnum<3){
          nextqusBtn.style.visibility='visible';
          }
          bird.style.display='none';
          endtime.style.display='none';
        }
        if(this.choseflag[this.ansnum]==1){
          endtime.style.display='none';
        }
        if(this.ansnum==2 && (this.choseflag[2]==1 || this.val1=="倒计时:0") ){
          this.gotoresult();
        }
    },
    aclick(){
       this.ans= 'a' ;
       this.choseflag[this.ansnum]=1;
       this.jiaodui(this.ans);
       this.val2="A";
    },
    bclick(){
       this.ans= 'b' ;
       this.choseflag[this.ansnum]=1;
       this.jiaodui(this.ans);
       this.val2="B";
    },
    cclick(){
         this.ans= 'c' ;
         this.choseflag[this.ansnum]=1;
         this.jiaodui(this.ans);
         this.val2="C";
    },
    dclick(){
        this.ans= 'd' ;
        this.choseflag[this.ansnum]=1;
        this.jiaodui(this.ans);
        this.val2="D";
    },
    jiaodui(ans){
      if(3>this.ansnum>0){
        playerans.style.display='block';
        nextqusBtn.style.visibility='visible';
      }
      if(this.correctans[this.ansnum]==ans){
        this.correct ++;
        gou.style.visibility='visible';
      }
      else{
        cha.style.visibility='visible';
      } 
      bird.style.display='none';
    },
    nextqus(){
      playerans.style.display='none';
      this.ansnum++;
      endtime.style.display='block';
      gou.style.visibility='hidden';
      cha.style.visibility='hidden';
      if(this.ansnum==1 ){
        this.t=15;
        q1title.style.visibility='hidden';
        q1content.style.visibility='hidden';
        q2title.style.visibility='visible';
        q2content.style.visibility='visible';
        nextqusBtn.style.visibility='hidden';
        bird.style.display='block';
      }
        else if(this.ansnum==2 ){
        this.t=15;
        q2title.style.visibility='hidden';
        q2content.style.visibility='hidden';
        q3title.style.visibility='visible';
        q3content.style.visibility='visible';
        nextqusBtn.style.visibility='hidden';
        bird.style.display='block';
      }
    },
    gotoresult(){
      this.compute();
      if(this.correct>=3){
          this.$router.push('/main/exam/success');
      }else{
          this.$router.push('/main/exam/failed');
      }   
    },
    compute(){
          fetch('api/web-ie/server/dsTest.php',{
              method:"POST",
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                  Authorization:localStorage.getItem('Authorization'),//token
                  username:JSON.parse(localStorage.getItem("username")),
                  correct:this.correct,
              }),
          }).then((res)=>{
                return res.json();
          }).then((res)=>{
              this.update();
          });
    },
    update(){
        fetch('api/web-ie/server/compute.php',{
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
        }); 
    },
    PlaySound() {
      this.$refs.audio.play();    
  }
  }
}
</script>

<style scoped>
#main{
  position: relative;
  width: 1920px;
  height: 1080px;
}
img{ 
  width:100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
body,div{
  margin: 0;
  padding: 0;
}
.myDiv{
  position: absolute;
  width:100px;
  height:100px;
  
  top:0px;
  left:0px;
}
.active1{
  background: url(../../../assets/dianexam/瞄准.png) no-repeat;
}
p,input{
  margin: 10px;
}
#button1{
  visibility:hidden;
}
#birdA,#birdB,#birdC,#birdD{
  position: absolute;
  top:-80px;
  left:300px;
}
#birdA{
  animation:move 15s ease-in-out 0s 1 alternate forwards;
}
#birdB{
  animation:move 15s ease-in-out 2s 1 alternate forwards;
}
#birdC{
  animation:move 15s ease-in-out 3s 1 alternate forwards;
}
#birdD{
  animation:move 15s ease-in-out 5s 1 alternate forwards;
}

/*右下*/
@keyframes  move{
0% { transform: translate(0, 0); }
5% { transform: translate(15px, 160px); }
11% { transform: translate(-10px, 260px); }
19% { transform: translate(400px, 140px); }
25% { transform: translate(180px, 510px); }
50% { transform: translate(1000px, 210px); }
55% { transform: translate(1300px, 310px); }
60% { transform: translate(1300px, 360px); }
70% { transform: translate(550px, 560px); }
75% { transform: translate(500px, 570px); }
80% { transform: translate(500px, 660px); }
100% { transform: translate(1700px,640px); }
}

#endtime{
  position: absolute;
  bottom:50px;
  right:100px;
  font-size:35px;
  color:white;
}
#q1title,#q2title,#q3title{
  position: absolute;
  bottom:250px;
  left:50px;
  font-size:36px;
  color:white;
  font-family:KaiTi;
}
#q1content,#q2content,#q3content{
  position: absolute;
  bottom:45px;
  left:245px;
  font-size:34px;
  color:white;
  font-family:KaiTi;
}
#q2title,#q3title,#q2content,#q3content{
  visibility: hidden;
}
#gou,#cha{
  position: absolute;
  right:500px;
  bottom:270px;
  width:70px;
  visibility:hidden;
}
#nextqusBtn{
  background: url("../../../assets/dianexam/nextqusbutton.png")  no-repeat;
  position: absolute;
  right:80px;
  bottom:20px;
  width:250px;
  height:100px;
  visibility:hidden;
}
#wskaichang{
  position:absolute;
  left:0px;
  top:0px;
  visibility:visible;
}
#playerans{
  position: absolute;
  bottom:250px;
  right:600px;
  font-size:50px;
  color:RED;
  font-family:KaiTi;
}
</style>