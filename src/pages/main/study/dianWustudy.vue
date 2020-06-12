<template>
  <div id="main">
    <img src="../../../assets/dianexam/dsWubg.png">
    <input type="button" id="button1" @click.stop="handleInputOne" ref="inputOne"/>
    <div class="myDiv"  :class="{active1:isActive1}" ref="myDiv"></div>
    <div id="bird">
    <img src="../../../assets/dianexam/仙鹤飞翔A.gif" style="width:280px" id="birdA" @click="aclick();PlaySound();">
    <img src="../../../assets/dianexam/仙鹤飞翔B.gif" style="width:290px" id="birdB" @click="bclick();PlaySound();">
    <img src="../../../assets/dianexam/仙鹤飞翔C.gif" style="width:300px" id="birdC" @click="cclick();PlaySound();">
    <img src="../../../assets/dianexam/仙鹤飞翔D.gif" style="width:310px" id="birdD" @click="dclick();PlaySound();">
    </div>
    <p id=q1title>问题(1/3)：以下哪个人奉行《公羊传》的思想：</p>
    <p id=q1content>A：人不犯我，我不犯人。<br> 
       B：以德报德，以直抱怨。<br> 
       C：先祖之仇，九世可报。<br> 
       D: 以德报怨，善待仇人。</p> 
    <p id=q2title>问题(2/3)：在古代，关于“大学”错误的是：</p>
    <p id=q2content>A：古人8岁小学，15岁时大学<br> 
       B：博学<br> 
       C：高等院校<br> 
       D: 大人之学</p>
    <p id=q3title>问题(3/3)：四书不包括以下哪本书：</p>
    <p id=q3content>A：《春秋》<br> 
       B：《大学》<br> 
       C：《中庸》<br> 
       D: 《论语》</p>
    <img src="../../../assets/dianexam/correct.png" id="gou">
    <img src="../../../assets/dianexam/wrong.png" id="cha">
    <Button type="text" id="nextqusBtn"  @click="nextqus"></Button>
    <Button type="text" id="qusjiexiBtn"  @click="qusjiexi"></Button>
    <Button type="text" id="finishqusbutton"  @click="gotowens"></Button>
    <p id=playerans>{{val2}}</p>
    <img id="jiexibg" src="../../../assets/dianstudy/jiexiBg.png">
    <Button type="text" id="jiexiclosebtn" @click="closejiexi"></Button>
    <p id=q1jiexi class=jiexi>九世犹可以复仇乎?虽百世可也。<br>
                  &emsp;&emsp;——《公羊传·庄公四年》<br>  
                  &emsp;正确答案为C。<br>
                  &emsp;儒家公羊派的大复仇思想，主<br>
                  张有仇必报。<br>
                  &emsp;具体一点来说，大复仇理论所<br>
                  展现的伦理观念至少包括两点：<br>
                  &emsp;一是国君复国君杀祖杀父之仇。<br>
                  &emsp;二是臣子复乱贼弑君之仇。<br>
                  &emsp;因此，先祖之仇，九世可报。<br>
    </p>
    <p id=q2jiexi class=jiexi>大学之道，在明明德。<br>&nbsp;&nbsp;&nbsp;&nbsp;
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——《大学》<br>  
                  &emsp;正确答案为C。<br>
                  &emsp;尽管在现代，大学的普遍意义<br>
                  代表高等院校。<br>
                  &emsp;但在古代，大学明显是有不同<br>
                  的意思<br>
                  &emsp;一是指博学。<br>
                  &emsp;二是相对小孩之学的大人之学。<br>
                  指的是更高深的知识<br>
                  &emsp;很明显，高等院校的意思是错<br>
                  误的。
    </p>
    <p id=q3jiexi class=jiexi>
                  &emsp;四书五经往往并列，大家很容<br>
                  易搞混。<br>
                  &emsp;春秋属于五经，但是不属于四<br>
                  书。<br>
                  &emsp;因此，答案是A。<br>
    </p>    
    <audio ref="audio" :src="audioUrl"></audio>
  </div>
</template>

<script> 
export default {
  data(){
    return{
      pos:[],
      isActive1:false,
      ans:[],
      ansnum:0,
      correctans:['c','c','a'],
      score:0,
      choseflag:[0,0,0],
      timer:'',
      audioUrl:require('../../../music/射击声.mp3'),//声音文件
      val2:''
    }
  },
  mounted:function(){
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
        if(this.t>0 ){
          this.t=this.t-1;
        }
        if(this.t==0 && this.choseflag[this.ansnum]==0){
          cha.style.visibility='visible';
          bird.style.display='none';
        }
        if(this.t==0){
          qusjiexiBtn.style.display='block';
          if(this.ansnum==2){
            finishqusbutton.style.display='block';
          }
          else{
            nextqusBtn.style.display='block';
          }
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
        if(this.ansnum==2){
          playerans.style.display='block';
          finishqusbutton.style.display='block';
        }else{
          nextqusBtn.style.display='block';
        }
        qusjiexiBtn.style.display='block';
      if(this.correctans[this.ansnum]==ans){
        gou.style.visibility='visible';
      }
      else{
        cha.style.visibility='visible';
      } 
      bird.style.display='none';
    },
    nextqus(){
      this.ansnum++;
      playerans.style.display='none';
      gou.style.visibility='hidden';
      cha.style.visibility='hidden';
      jiexibg.style.display='none';
      jiexiclosebtn.style.display='none';
      if(this.ansnum==1 ){
        q1jiexi.style.display='none';
        this.t=10;
        q1title.style.display='none';
        q1content.style.display='none';
        q2title.style.display='block';
        q2content.style.display='block';
        nextqusBtn.style.display='none';
        qusjiexiBtn.style.display='none';
        bird.style.display='block';
      }
        else if(this.ansnum==2 ){
        q2jiexi.style.display='none';
        this.t=10;
        q2title.style.display='none';
        q2content.style.display='none';
        q3title.style.display='block';
        q3content.style.display='block';
        nextqusBtn.style.display='none';
        qusjiexiBtn.style.display='none';
        bird.style.display='block';
      }
    },
    qusjiexi(){
      jiexibg.style.display='block';
      jiexiclosebtn.style.display='block';
      if(this.ansnum==0){
        q1jiexi.style.display='block';
      }
      else if(this.ansnum==1){
        q2jiexi.style.display='block';
      }
      else{
        q3jiexi.style.display='block';
      }
    },
    closejiexi(){
       jiexibg.style.display='none';
       jiexiclosebtn.style.display='none';
       if(this.ansnum==0){
        q1jiexi.style.display='none';
       }
       else if(this.ansnum==1){
        q2jiexi.style.display='none';
       }
       else{
        q3jiexi.style.display='none'; 
       }
    },
    gotowens(){
       this.$router.push('./wensgd');
    },
    PlaySound() {
      this.$refs.audio.play();
    },
    StopSound() {
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
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
  display:none;
}
#gou,#cha{
  position: absolute;
  right:550px;
  bottom:270px;
  width:70px;
  visibility:hidden;
}
#nextqusBtn{
  background: url("../../../assets/dianstudy/nextqusbutton.png")  no-repeat;
  position: absolute;
  right:80px;
  bottom:50px;
  width:300px;
  height:100px;
  display:none;
}
#finishqusbutton{
  background: url("../../../assets/dianstudy/finishqusbutton.png")  no-repeat;
  position: absolute;
  right:80px;
  bottom:50px;
  width:300px;
  height:100px;
  display:none;
}
#qusjiexiBtn{
  background: url("../../../assets/dianstudy/qusjiexibtn.png")  no-repeat;
  position: absolute;
  right:80px;
  bottom:150px;
  width:300px;
  height:100px;
  display:none;
}
#jiexibg{
  width:500px;
  position: absolute;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  display:none;
}
#jiexiclosebtn{
  width:30px;
  position: absolute;
  margin: auto;
  top: 0; left:420px; bottom:670px; right: 0;
  background: url("../../../assets/dianstudy/jiexiclosebtn.png") no-repeat;
  display:none;
}
#q1jiexi,#q2jiexi,#q3jiexi{
  position: absolute;
  top:320px; left: 750px;
  font-size:28px;
  color:#000000;
  font-family:SimHei;
  display:none;
}
#playerans{
  position: absolute;
  bottom:250px;
  right:1000px;
  font-size:50px;
  color:RED;
  font-family:KaiTi;
}
</style>