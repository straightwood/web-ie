<template>
  <div id="main">
    <img src="../../assets/study/studybg.png">
    <div id="btnBox">
      <button type="text"
              id="xiangshiBtn"
              class="btnClass"
              @click="gotoxsstudy"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
      <button type="text"
              id="huishiBtn" 
              class="btnClass"
              @click="gotohsstudy"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
      <button type="text"
              id="dianshiBtn" 
              class="btnClass"
              @click="gotodsstudy"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
    </div>
    <button type="text"
              id="returnmain" 
              class="btnClass"
              @click="save"
              @mouseenter="PlaySound()" 
              @mouseleave="StopSound()"
      ></button>
    <audio ref="audio" :src="audioUrl"></audio>
  </div>
</template>

<script>
export default {
  data(){
        return{
            color:false,
            current:1,
            audioUrl:require('../../music/悬停按钮音效.wav'),//声音文件
        };
  },
  methods:{
    save(){
      this.$router.push('/main');
    },
    gotoxsstudy(){
      this.$router.push('./study/xiangstudy1');
    },
    gotohsstudy(){
      this.$router.push('./study/huistudy1');
    },
    gotodsstudy(){
      this.$router.push('./study/dianWustudy');
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
#btnBox{
  position: absolute;
  left:100px;
  top:50px;
  display: flex;
  flex-direction:row;
}
.btnClass{
  background-color:rgba(255, 255, 255, 0);
  width: 150px;
  height:500px;
}
#xiangshiBtn{
  background: url("../../assets/study/xiangstudybtn.png")  no-repeat;
}
#huishiBtn{
  background: url("../../assets/study/huistudybtn.png")  no-repeat;
}
#dianshiBtn{
  background: url("../../assets/study/dianstudybtn.png")  no-repeat;
}
#returnmain{
  background: url("../../assets/study/tuichubtn.png")  no-repeat;
  position: absolute;
  right:100px;
  top:20px;
}
</style>
