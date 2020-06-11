<template>
  <div id="main">
    <img src="../../../assets/dianexam/dsWenBg.png" @click='PlaySound()'>
    <input type="button" id="button1" @click.stop="handleInputOne" ref="inputOne"/>
    <div class="myDiv"  :class="{active1:isActive1}" ref="myDiv"></div>
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
    <Button type="text" id="qusjiexiBtn"  @click="qusjiexi"></Button>
    <Button type="text" id="finishqusbutton"  @click="gotoresult"></Button>
    <p id=playerans>{{val2}}</p>
    <img id="jiexibg" src="../../../assets/dianstudy/jiexiBg.png">
    <Button type="text" id="jiexiclosebtn" @click="closejiexi"></Button>
    <p id=q1jiexi class=jiexi>&emsp;&emsp;于嗟女兮！无与士耽。<br>
                  &emsp;&emsp;士之耽兮，犹可说也。<br>
                  &emsp;&emsp;女之耽兮，不可说也。<br>  
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——《诗经·氓》<br>  
                  &emsp;正确答案为C。<br>
                  &emsp;这句话的意思是：唉呀年青<br>
                  姑娘们，见了男人别胡缠。男人<br>
                  要把女人缠，说甩就甩他不管。<br>
                  女人若是恋男人，撒手摆脱难上<br>
                  难。<br>
                  &emsp;所以，这句话不适合对你暗恋<br>
                  的女生说。
    </p>
    <p id=q2jiexi class=jiexi>《论语》记录的是孔子与他弟子<br>
                  之间的言行举止<br>
                  &emsp;正确答案为B。<br>
                  &emsp;但是这不代表这本书是由孔子<br>
                  编撰的。<br>
                  &emsp;实际上，这些都是由孔子的弟<br>
                  子与再传弟子记录的。<br>
                  
    </p>
    <p id=q3jiexi class=jiexi>
                  &emsp;《左传》有很多别称，大家容<br>
                  易搞混<br>
                  &emsp;正确答案为A。<br>
                  &emsp;这个名字是我杜撰的。<br>
    </p>    
    <img id="wskaichang" src="../../../assets/dianexam/wenskaichang.png">
    <audio ref="audio" :src="audioUrl"></audio>
  </div>
</template>

<script> 
export default {
  data(){
    return{
      pos:[],
      isActive1:false,
      t:16,
      ans:[],
      ansnum:0,
      correctans:['c','b','a'],
      score:0,
      kcflag:0,
      choseflag:[0,0,0],
      timer:'',
      audioUrl:require('../../../music/流水潺潺.wav'),//声音文件
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
        if(this.t==14 && this.kcflag==0){
          this.kcflag=1;
          wskaichang.style.display='none';
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
        this.t=15;
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
        this.t=15;
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
    gotoresult(){
      this.$router.push('/main/study');
    },
    PlaySound() {
      this.$refs.audio.play();
    },
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
#wskaichang{
  position:absolute;
  left:0px;
  top:0px;
  visibility:visible;
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
  right:600px;
  font-size:50px;
  color:RED;
  font-family:KaiTi;
}
</style>