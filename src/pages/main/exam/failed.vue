<template>
  <div id="main">
      <button id="backBtn" @click="back();clearInfo()" @mouseenter="PlaySound()"  @mouseleave="StopSound()"></button>
      <audio ref="audio" :src="audioUrl"></audio>
  </div>
</template>

<script>
export default {
    data(){
        return{
            audioUrl:require('../../../music/悬停按钮音效.wav'),//声音文件
        };
    },
    methods:{
        back(){
            this.$router.push('/main')
        },
        clearInfo(){
            fetch('api/web-ie/server/clear.php',{
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
                if(res[2].code==1){     
                   
                }else{
                    this.$Message.error(res[2].message);
                    this.$router.push('/index');
                }
            });
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
    background: url('../../../assets/break/failed.png');
    width: 1920px;
    height: 1080px;
}
#backBtn{
    position: absolute;
    left:1600px;
    top:800px;
    background: url('../../../assets/break/back_failed.png') center center no-repeat;
    width: 150px;
    height: 164px;
}

</style>
