<template>
  <div id="main">
    <img src="../../../assets/dianexam/wenskaichang.png" @click="gotowens()">
  </div>
</template>

<script>
let count=0;
export default {
  methods:{
    gotowens(){
      this.$router.push('./dianWenstudy');
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
</style>
