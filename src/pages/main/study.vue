<template>
  <div id="main">
    <img src="../../assets/study/studybg.png">
    <div id="btnBox">
      <Button type="text"
              id="xiangshiBtn"
              class="btnClass"
              @click="gotoxsstudy"
      ></Button>
      <Button type="text"
              id="huishiBtn" 
              class="btnClass"
              @click="gotohsstudy"
      ></Button>
      <Button type="text"
              id="dianshiBtn" 
              class="btnClass"
              @click="gotodsstudy"
      ></Button>
    </div>
    <Button type="text"
              id="returnmain" 
              class="btnClass"
              @click="save"
      ></Button>
  </div>
</template>

<script>
export default {
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
