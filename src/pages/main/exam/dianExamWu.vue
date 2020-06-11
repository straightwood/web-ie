<template>
  <div id="main">
    <img src="../../../assets/dianexam/dsWubg.png">
    <input type="button" id="button1" @click.stop="handleInputOne" ref="inputOne"/>
    <div class="myDiv"  :class="{active1:isActive1}" ref="myDiv"></div>
    <div id="endtime">{{val1}}</div>
    <div id="bird">
    <img src="../../../assets/dianexam/仙鹤飞翔A.gif" style="width:280px" id="birdA" @click='aclick'>
    <img src="../../../assets/dianexam/仙鹤飞翔B.gif" style="width:290px" id="birdB" @click='bclick'>
    <img src="../../../assets/dianexam/仙鹤飞翔C.gif" style="width:300px" id="birdC" @click='cclick'>
    <img src="../../../assets/dianexam/仙鹤飞翔D.gif" style="width:310px" id="birdD" @click='dclick'>
    </div>
    <p id=q1title>问题(1/3)：以下哪个人奉行《公羊传》的思想：</p>
    <p id=q1content>A：人不犯我，我不犯人。<br> 
       B：以德报德，以直抱怨。<br> 
       C：先祖之仇，九世可报。<br> 
       D: 以德报怨，善待仇人。</p>
    <p id=q2title>问题(2/3)：在古代，关于“大学”错误的是：</p>
    <p id=q2content>A：古人8岁小学，15岁时大学<br> 
       B：高等院校<br> 
       C：博学<br> 
       D: 大人之学</p>
    <p id=q3title>问题(3/3)：四书不包括以下哪本书：</p>
    <p id=q3content>A：《春秋》<br> 
       B：《大学》<br> 
       C：《中庸》<br> 
       D: 《论语》</p>
    <img src="../../../assets/dianexam/correct.png" id="gou">
    <img src="../../../assets/dianexam/wrong.png" id="cha">
    <Button type="text" id="nextqusBtn" @click="nextqus"></Button>
    <img id="wskaichang" src="../../../assets/dianexam/wskaichang.png">
  </div>
</template>
s
<script> 
export default {
  data(){
    return{
      pos:[],
      isActive1:false,
      val1:'倒计时:',
      t:11,
      ans:[],
      ansnum:0,
      correctans:['c','b','a'],
      correct:0,
      kcflag:0,
      choseflag:[0,0,0],
      timer:'',
    }
  },
  mounted:function(){
      this.judge();
      this.timejian();
      this.timer=setInterval(this.timejian, 1000);
      this.handleInputOne(this.$refs.inputOne);
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
        if(this.t==9 && this.kcflag==0){
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
          this.passFn();
        }
    },
    aclick(){
       this.ans= 'a' ;
       this.choseflag[this.ansnum]=1;
       this.jiaodui(this.ans);
    },
    bclick(){
       this.ans= 'b' ;
       this.choseflag[this.ansnum]=1;
       this.jiaodui(this.ans);
    },
    cclick(){
         this.ans= 'c' ;
         this.choseflag[this.ansnum]=1;
         this.jiaodui(this.ans);
    },
    dclick(){
        this.ans= 'd' ;
        this.choseflag[this.ansnum]=1;
        this.jiaodui(this.ans);
    },
    jiaodui(ans){
      if(2>this.ansnum>0){
        nextqusBtn.style.visibility='visible';
      }
      if(this.correctans[this.ansnum]==ans){
        this.correct++;
        gou.style.visibility='visible';
      }
      else{
        cha.style.visibility='visible';
      } 
      bird.style.display='none';
    },
    nextqus(){
      this.ansnum++;
      endtime.style.display='block';
      gou.style.visibility='hidden';
      cha.style.visibility='hidden';
      if(this.ansnum==1 ){
        this.t=10;
        q1title.style.visibility='hidden';
        q1content.style.visibility='hidden';
        q2title.style.visibility='visible';
        q2content.style.visibility='visible';
        nextqusBtn.style.visibility='hidden';
        bird.style.display='block';
      }
        else if(this.ansnum==2 ){
        this.t=10;
        q2title.style.visibility='hidden';
        q2content.style.visibility='hidden';
        q3title.style.visibility='visible';
        q3content.style.visibility='visible';
        nextqusBtn.style.visibility='hidden';
        bird.style.display='block';
      }
    },
    passFn(){
      console.log("正确题数："+this.correct);
      this.$router.push({name:'dsexamwen-page',params:{correct:this.correct}});
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
  width:200px;
  height:200px;
  
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
#birdA{
  position: absolute;
  top:0px;
  right:0px;
  animation:moveA 10s ease-in-out 1s 1 alternate forwards;
}
#birdB{
  position: absolute;
  top:300px;
  right:0px;
  animation-play-state:paused;
  animation:moveB 10s ease-in-out 0s 1 alternate forwards;
}
#birdC{
  position: absolute;
  top:150px;
  right:0px;
  animation:moveC 10s ease-in-out 0.5s 1 alternate forwards;
}
#birdD{
  position: absolute;
  top:450px;
  right:0px;
  animation:moveD 10s ease-in-out 1.5s 1 alternate forwards;
}
@keyframes  moveA {
0% { transform: translate(0, 0); }
25% { transform: translate(-500px, 0px); }
50% { transform: translate(-900px, 0px); }
75% { transform: translate(-1300px, 0px); }
100% { transform: translate(-1950px, 0px); }
}

@keyframes  moveB {
0% { transform: translate(0, 0); }
25% { transform: translate(-400px, 0px); }
50% { transform: translate(-800px, 0px); }
75% { transform: translate(-1000px, 0px); }
100% { transform: translate(-1950px, 0px); }
}

@keyframes  moveC {
0% { transform: translate(0, 0); }
25% { transform: translate(-500px, 0px); }
50% { transform: translate(-750px, 0px); }
65% { transform: translate(-900px, 0px); }
100% { transform: translate(-1950px, 0px); }
}

@keyframes  moveD{
0% { transform: translate(0, 0); }
25% { transform: translate(-450px, 0px); }
50% { transform: translate(-750px, 0px); }
65% { transform: translate(-900px, 0px); }
100% { transform: translate(-1950px, 0px); }
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
  right:550px;
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
</style>