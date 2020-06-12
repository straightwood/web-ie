<template>
  <div id="main">
    <img src="../../../assets/dianexam/wskaichang.png" @click="gotowus()">
  </div>
</template>

<script>
let count=0;
export default {
  methods:{
    gotowus(){
      this.$router.push('./dianWustudy');
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
