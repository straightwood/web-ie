<template>
  <div id="main">
    <img src="../../../assets/dsbg.png">
    <div id="title">
       <img src="../../../assets/dianexamtitle.png">
    </div>
    <div id="eunuch">
       <img src="../../../assets/Eunuch1.png">
    </div>
    <div id="chatbox">
       <img src="../../../assets/dsexam1.png">
    </div>
    <div id="chatbox2">
       <img src="../../../assets/dsexam2.png">
    </div>
    <div id="chatbox3">
       <img src="../../../assets/dsexam3.png">
    </div>
    <div id="chatbox4">
       <img src="../../../assets/dsexam4.png">
    </div>
    <div id="btnBox">
      <Button type="text"
              id="EntertheroomBtn"
              class="btnClass"
              @click="start"
      ></Button>
      <Button type="text"
              id="ExamRuleBtn" 
              class="btnClass"
              @click="ExamRule"
      ></Button>
      <Button type="text"
              id="SaveExitBtn" 
              class="btnClass"
      ></Button>
    </div>
    <div id="btnBox2">
     <Button type="text"
              id="continueButton" 
              class="btnClass2"
              @click="continueExamRule"
      ></Button>
      <Button type="text"
              id="byeButton"
              class="btnClass2"
              @click="returndsExam"
      ></Button>
    </div>
  </div>
</template>

<script>
let count=0;
export default {
  el:"#eunuch",
  methods:{
    ExamRule(){
      eunuch.style.width="700px"
      eunuch.style.top="250px"
      eunuch.style.left="270px"
      EntertheroomBtn.style.visibility='hidden'
      ExamRuleBtn.style.visibility='hidden'
      SaveExitBtn.style.visibility='hidden'
      title.style.visibility='hidden'
      chatbox.style.display='block'
      byeButton.style.visibility='visible'
      continueButton.style.visibility='visible'
   },
   returndsExam(){
      eunuch.style.width="200px"
      eunuch.style.top="562px"
      eunuch.style.left="435px"
      chatbox.style.display='none'
      chatbox2.style.display='none'
      chatbox3.style.display='none'
      chatbox4.style.display='none'
      byeButton.style.visibility='hidden'
      continueButton.style.visibility='hidden'
      EntertheroomBtn.style.visibility='visible'
      ExamRuleBtn.style.visibility='visible'
      SaveExitBtn.style.visibility='visible'
      title.style.visibility='visible'
   },
   continueExamRule(){
      count++;
      if(count % 3==1){
        chatbox.style.display='none'
        chatbox2.style.display='block'
      }
      if(count % 3==2){
        chatbox2.style.display='none'
        chatbox3.style.display='block'
      }
      if(count % 3==0){
        chatbox3.style.display='none'
        chatbox4.style.display='block'
        continueButton.style.visibility='hidden'
      }
   },
   start(){
      this.$router.push('./DsExamWu');
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
#title{
  width:200px;
  position:absolute;
  left:855px;
  top:100px;
}
#eunuch{
  width:200px;
  height:200px;
  position:absolute;
  left:435px;
  top:562px;
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
#chatbox4{
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
  background: url("../../../assets/EntertheroomBtn.png")  no-repeat;
  margin-right:30px;
}
#ExamRuleBtn{
  background: url("../../../assets/ExamRuleBtn.png")  no-repeat;
  margin-right:30px;
}
#SaveExitBtn{
  background: url("../../../assets/SaveExitBtn.png")  no-repeat;
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
  background: url("../../../assets/byeButton.png")  no-repeat;
}
#continueButton{
  background: url("../../../assets/continueButton.png")  no-repeat;
}
</style>
