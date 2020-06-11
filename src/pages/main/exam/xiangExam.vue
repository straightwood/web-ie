<template>
  <div id="main">
    <img src="../../../assets/xiangexam/xsbg.png">
    <div id="title">
       <img src="../../../assets/xiangexam/xiangexamtitle.png">
    </div>
    <div id="fanjin">
       <img src="../../../assets/xiangexam/fanjin.png">
    </div>
    <div id="chatbox">
       <img src="../../../assets/xiangexam/xsexam1.png">
    </div>
    <div id="chatbox2">
       <img src="../../../assets/xiangexam/xsexam2.png">
    </div>
    <div id="chatbox3">
       <img src="../../../assets/xiangexam/xsexam3.png">
    </div>
    <div id="btnBox">
      <button type="text"
              id="EntertheroomBtn"
              class="btnClass"
              @click="start"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
      <button type="text"
              id="ExamRuleBtn" 
              class="btnClass"
              @click="ExamRule"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
      <button type="text"
              id="SaveExitBtn" 
              class="btnClass"
              @click="save"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
    </div>
    <div id="btnBox2">
     <button type="text"
              id="continueButton" 
              class="btnClass2"
              @click="continueExamRule"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
      <button type="text"
              id="byeButton"
              class="btnClass2"
              @click="returndsExam"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
    </div>
    <audio ref="audio" :src="audioUrl"></audio>
  </div>
</template>

<script>
let count=0;
export default {
  data(){
        return{
            color:false,
            current:1,
            audioUrl:require('../../../music/悬停按钮音效.wav'),//声音文件
        };
  },
  mounted(){
    this.judge();
  },
  methods:{
    start(){
      this.$router.push('./xsTest1');
    },
    save(){
      this.$router.push('/main');
    },
    ExamRule(){
      fanjin.style.width="700px"
      fanjin.style.top="250px"
      fanjin.style.left="270px"
      EntertheroomBtn.style.visibility='hidden'
      ExamRuleBtn.style.visibility='hidden'
      SaveExitBtn.style.visibility='hidden'
      title.style.visibility='hidden'
      chatbox.style.display='block'
      byeButton.style.visibility='visible'
      continueButton.style.visibility='visible'
   },
   returndsExam(){
      fanjin.style.width="200px"
      fanjin.style.top="562px"
      fanjin.style.left="435px"
      chatbox.style.display='none'
      chatbox2.style.display='none'
      chatbox3.style.display='none'
      byeButton.style.visibility='hidden'
      continueButton.style.visibility='hidden'
      EntertheroomBtn.style.visibility='visible'
      ExamRuleBtn.style.visibility='visible'
      SaveExitBtn.style.visibility='visible'
      title.style.visibility='visible'
   },
   continueExamRule(){
      count++;
      if(count % 2==1){
        chatbox.style.display='none'
        chatbox2.style.display='block'
      }
      if(count % 2==0){
        chatbox2.style.display='none'
        chatbox3.style.display='block'
        continueButton.style.visibility='hidden'
      }
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
#title{
  width:200px;
  position:absolute;
  left:855px;
  top:100px;
}
#fanjin{
  width:200px;
  height:200px;
  position:absolute;
  left:580px;
  top:600px;
}  
#chatbox{
  width:600px;
  position:absolute;
  left:700px;
  top:150px;
  display:none;
}
#chatbox2{
  width:600px;
  position:absolute;
  left:700px;
  top:150px;
  display:none;
}
#chatbox3{
  width:600px;
  position:absolute;
  left:700px;
  top:150px;
  display:none;
}
#btnBox{
  position: absolute;
  left:720px;
  top:800px;
  display: flex;
  flex-direction:row;
}
.btnClass{
  background-color:rgba(255, 255, 255, 0);
  width: 150px;
  height:150px;
}
#EntertheroomBtn{
  background: url("../../../assets/exam/EntertheroomBtn.png")  no-repeat;
  margin-right:30px;
}
#ExamRuleBtn{
  background: url("../../../assets/exam/ExamRuleBtn.png")  no-repeat;
  margin-right:30px;
}
#SaveExitBtn{
  background: url("../../../assets/exam/SaveExitBtn.png")  no-repeat;
}
#btnBox2{
  position: absolute;
  left:1500px;
  top:900px;
  display: flex;
  flex-direction:row;
}
.btnClass2{
  background-color:rgba(255, 255, 255, 0);
  width: 200px;
  height:200px;
  visibility:hidden;
}
#byeButton{
  background: url("../../../assets/exam/byeButton.png")  no-repeat;
}
#continueButton{
  background: url("../../../assets/exam/continueButton.png")  no-repeat;
}
</style>
